import axios from "axios";
import { url } from "../../Common/service/Url";

export async function uploadQuiz(data) {
  let newUrl = `${url}/api/quiz/createQuiz`;

  try {
    const response = await axios.post(newUrl, data);
    if (response.status === 200) {
      return response.data; // Return the data if needed
    } else {
      console.log("Unexpected status code:", response.status);
      return null;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.error;
      throw new Error(errorMessage); // Throw the error with the specific message
    } else {
      throw error; // Handle other types of errors
    }
  }
}

export async function uploadQuizResponse(data) {
  let newUrl = `${url}/api/quiz/quizResponse`;

  try {
    const response = await axios.post(newUrl, data);
    if (response.status === 200) {
      return response.data; // Return the data if needed
    } else {
      console.log("Unexpected status code:", response.status);
      return null;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.error;
      throw new Error(errorMessage); // Throw the error with the specific message
    } else {
      throw error; // Handle other types of errors
    }
  }
}

export async function showQuizesByModuleId(moduleId) {
  const apiUrl = `${url}/api/quiz/getQuizByModuleId/${moduleId}`;

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data.quiz; // Assuming response.data contains the array of admin details
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

export async function showQuizesById(id) {
  const apiUrl = `${url}/api/quiz/getQuizById/${id}`;

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      // console.log(response.data);
      return response.data; // Assuming response.data contains the array of admin details
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

export async function showAllQuizes() {
  const apiUrl = `${url}/api/quiz/getAllQuiz`;

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data.quizzes; // Assuming response.data contains the array of admin details
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

export async function showAllRespnse(quizId) {
  const apiUrl = `${url}/api/quiz/getAllResponse/${quizId}`;

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data.allResponse; // Assuming response.data contains the array of admin details
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

export async function showRespnseById(id) {
  const apiUrl = `${url}/api/quiz/getResponseByResponseId/${id}`;
  console.log(apiUrl);

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data.response; // Assuming response.data contains the array of admin details
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

export async function quizAtempted(data) {
  console.log(data);
  let newUrl = `${url}/api/quiz/quizAttempt`;

  try {
    const response = await axios.post(newUrl, data);
    if (response.status === 200) {
      return response.data; // Return the data if needed
    } else {
      console.log("Unexpected status code:", response.status);
      return null;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.error;
      throw new Error(errorMessage); // Throw the error with the specific message
    } else {
      throw error; // Handle other types of errors
    }
  }
}

export async function getQuizByCourseId(courseId) {
  const apiUrl = `${url}/api/quiz/quizByCourseId/${courseId}`;

  try {
    const response = await axios.get(apiUrl); // Use GET for fetching data

    if (response.status === 200) {
      return response.data.allQuizzes; // Assuming response.data contains the array of admin details
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

export async function addModuleInQuiz(data) {
  const apiUrl = `${url}/api/quiz/updateQuiz`;

  try {
    const response = await axios.post(apiUrl, data); // Use put for updating data

    if (response.status === 200) {
      return response.data.allQuizzes; // Assuming response.data contains the array of admin details
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

export async function removeQuiz(quizId) {
  let newUrl = `${url}/api/quiz/deleteQuiz/${quizId}`;

  try {
    const response = await axios.delete(newUrl);
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
