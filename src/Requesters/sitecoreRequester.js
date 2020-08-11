import API_config from "../config";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = window.location.protocol+"//"+window.location.host;
const CancelToken = axios.CancelToken;

const unauthorizedStatus = [403 ,401];
export default function sitecoreRequester(config) {
  return new Promise(function (resolve, reject) {
    const source = CancelToken.source();
    const axiosOptions = {
      ...config,
      //headers: { Authorization: API_config.userToken },
      url: `${baseUrl}/api/${config.url}`,
      cancelToken: source.token,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    axios(axiosOptions)
      .then((response) => {
        if (unauthorizedStatus.includes(response.status)) {
          window.location.href = "/identity/login/workzen/SitecoreIdentityServer/WorkZen-AzureAd?ReturnUrl=/workzen-socialfeed";
        }  
        if(response.status === 400 && response.data.Message.includes("Unauthorized")) { 
          window.location.href = "/identity/login/workzen/SitecoreIdentityServer/WorkZen-AzureAd?ReturnUrl=/workzen-socialfeed";
        }
        resolve({ ...response, cancelToken: source });
      })
      .catch((error) => {
        reject(error);  
        toast.error("Error occured!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
        });
      });
  });
}
