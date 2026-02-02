import axiosInstance from "./axiosInstance";

//// ================= CREATE ================= ////


// 🟢 CREATE PLAN
export const createPlanApi = (data) => {
  console.log("createPlanApi",data)
  return axiosInstance.post("/admin/create/plan", data);
};

//// ================= READ ================= ////


// 🟢 GET ALL PLANS
export const getPlansApi = () => {
  return axiosInstance.get("/admin/all/plans");
};


// 🟢 GET PLAN BY ID
export const getPlanByIdApi = (id) => {
  return axiosInstance.get(`/admin/plan/${id}`);
};

//// ================= UPDATE ================= ////


// 🟡 UPDATE PLAN
export const updatePlanApi = (id, data) => {
  return axiosInstance.put(`/admin/plan/${id}`, data);
};

//// ================= DELETE ================= ////


// 🔴 DELETE PLAN
export const deletePlanApi = (id) => {
  return axiosInstance.delete(`/admin/plan/${id}`);
};

//// ================= STATUS TOGGLE (OPTIONAL) ================= ////


// 🔁 TOGGLE PLAN STATUS (Active / Inactive)
// Backend should toggle automatically
export const togglePlanStatusApi = (id) => {
  return axiosInstance.patch(`/admin/plan/${id}/status`);
};
