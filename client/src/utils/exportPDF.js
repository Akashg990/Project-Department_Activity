import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Chart from "chart.js/auto";
import ghrcemLogo from "../assets/ghrcem.png";

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };

    img.src = src;
  });

const formatDate = (date) => {

  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {

    day: "2-digit",
    month: "short",
    year: "numeric",

  });

};

export const exportActivitiesPDF = async (

  activities,

  academicYear

) => {

  const doc = new jsPDF({

    orientation: "landscape",

    unit: "mm",

    format: "a4",

  });

  // ----------------------------

  // LOGO

  // ----------------------------

  const logo = await loadImage(ghrcemLogo);

  doc.addImage(

    logo,

    "PNG",

    10,

    8,

    25,

    25

  );

  // ----------------------------

  // HEADER

  // ----------------------------

  doc.setFont("helvetica", "bold");

  doc.setFontSize(18);

  doc.text(

    "G H Raisoni College of Engineering & Management",

    148,

    15,

    {

      align: "center",

    }

  );

  doc.setFontSize(14);

  doc.text(

    "Department of Computer Engineering",

    148,

    22,

    {

      align: "center",

    }

  );

  doc.setFontSize(16);

  doc.text(

    "Department Activity Report",

    148,

    30,

    {

      align: "center",

    }

  );

  doc.setFontSize(12);

  doc.text(

    `Activity Completed A.Y. ${academicYear}`,

    148,

    37,

    {

      align: "center",

    }

  );

  // ----------------------------

  // SUMMARY

  // ----------------------------

  const totalParticipants = activities.reduce(

    (sum, activity) =>

      sum + Number(activity.participants || 0),

    0

  );

  const uniqueClubs = [

    ...new Set(

      activities.map(

        (activity) => activity.club

      )

    ),

  ].length;

  doc.setDrawColor(180);

  doc.rect(10, 45, 277, 18);

  doc.setFontSize(11);

  doc.setFont("helvetica", "bold");

  doc.text(

    `Total Activities : ${activities.length}`,

    15,

    52

  );

  doc.text(

    `Total Participants : ${totalParticipants}`,

    95,

    52

  );

  doc.text(

    `Total Clubs : ${uniqueClubs}`,

    195,

    52

  );

  doc.text(

    `Generated : ${new Date().toLocaleDateString()}`,

    15,

    59

  );

  // ----------------------------

  // BAR CHART

  // ----------------------------

  const typeCounts = {};

  activities.forEach((activity) => {

    typeCounts[activity.activityType] =

      (typeCounts[activity.activityType] || 0) + 1;

  });

  const canvas =

    document.createElement("canvas");

  canvas.width = 900;

  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  const chart = new Chart(ctx, {

    type: "bar",

    data: {

      labels: Object.keys(typeCounts),

      datasets: [

        {

          label: "Activities",

          data: Object.values(typeCounts),

          backgroundColor:

            "#0B5ED7",

        },

      ],

    },

    options: {

      responsive: false,

      plugins: {

        legend: {

          display: false,

        },

      },

      scales: {

        y: {

          beginAtZero: true,

        },

      },

      animation: false,

    },

  });

  const chartImage =

    canvas.toDataURL("image/png");

  doc.addImage(

    chartImage,

    "PNG",

    15,

    70,

    260,

    70

  );

  chart.destroy();

  // ----------------------------

  // TABLE DATA

  // ----------------------------

  const tableData = activities.map(

    (activity, index) => [

      index + 1,

      activity.club,

      activity.activityType,

      activity.title,

      `${formatDate(

        activity.startDate

      )} - ${formatDate(

        activity.endDate

      )}`,

      activity.resourcePersons

        ?.map(

          (person) =>

            `${person.name}`

        )

        .join(", ") || "NA",

      activity.participants,

    ]

  );
    // ----------------------------
  // TABLE
  // ----------------------------

  autoTable(doc, {
    startY: 150,

    head: [[
      "Sr.",
      "Club",
      "Activity Type",
      "Activity Title",
      "Duration",
      "Resource Person(s)",
      "Participants",
    ]],

    body: tableData,

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 2,
      overflow: "linebreak",
      valign: "middle",
      halign: "center",
      lineWidth: 0.2,
      lineColor: [180, 180, 180],
    },

    headStyles: {
      fillColor: [13, 71, 161],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },

    columnStyles: {
      0: {
        cellWidth: 12,
      },

      1: {
        cellWidth: 28,
      },

      2: {
        cellWidth: 32,
      },

      3: {
        cellWidth: 75,
        halign: "left",
      },

      4: {
        cellWidth: 38,
      },

      5: {
        cellWidth: 55,
        halign: "left",
      },

      6: {
        cellWidth: 22,
      },
    },

    margin: {
      left: 10,
      right: 10,
    },

    didDrawPage: function (data) {

      // Footer line

      doc.setDrawColor(180);

      doc.line(
        10,
        doc.internal.pageSize.height - 12,
        287,
        doc.internal.pageSize.height - 12
      );

      // Footer text

      doc.setFontSize(9);

      doc.setFont("helvetica", "normal");

      doc.text(
        "Generated by Department Activity Management System",
        10,
        doc.internal.pageSize.height - 6
      );

      // Page Number

      doc.text(
        `Page ${doc.internal.getNumberOfPages()}`,
        280,
        doc.internal.pageSize.height - 6,
        {
          align: "right",
        }
      );

    },

  });

  // ----------------------------
  // SUMMARY PAGE
  // ----------------------------

  doc.addPage();

  doc.setFont("helvetica", "bold");

  doc.setFontSize(18);

  doc.text(
    "Activity Summary",
    148,
    20,
    {
      align: "center",
    }
  );

  const summary = Object.entries(typeCounts);

  autoTable(doc, {

    startY: 35,

    head: [[
      "Activity Type",
      "Count",
    ]],

    body: summary,

    theme: "grid",

    headStyles: {

      fillColor: [13, 71, 161],

      textColor: 255,

      halign: "center",

    },

    styles: {

      fontSize: 11,

      halign: "center",

    },

  });

  // ----------------------------
  // PARTICIPANT SUMMARY
  // ----------------------------

  const clubSummary = {};

  activities.forEach((activity) => {

    clubSummary[activity.club] =
      (clubSummary[activity.club] || 0) +
      Number(activity.participants || 0);

  });

  autoTable(doc, {

    startY: doc.lastAutoTable.finalY + 15,

    head: [[
      "Club",
      "Total Participants",
    ]],

    body: Object.entries(clubSummary),

    theme: "grid",

    headStyles: {

      fillColor: [0, 121, 107],

      textColor: 255,

      halign: "center",

    },

    styles: {

      fontSize: 11,

      halign: "center",

    },

  });

  // ----------------------------
  // SAVE PDF
  // ----------------------------

  doc.save(
    `Department_Activities_${academicYear}.pdf`
  );

};