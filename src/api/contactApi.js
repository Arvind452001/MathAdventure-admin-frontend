import axiosInstance from "./axiosInstance";

export const getContactApi = () => {
  return axiosInstance.get("/admin/contact/setting");
};

export const updateContactApi = (payload) => {
  return axiosInstance.put("/admin/contact/setting/", payload);
};


export const getAllContactMessagesApi = () => {
  return axiosInstance.get("/admin/contact/all");
};

export const getContactMessageByIdApi = (id) => {
  return axiosInstance.get(`/admin/contact/${id}`);
};