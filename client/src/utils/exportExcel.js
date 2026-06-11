// // import ExcelJS from "exceljs";
// // import { saveAs } from "file-saver";
// // import ghrcemLogo from "../assets/ghrcem.png";

// // export const exportActivitiesExcel = async (
// //   activities,
// //   academicYear
// // ) => {
// //   try {
// //     // Load Template
// //     const response = await fetch(
// //       "/templates/ActivitiesTemplate.xlsx"
// //     );

// //     const buffer = await response.arrayBuffer();

// //     const workbook = new ExcelJS.Workbook();

// //     await workbook.xlsx.load(buffer);

// //     const worksheet = workbook.getWorksheet(1);

// //     // Update Academic Year
// //     worksheet.getCell("C6").value =
// //       `Activity Completed A.Y. ${academicYear}`;

// //     // ====================================
// //     // ADD LOGOS HERE (OPTIONAL)
// //     // ====================================

    
// //     const leftLogoResponse = await fetch(ghrcemLogo);
// //     const leftLogoBuffer =
// //       await leftLogoResponse.arrayBuffer();

// //     const leftLogoId = workbook.addImage({
// //       buffer: leftLogoBuffer,
// //       extension: "png",
// //     });

// //     worksheet.addImage(leftLogoId, {
// //       tl: { col: 0.2, row: 0.2 },
// //       ext: { width: 80, height: 80 },
// //     });
    

// //     // ====================================
// //     // STYLE TEMPLATE ROW
// //     // ====================================

// //     const templateRowNumber = 10;

// //     const templateRow =
// //       worksheet.getRow(templateRowNumber);

// //     // If no activities
// //     if (!activities?.length) {
// //       const excelBuffer =
// //         await workbook.xlsx.writeBuffer();

// //       saveAs(
// //         new Blob([excelBuffer]),
// //         `Activities_${academicYear}.xlsx`
// //       );

// //       return;
// //     }

// //     // Insert extra rows
// //     if (activities.length > 1) {
// //       for (
// //   let i = 1;
// //   i < activities.length;
// //   i++
// // ) {
// //   worksheet.duplicateRow(
// //     templateRowNumber,
// //     1,
// //     true
// //   );
// // }
// //     }

// //     // Fill data
// //     activities.forEach((activity, index) => {
// //       const rowNumber =
// //         templateRowNumber + index;

// //       const row =
// //         worksheet.getRow(rowNumber);

// //       // Copy styles from template row
// //       // templateRow.eachCell(
// //       //   { includeEmpty: true },
// //       //   (cell, colNumber) => {
// //       //     const target =
// //       //       row.getCell(colNumber);

// //       //     target.style = {
// //       //       ...cell.style,
// //       //     };

// //       //     target.font = {
// //       //       ...cell.font,
// //       //     };

// //       //     target.border = {
// //       //       ...cell.border,
// //       //     };

// //       //     target.fill = {
// //       //       ...cell.fill,
// //       //     };

// //       //     target.alignment = {
// //       //       ...cell.alignment,
// //       //     };
// //       //   }
// //       // );

// //       // Data

// //       row.getCell("B").value =
// //         index + 1;

// //       row.getCell("C").value =
// //         activity.club || "";

// //       row.getCell("D").value =
// //         activity.activityType || "";

// //       row.getCell("E").value =
// //         activity.title || "";

// //       row.getCell("F").value =
// //         `${activity.startDate?.slice(0, 10) || ""}
// //          to
// //          ${activity.endDate?.slice(0, 10) || ""}`;

// //       row.getCell("G").value =
// //         activity.resourcePersons
// //           ?.map(
// //             (person) =>
// //               `${person.name}${
// //                 person.designation
// //                   ? `\n${person.designation}`
// //                   : ""
// //               }`
// //           )
// //           .join("\n\n") || "NA";

// //       row.getCell("H").value =
// //         activity.participants || 0;

// //       // Formatting

// //       row.eachCell((cell) => {
// //         cell.alignment = {
// //           vertical: "middle",
// //           horizontal: "center",
// //           wrapText: true,
// //         };
// //       });

// //       // Dynamic row height

