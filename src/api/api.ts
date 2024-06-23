import axios from "axios";
import { PostType } from "./types";
import { DocumentType } from "../features/documents/types";

const instance = axios.create({
  baseURL: "https://test.v5.pryaniky.com/",
});

export const api = {
  auth(data: { username: string; password: string }) {
    return instance.post("ru/data/v3/testmethods/docs/login", data);
  },
  getDocuments() {
    return instance.get("ru/data/v3/testmethods/docs/userdocs/get");
  },
  createDocument(data: PostType) {
    return instance.post("ru/data/v3/testmethods/docs/userdocs/create", data);
  },
  deleteDocument(id: string) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
  },
  updateDocument(data: DocumentType) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${data.id}`, data);
  },
};


instance.interceptors.request.use(
    function (config) {
      if (!config.headers.Authorization) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['x-auth'] = token;
        }
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );