import axios from "axios";
import { GETTY } from "@env";

export const login = (identifier, password) => {
  return new Promise((resolve, reject) => {
    axios
      // .post(`https://myfoodcms189.herokuapp.com/api/auth/local/`, {
      .post(`${GETTY}api/auth/local/`, {
        identifier,
        password,
      })
      .then((res) => {
        //set token response from Strapi for server validation
        // AsyncStorage.setItem("token", JSON.stringify(res.data.jwt));

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};
