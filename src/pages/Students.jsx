"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  deleteStudentApi,
  getStudentApi,
  changeStudentStatusApi, // 🔁 toggle API
} from "../api/StudentApi";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  /* ================= FETCH STUDENTS ================= */

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudentApi();
     setStudents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await deleteStudentApi(id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setSuccessMessage("Student deleted successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      alert("Failed to delete student");
    }
  };

  /* ================= STATUS TOGGLE ================= */

  const handleStatusToggle = async (id) => {
    try {
      await changeStudentStatusApi(id);
      fetchStudents(); // refresh list
    } catch (error) {
      console.error("Status change failed:", error);
      alert("Failed to change status");
    }
  };

  /* ================= ROW CLICK ================= */

  const handleRowClick = (id) => {
    navigate(`/studentDetails/${id}`);
  };

  /* ================= SEARCH + LIMIT ================= */

  const filteredStudents = students
    .filter((student) =>
      (student.firstName || "").toLowerCase().includes(search.toLowerCase()),
    )
    .slice(0, pageSize);

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Students" />

        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                {successMessage && (
                  <div className="alert alert-success py-2">
                    {successMessage}
                  </div>
                )}

                {/* TOP CONTROLS */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex gap-2 align-items-center">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "80px" }}
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </select>

                    <input
                      type="text"
                      className="form-control form-control-sm"
                      style={{ width: "200px" }}
                      placeholder="Search by name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* TABLE */}
                <div className="table-responsive">
                  <table className="table datatable table-hover">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: "#000", color: "#fff" }}>
                          #
                        </th>
                        <th style={{ backgroundColor: "#000", color: "#fff" }}>
                          Avatar
                        </th>
                        <th style={{ backgroundColor: "#000", color: "#fff" }}>
                          Name
                        </th>
                        <th style={{ backgroundColor: "#000", color: "#fff" }}>
                          Email
                        </th>
                        <th style={{ backgroundColor: "#000", color: "#fff" }}>
                          Progress
                        </th>
                        <th style={{ backgroundColor: "#000", color: "#fff" }}>
                          Status
                        </th>
                        <th style={{ backgroundColor: "#000", color: "#fff" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No students found
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((student, index) => (
                          <tr
                            key={student._id}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRowClick(student._id)}
                          >
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={student.avatar}
                                alt="avatar"
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            </td>

                            <td>{student.firstName}</td>
                            <td>{student.email}</td>
                            <td>{student.progress || 0}%</td>

                            {/* STATUS */}
                            <td>
                              <span
                                className={
                                  student.isActive
                                    ? "text-success fw-semibold small"
                                    : "text-danger fw-semibold small"
                                }
                              >
                                {student.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>

                            {/* ACTIONS */}
                            <td onClick={(e) => e.stopPropagation()}>
                              {/* STATUS TOGGLE ICON */}
                              <button
                                className={`btn btn-sm me-2 ${
                                  student.isActive
                                    ? "btn-warning"
                                    : "btn-success"
                                }`}
                                title={
                                  student.isActive ? "Deactivate" : "Activate"
                                }
                                onClick={() => handleStatusToggle(student._id)}
                              >
                                <i
                                  className={`bi ${
                                    student.isActive
                                      ? "bi-toggle-on"
                                      : "bi-toggle-off"
                                  }`}
                                  style={{
                                    fontSize: "1.2rem",
                                  }}
                                ></i>
                              </button>

                              {/* DELETE */}
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(student._id)}
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

export default Students;
