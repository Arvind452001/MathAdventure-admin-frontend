"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getPlansApi, deletePlanApi } from "../api/PlanApi";

function Plans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // delete popup state
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  /* ================= FETCH PLANS ================= */

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await getPlansApi();
      setPlans(res.data.data || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= ROW CLICK ================= */

  const handleRowClick = (id) => {
    navigate(`/planDetails/${id}`);
  };

  /* ================= DELETE ================= */

  const openDeletePopup = (id) => {
    setSelectedPlanId(id);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setSelectedPlanId(null);
    setShowDeletePopup(false);
  };

  const confirmDelete = async () => {
    try {
      await deletePlanApi(selectedPlanId);
      setPlans((prev) =>
        prev.filter((plan) => plan._id !== selectedPlanId)
      );
      closeDeletePopup();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete plan");
    }
  };

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Plans" />

        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Plans</h5>
                  <Link to="/plans/add" className="btn btn-primary">
                    Create Plan
                  </Link>
                </div>

                {/* TABLE */}
                <div className="table-responsive">
                  <table className="table datatable table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Interval</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : plans.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No plans found
                          </td>
                        </tr>
                      ) : (
                        plans.map((plan, index) => (
                          <tr
                            key={plan._id}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleRowClick(plan._id)
                            }
                          >
                            <td>{index + 1}</td>
                            <td>{plan.name}</td>
                            <td>{plan.title}</td>
                            <td>
                              {plan.currency} {plan.price}
                            </td>
                            <td>{plan.interval}</td>
                            <td>
                              <span
                                className={`fw-semibold small ${
                                  plan.isActive
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                              >
                                {plan.isActive
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </td>

                            {/* ACTIONS */}
                            <td
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              {/* UPDATE */}
                              <button
                                className="btn btn-sm btn-success me-2"
                                title="Update Plan"
                                onClick={() =>
                                  navigate(
                                    `/plans/update/${plan._id}`
                                  )
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </button>

                              {/* DELETE */}
                              <button
                                className="btn btn-sm btn-danger"
                                title="Delete Plan"
                                onClick={() =>
                                  openDeletePopup(plan._id)
                                }
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* DELETE CONFIRMATION POPUP */}
                {showDeletePopup && (
                  <>
                    <div className="modal fade show d-block">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              Delete Plan
                            </h5>
                            <button
                              className="btn-close"
                              onClick={closeDeletePopup}
                            ></button>
                          </div>

                          <div className="modal-body">
                            Are you sure you want to delete
                            this plan?
                          </div>

                          <div className="modal-footer">
                            <button
                              className="btn btn-secondary"
                              onClick={closeDeletePopup}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={confirmDelete}
                            >
                              Sure
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-backdrop fade show"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Plans;
