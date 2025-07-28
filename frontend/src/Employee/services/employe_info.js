/* eslint-disable no-unused-vars */
import axios from "axios";
import { url } from "../../Common/service/Url";

export async function employeInfo(token) {
  const apiUrl = `${url}/api/auth/getUserInfo`;

  try {
    const response = await axios.post(apiUrl, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.success) {
      return response.data.user;
    } else {
      console.error(
        "Failed to fetch employee information:",
        response.data.error
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching employee information:", error);
    throw error;
  }
}

export async function changePassword(data) {
  const endpointUrl = `${url}/api/auth/changePassword`; // Adjust the endpoint URL as needed

  try {
    const response = await axios.post(endpointUrl, data);

    if (response.status === 200) {
      return response.data; // Return the data if needed
    } else {
      return null; // Return null or handle the error as needed
    }
  } catch (error) {
    console.log("error found", error.message);
    throw error; // Return null or handle the error as needed
  }
}
