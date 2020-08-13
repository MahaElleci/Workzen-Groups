import API_config from "../config";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = API_config.apiGateway.URL;
// const CancelToken = axios.CancelToken;

export default function dataRequester(config) {
  return new Promise(function (resolve, reject) {
    // const source = CancelToken.source();
    const axiosOptions = {
      ...config,
      url: `${baseUrl}${config.url}`,
      headers: { Authorization: API_config.userToken },
      cancelToken: config.cancelToken,
    };
    axios(axiosOptions)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          toast.error("Error occured!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false,
          });
          reject(error);
        } else {
          // console.log("Request cancelled due to cleanup...");
        }
      });
  });
}
