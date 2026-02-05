import axiosInstance from "./axiosInstance";



// 🟢 Create New student
export const getQuestStatsApi = () => {
  return axiosInstance.get("/student/quests");
};

export const getQuestsApi = () => {
  return axiosInstance.get("/admin/all/quests");
};



