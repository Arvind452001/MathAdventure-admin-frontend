import axiosInstance from "./axiosInstance";

// 🟢 Login Admin
export const loginApi = (data) => {
  return axiosInstance.post("/student/login", data);
};

//////////////////////-----STUDENT API------////////////////////

// 🟢 Create New student
export const addStudentApi = (data) => {
  return axiosInstance.post("/admin/student", data);
};
// 🟢 Get student
export const getStudentApi = () => {
  return axiosInstance.get("/admin/all/students");
};

// 🟢 Get Teacher By ID
// 🟢 Get Student By ID
export const getStudentByID = (id) => {
  return axiosInstance.get(`/admin/student/${id}`);
};

// 🟢 UPDATE student (for edit page)
export const changeStudentStatusApi = (id) => {
  return axiosInstance.patch(`/admin/student/${id}`);
};

// 🔴 DELETE student
export const deleteStudentApi = (id) => {
  console.log("id", id);
  return axiosInstance.delete(`/admin/student/${id}`);
};




