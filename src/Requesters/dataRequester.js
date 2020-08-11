import API_config from "../config";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = API_config.apiGateway.URL;
const CancelToken = axios.CancelToken;

const unauthorizedStatus = [403, 401];
export default function dataRequester(config) {
  return new Promise(function (resolve, reject) {
    const source = CancelToken.source();
    const axiosOptions = {
      ...config,
      url: `${baseUrl}${config.url}`,
      headers: {'Authorization' :  API_config.userToken},
      cancelToken: source.token, 
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };  
    console.log("testing dynamic url", baseUrl)
    axios(axiosOptions)
      .then((response) => { 
        if (unauthorizedStatus.includes(response.status)) { 
          window.location.href = "/identity/login/workzen/SitecoreIdentityServer/WorkZen-AzureAd?ReturnUrl=/workzen-socialfeed";
        }
        resolve({ ...response, cancelToken: source });
      })
      .catch((error) => {
        toast.error("Error occured!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
        });
        reject(error);
      });
  });
}