// //       const contentLengths = [
// //         row.getCell("E").value?.toString()
// //           .length || 0,
// //         row.getCell("G").value?.toString()
// //           .length || 0,
// //       ];

// //       const maxLength =
// //         Math.max(...contentLengths);

// //       row.height =
// //         Math.max(
// //           25,
// //           Math.ceil(maxLength / 40) * 15
// //         );
// //     });

// //     // Page Setup

// //     worksheet.pageSetup = {
// //       paperSize: 9, // A4
// //       orientation: "landscape",
// //       fitToPage: true,
// //       fitToWidth: 1,
// //       fitToHeight: 0,
// //       margins: {
// //         left: 0.3,
// //         right: 0.3,
// //         top: 0.5,
// //         bottom: 0.5,
// //       },
// //     };

// //     // Freeze Header

// //     // worksheet.views = [
// //     //   {
// //     //     state: "frozen",
// //     //     ySplit: 9,
// //     //   },
// //     // ];

// //     // Auto Filter

  

// //     // Export

// //     const excelBuffer =
// //       await workbook.xlsx.writeBuffer();

// //     saveAs(
// //       new Blob([excelBuffer]),
// //       `Activities_${academicYear}.xlsx`
// //     );
// //   } catch (error) {
// //     console.error(
// //       "Excel Export Error:",
// //       error
// //     );
// //   }
// // };



// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import ghrcemLogo from "../assets/ghrcem.png";

// export const exportActivitiesExcel = async (
//   activities,
//   academicYear
// ) => {
//   try {
//     // Load Template
//     const response = await fetch(
//       "/templates/ActivitiesTemplate.xlsx"
//     );

//     const buffer = await response.arrayBuffer();

//     const workbook = new ExcelJS.Workbook();

//     await workbook.xlsx.load(buffer);

//     const worksheet = workbook.getWorksheet(1);

//     // Update Academic Year
//     worksheet.getCell("C6").value =
//       `Activity Completed A.Y. ${academicYear}`;

//     // ====================================
//     // ADD LOGOS HERE (OPTIONAL)
//     // ====================================

    
//     const leftLogoResponse = await fetch(ghrcemLogo);
//     const leftLogoBuffer =
//       await leftLogoResponse.arrayBuffer();

//     const leftLogoId = workbook.addImage({
//       buffer: leftLogoBuffer,
//       extension: "png",
//     });

//     worksheet.addImage(leftLogoId, {
//       tl: { col: 0.2, row: 0.2 },
//       ext: { width: 80, height: 80 },
//     });
    

//     // ====================================
//     // STYLE TEMPLATE ROW
//     // ====================================

//     // ====================================
// // DYNAMIC ROW GENERATION
// // ====================================

// const startRow = 10;

// // Header styling (Row 9)

// const headerRow = worksheet.getRow(9);

// headerRow.eachCell((cell) => {
//   cell.font = {
//     bold: true,
//     size: 11,
//   };

//   cell.alignment = {
//     vertical: "middle",
//     horizontal: "center",
//     wrapText: true,
//   };

//   cell.border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
// });

// // No activities

// if (!activities?.length) {

//   const excelBuffer =
//     await workbook.xlsx.writeBuffer();

//   saveAs(
//     new Blob([excelBuffer]),
//     `Activities_${academicYear}.xlsx`
//   );

//   return;
// }

// // Cell Style Helper

// const applyCellStyle = (cell) => {

//   cell.border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };

//   cell.alignment = {
//     vertical: "middle",
//     horizontal: "center",
//     wrapText: true,
//   };

//   cell.font = {
//     name: "Calibri",
//     size: 11,
//   };

// };

// // Generate Rows

// activities.forEach((activity, index) => {

//   const rowNumber =
//     startRow + index;

//   const row =
//     worksheet.getRow(rowNumber);

//   row.getCell("B").value =
//     index + 1;

//   row.getCell("C").value =
//     activity.club || "";

//   row.getCell("D").value =
//     activity.activityType || "";

//   row.getCell("E").value =
//     activity.title || "";

//   row.getCell("F").value =
//     `${activity.startDate?.slice(0, 10) || ""}
// to
// ${activity.endDate?.slice(0, 10) || ""}`;

