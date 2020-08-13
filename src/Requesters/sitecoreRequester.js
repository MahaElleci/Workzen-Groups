import API_config from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { notify } from "../Services/toastify-service";
const baseUrl = "https://workzen93dev-cd.azurewebsites.net/api";

const unauthorizedStatus = [403, 401];
export default function sitecoreRequester(config) {
  return new Promise(function (resolve, reject) {
    const axiosOptions = {
      ...config,
      headers: { Authorization: API_config.userToken },
      url: `${baseUrl}${config.url}`,
      cancelToken: config.cancelToken,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    axios(axiosOptions)
      .then((response) => {
        // if (unauthorizedStatus.includes(response.status)) {
        //   window.location.href = "/identity/login/workzen/SitecoreIdentityServer/WorkZen-AzureAd?ReturnUrl=/workzen-socialfeed";
        // }
        // if(response.status === 400 && response.data.Message.includes("Unauthorized")) {
        //   console.log("in here")
        //   window.location.href = "/identity/login/workzen/SitecoreIdentityServer/WorkZen-AzureAd?ReturnUrl=/workzen-socialfeed";
        // }

        resolve(response);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          reject(error);
          notify(1, "Error occured", true, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false,
          });
        } else {
          // console.log("Request cancelled due to cleanup...");
        }
      });
  });
}
