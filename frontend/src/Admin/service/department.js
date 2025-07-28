import axios from "axios";
import { url } from "../../Common/service/Url";

export async function addDepartment(data) {
  let newUrl = `${url}/api/department/addDepartment`;

  try {
    const response = await axios.post(newUrl, data);
    if (response.status === 200) {
      return response.data; // Return the data if needed
    } else {
      console.log("Unexpected status code:", response.status);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.error;
      throw new Error(errorMessage); // Throw the error with the specific message
    } else {
      throw error; // Handle other types of errors
    }
  }
}

export async function showAllDepartment() {
  const apiUrl = `${url}/api/department/showDepartment`;
  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data; // Assuming response.data contains the array of admin details
    } else {
      console.error("Failed to fetch admin information:", response.data.error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching admin information:", error);
    throw error;
  }
}

export async function removeDepartment(data) {
  let newUrl = `${url}/api/department/deleteDepartment`;

  try {
    const response = await axios.post(newUrl, data);
    if (response.status === 200) {
      return response.data; // Return the data if needed
    } else {
      console.log("Unexpected status code:", response.status);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.error;
      throw new Error(errorMessage); // Throw the error with the specific message
    } else {
      throw error; // Handle other types of errors
    }
  }
}