//   row.getCell("G").value =
//     activity.resourcePersons
//       ?.map(
//         (person) =>
//           `${person.name}${
//             person.designation
//               ? `\n${person.designation}`
//               : ""
//           }`
//       )
//       .join("\n\n") || "NA";

//   row.getCell("H").value =
//     activity.participants || 0;

//   row.eachCell((cell) => {

//     applyCellStyle(cell);

//   });

//   const resourceText =
//     row.getCell("G").value?.toString() || "";

//   const lines =
//     resourceText.split("\n").length;

//   row.height =
//     Math.max(
//       25,
//       lines * 15
//     );

// });

// // Column Widths

// worksheet.getColumn("B").width = 8;
// worksheet.getColumn("C").width = 20;
// worksheet.getColumn("D").width = 22;
// worksheet.getColumn("E").width = 40;
// worksheet.getColumn("F").width = 22;
// worksheet.getColumn("G").width = 40;
// worksheet.getColumn("H").width = 15;

//     // Page Setup

//     worksheet.pageSetup = {
//       paperSize: 9, // A4
//       orientation: "landscape",
//       fitToPage: true,
//       fitToWidth: 1,
//       fitToHeight: 0,
//       margins: {
//         left: 0.3,
//         right: 0.3,
//         top: 0.5,
//         bottom: 0.5,
//       },
//     };

//     // Freeze Header

//     // worksheet.views = [
//     //   {
//     //     state: "frozen",
//     //     ySplit: 9,
//     //   },
//     // ];

//     // Auto Filter

  

//     // Export

//     const excelBuffer =
//       await workbook.xlsx.writeBuffer();

//     saveAs(
//       new Blob([excelBuffer]),
//       `Activities_${academicYear}.xlsx`
//     );
//   } catch (error) {
//     console.error(
//       "Excel Export Error:",
//       error
//     );
//   }
// };


import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportActivitiesExcel = async (
  activities,
  academicYear
) => {
  try {
    // Load Template

    const response = await fetch(
      "/templates/ActivitiesTemplate.xlsx"
    );

    const buffer = await response.arrayBuffer();

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.load(buffer);

    const worksheet =
      workbook.getWorksheet(1);

    // Update Academic Year

    worksheet.getCell("C6").value =
      `Activity Completed A.Y. ${academicYear}`;

    const templateRow = 10;

    // No Activities

    if (!activities || activities.length === 0) {
      const excelBuffer =
        await workbook.xlsx.writeBuffer();

      saveAs(
        new Blob([excelBuffer]),
        `Activities_${academicYear}.xlsx`
      );

      return;
    }

    // Duplicate Template Row

    if (activities.length > 1) {
      worksheet.duplicateRow(
        templateRow,
        activities.length - 1,
        true
      );
    }

    // Fill Data

    activities.forEach(
      (activity, index) => {
        const row =
          worksheet.getRow(
            templateRow + index
          );

        row.getCell("B").value =
          index + 1;

        row.getCell("C").value =
          activity.club || "";

        row.getCell("D").value =
          activity.activityType || "";

        row.getCell("E").value =
          activity.title || "";

        row.getCell("F").value =
          `${activity.startDate?.slice(0, 10) || ""}
to
${activity.endDate?.slice(0, 10) || ""}`;

        row.getCell("G").value =
          activity.resourcePersons?.length
            ? activity.resourcePersons
                .map(
                  (person) =>
                    `${person.name}${
                      person.designation
                        ? "\n" +
                          person.designation
                        : ""
                    }`
                )
                .join("\n\n")
            : "NA";

        row.getCell("H").value =
          Number(
            activity.participants
          ) || 0;

        // Dynamic Row Height

        const titleLines =
          Math.ceil(
            (activity.title || "").length /
              45
          );

        const resourceLines =
          (
            row.getCell("G").value || ""
          )
            .toString()
            .split("\n").length;

        const maxLines =
          Math.max(
            titleLines,
            resourceLines,
            1
          );

        row.height =
          Math.max(
            25,
            maxLines * 15
          );
      }
    );

    // Export

    const excelBuffer =
      await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([excelBuffer]),
      `Activities_${academicYear}.xlsx`
    );
  } catch (error) {
    console.error(
      "Excel Export Error:",
      error
    );
  }
};