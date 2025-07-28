import axios from "axios";
import { url } from "../../Common/service/Url";

export async function sendRequestsForCourse(data) {
  let newUrl = `${url}/api/request/addRequest`;

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
      const errorMessage = error.response.data;
      throw new Error(errorMessage); // Throw the error with the specific message
    } else {
      throw error; // Handle other types of errors
    }
  }
}

export async function showAllRequest() {
  const apiUrl = `${url}/api/request/getRequest`;
  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data; // Assuming response.data contains the array of admin details
    } else {
      console.error("Failed to fetch course information:", response.data.error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching course information:", error);
    throw error;
  }
}

export async function removeRequest(data) {
  let newUrl = `${url}/api/request/deleteRequest/${data}`;

  await axios
    .delete(newUrl)
    .then((res) => {
      if (res.status === 200) {
        return data;
      }
    })
    .catch((error) => {
      console.error("Delete Employee error:", error);
      throw error;
    });
}

export async function quizRequest(data) {
  const apiUrl = `${url}/api/quiz/reattempt`;
  try {
    const response = await axios.post(apiUrl,data); // Use GET for fetching data

    if (response.status === 200) {
      return response.data; // Assuming response.data contains the array of admin details
    } else {
      console.error("Failed to fetch quizRequest information:", response.data.error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching quizRequest information:", error);
    throw error;
  }
}