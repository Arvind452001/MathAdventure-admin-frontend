import axiosInstance from "./axiosInstance";



// 🟢dashboard data Api
export const getDashboardApi = () => {
  return axiosInstance.get("/admin/dashboard/analytics");
};

// 🟢dashboard data Api
export const getSubscriptionAnalyticsApi = () => {
  return axiosInstance.get("/admin/subscription/analytics");
};

// 🟢dashboard data Api
export const getBillingHistoryApi = () => {
  return axiosInstance.get("/admin/billing/history");
};


