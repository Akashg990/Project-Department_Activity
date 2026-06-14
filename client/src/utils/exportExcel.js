

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