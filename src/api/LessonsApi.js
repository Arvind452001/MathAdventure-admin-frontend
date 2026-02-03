import axiosInstance from "./axiosInstance";



// 🟢 Create New student
export const getLessonsApi = () => {
  return axiosInstance.get("/admin/all/lessons");
};

export const getLessonDetailsApi = (id) => {
 return axiosInstance.get(`/admin/lesson/${id}`);
};


