import axiosInstance from "./axiosInstance";



// 🟢 Create New student
export const getQuestStatsApi = () => {
  return axiosInstance.post("/student/quests");
};