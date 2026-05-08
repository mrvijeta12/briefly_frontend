import axios from "axios";

const API = "https://briefly-backend-blond.vercel.app";
// "http://localhost:5000/api";

//! register

export const registerUser = async (formdata) => {
  try {
    const res = await axios.post(`${API}/auth/register`, formdata);
    // console.log("service res data", res.data);
    return res.data;
  } catch (error) {
    console.log("error:", error);
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
};

//! login
export const loginUser = async (formdata) => {
  try {
    const res = await axios.post(`${API}/auth/login`, formdata);
    // console.log("service res data", res.data.data);
    return res.data;
  } catch (error) {
    console.log("error:", error);
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
};

//! get stories

export const getStoriesService = async (page, limit) => {
  try {
    const res = await axios.get(`${API}/stories?page=${page}&limit=${limit}`);
    // console.log("service res data", res.data);

    return res.data;
  } catch (error) {
    console.log("error:", error.message);
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
};

//! bookmark story

export const bookmarkStory = async (token, storyId) => {
  console.log(token);
  console.log(storyId);

  try {
    const res = await axios.post(
      `${API}/stories/${storyId}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("service res data", res.data);
    return res.data;
  } catch (error) {
    console.log("error:", error);
    throw new Error(error?.response?.data?.message || "Something went wrong");
  }
};
