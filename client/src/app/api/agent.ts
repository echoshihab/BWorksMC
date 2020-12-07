import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IBloodWork, IBloodWorksEnvelope } from "../models/bloodWork";
import { history } from "../..";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error!");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    
  }

  if (status === 401) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired please login again");
    return Promise.reject(error);
  }
  

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server error- check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const BloodWorks = {
  list: (params: URLSearchParams): Promise<IBloodWorksEnvelope> =>
    axios
      .get("/bloodWorks", { params: params })
      .then(responseBody),
  details: (id: string) => requests.get(`/bloodWorks/${id}`),
  create: (bloodWork: IBloodWork) => requests.post("/bloodWorks", bloodWork),
  update: (bloodWork: IBloodWork) =>
    requests.put(`/bloodWorks/${bloodWork.id}`, bloodWork),
  delete: (id: string) => requests.delete(`/bloodWorks/${id}`),

};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};



export default {
  User,
  BloodWorks
}
