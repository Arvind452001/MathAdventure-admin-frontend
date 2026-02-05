import axiosInstance from "./axiosInstance";



// 🟢 Create New student
export const getChapterApi = () => {
  return axiosInstance.get("/admin/all/chapters");
};

export const getChapterDetailsApi = (id) => {
  console.log("chapterID",id)
 return axiosInstance.get(`/admin/chapter/${id}`);
};
