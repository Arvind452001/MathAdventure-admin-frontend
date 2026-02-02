import axiosInstance from "./axiosInstance";


//////////////////////-----TEACHER API------////////////////////


// 🟢 Get Teacher
export const getTeacherApi = () => {
  return axiosInstance.get("/admin/all/teachers");
};

// 🟢 Get Teacher By ID
export const getTeacherByID = (id) => {
  console.log("id",id)
  return axiosInstance.get(`/admin/teacher/${id}`);
};

// 🔴 DELETE Teacher
export const changeTeacherStatusApi = (id) => {
  console.log("id", id);
  return axiosInstance.patch(`/admin/teacher/${id}`);
};

// 🟢 UPDATE Teacher (for edit page)
export const deleteTeacherApi = (id, data) => {
  return axiosInstance.put(`/admin/teacher/${id}`, data);
};