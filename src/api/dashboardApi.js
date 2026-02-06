import axiosInstance from "./axiosInstance";



// 🟢dashboard data Api
export const getDashboaranalyticsdApi = () => {
  return axiosInstance.get("/admin/dashboard/analytics");
};

export const getDashboardprogressApi = () => {
  return axiosInstance.get("/admin/student/progress/chart");
};

// 🟢dashboard data Api
export const getSubscriptionAnalyticsApi = () => {
  return axiosInstance.get("/admin/subscription/analytics");
};

// 🟢dashboard data Api
export const getBillingHistoryApi = () => {
  return axiosInstance.get("/admin/billing/history");
};


// 🟢dashboard data Api
export const getBillingDetailsApi = (id) => {
  return axiosInstance.get(`admin/billing/history/${id}`);
};