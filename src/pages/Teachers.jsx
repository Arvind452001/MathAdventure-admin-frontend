"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  deleteTeacherApi,
  getTeacherApi,
  changeTeacherStatusApi, // 🔁 status toggle API
} from "../api/TeacherApi";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const parseArrayString = (value) => {
    try {
      if (!value || !value.length) return "-";
      return JSON.parse(value[0]).join(", ");
    } catch {
      return "-";
    }
  };

  /* ================= FETCH TEACHERS ================= */

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await getTeacherApi();
      setTeachers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;

    try {
      await deleteTeacherApi(id);
      setTeachers((prev) => prev.filter((t) => t._id !== id));
      setSuccessMessage("Teacher deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      alert("Failed to delete teacher");
    }
  };

  /* ================= STATUS TOGGLE ================= */

  const handleStatusToggle = async (id) => {
    try {
      await changeTeacherStatusApi(id);
      fetchTeachers(); // refresh list after toggle
    } catch (error) {
      console.error("Status change failed:", error);
      alert("Failed to change status");
    }
  };

  /* ================= ROW CLICK ================= */

  const handleRowClick = (id) => {
    navigate(`/teacherDetails/${id}`);
  };

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Teachers" />

        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                {successMessage && (
                  <div className="alert alert-success py-2">
                    {successMessage}
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Teachers</h5>
                </div>

                <div className="table-responsive">
                  <table className="table datatable table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : teachers.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No teachers found
                          </td>
                        </tr>
                      ) : (
                        teachers.map((teacher, index) => (
                          <tr
                            key={teacher._id}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRowClick(teacher._id)}
                          >
                            <td>{index + 1}</td>
                            <td>
                              {teacher.firstName} {teacher.lastName}
                            </td>
                            <td>{teacher.email}</td>
                            <td>
                              {parseArrayString(teacher.subjectsYouTeach)}
                            </td>

                            {/* STATUS */}
                            <td>
                              <span
                                className={`badge ${
                                  teacher.isActive ? "bg-success" : "bg-danger"
                                }`}
                              >
                                {teacher.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>

                            {/* ACTIONS */}
                            <td
                              onClick={(e) => e.stopPropagation()} // ⛔ stop row click
                            >
                              {/* STATUS TOGGLE */}
                              <button
                                className={`btn btn-sm ${
                                  teacher.isActive
                                    ? "btn-warning"
                                    : "btn-success"
                                } me-2`}
                                title={
                                  teacher.isActive ? "Deactivate" : "Activate"
                                }
                                onClick={() => handleStatusToggle(teacher._id)}
                              >
                                <i
                                  className={`bi ${
                                    teacher.isActive
                                      ? "bi-toggle-on"
                                      : "bi-toggle-off"
                                  }`}
                                  style={{ fontSize: "1.2rem" }}
                                ></i>
                              </button>

                              {/* DELETE */}
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(teacher._id)}
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Teachers;
