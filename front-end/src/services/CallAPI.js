import axios from "axios";

//Create a baseURL with axios and dotenv, to change the environment outside the project
const urlAPI = axios.create({
  baseURL: `${process.env.REACT_APP_LOCALHOST_URL}`,
});

/**
 * Create a class to fetch the API
 * tokenLogin method post, return the token
 * getUserInfo method post, return the data body
 * setUserInfo method put, return the data body
 */
class callAPI {
  tokenLogin = async (info) => {
    const res = await urlAPI.post("/user/login", info);
    return res.data.body.token;
  };

  getUserInfo = async (token) => {
    const res = await urlAPI.post(
      "/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.body;
  };

  setUserInfo = async (token, user) => {
    const res = await urlAPI.put("/user/profile", user, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.body;
  };
}

export default new callAPI();