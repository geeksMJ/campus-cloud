import csv from "csvtojson";
import Employee from "../models/user.model.js"; // Adjust the path as needed
import fs from "fs";

export const multipleEmployeeUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const jsonArray = await csv().fromFile(filePath);
    const results = [];

    const bulkOps = jsonArray.map((data) => {
      // Remove any empty fields from the data object
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );

      results.push(filteredData); // Push the filtered data to the results array

      return {
        updateOne: {
          filter: { empId: filteredData.empId },
          update: { $set: filteredData },
          upsert: true, // If empId doesn't exist, create a new document
        },
      };
    });

    // Perform bulkWrite operation only if there are valid operations
    if (bulkOps.length > 0) {
      await Employee.bulkWrite(bulkOps);
    }

    // Delete the file after processing
    fs.unlinkSync(filePath);

    return res
      .status(200)
      .json({ message: "Successfully processed employees", results });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Error in multipleEmployeeUpload controller" });
  }
};
