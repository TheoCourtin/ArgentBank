import axios from "axios";

//Create a baseURL with axios and dotenv, to change the environment outside the project
const urlAPI = axios.create({
  baseURL: `${process.env.REACT_APP_LOCALHOST_URL}`,
});

/**
 * Create a class to fetch the API
 * handleError, function to check if the API have an error
 * tokenLogin method post, return the token
 * getUserInfo method post, return the data body
 * setUserInfo method put, return the data body
 */
class callAPI {
  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log("Mauvaise demande");
          break;
        case 500:
          console.log("Erreur interne du serveur");
          break;
        default:
          console.log("Une erreur s'est produite :", error.response.status);
      }
    } else {
      console.log("Une erreur s'est produite :", error);
    }
  }

  tokenLogin = async (info) => {
    try {
      const res = await urlAPI.post("/user/login", info);
      return res.data.body.token;
    } catch (error) {
      this.handleError(error);
    }
  };

  getUserInfo = async (token) => {
    try {
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
    } catch (error) {
      this.handleError(error);
    }
  };

  setUserInfo = async (token, user) => {
    try {
      const res = await urlAPI.put("/user/profile", user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data.body;
    } catch (error) {
      this.handleError(error);
    }
  };
}

// eslint-disable-next-line
export default new callAPI();