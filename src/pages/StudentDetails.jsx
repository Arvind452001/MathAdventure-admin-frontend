import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getStudentByID } from "../api/StudentApi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const StudentDetails = () => {
  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const res = await getStudentByID(studentId);
      setStudent(res.data.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch student details"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="admin-app">
        <Sidebar />
        <div className="content">
          <Header title="Student Details" />
          <div className="text-center mt-5">
            <div
              className="spinner-border"
              style={{ color: "#651d32" }}
            />
            <p className="mt-2" style={{ color: "#651d32" }}>
              Loading student details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-app">
        <Sidebar />
        <div className="content">
          <Header title="Student Details" />
          <div className="alert alert-danger m-4 text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Student Details" />

        <main className="container-fluid pt-8">
          <div className="card shadow-lg border-0">
            {/* HEADER */}
            <div
              className="card-header text-white d-flex align-items-center gap-4"
              style={{ backgroundColor: "#651d32" }}
            >
              <img
                src={student.avatar}
                alt="Student Avatar"
                className="rounded-circle border border-3 border-white"
                width="120"
                height="120"
              />

              <div>
                <h3 className="mb-1">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="mb-2">
                  Grade {student.grade} • Age {student.age}
                </p>

                <span
                  className={`badge me-2 ${
                    student.isActive
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {student.isActive ? "Active" : "Inactive"}
                </span>

                {student.isVerified && (
                  <span className="badge bg-warning text-dark">
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* BODY */}
            <div className="card-body">
              {/* Personal Info */}
              <Section title="Personal Information">
                <Info label="Username" value={student.userName} />
                <Info label="Email" value={student.email} />
                <Info label="Phone" value={student.phone} />
                <Info label="Gender" value={student.gender} />
                <Info label="Age" value={student.age} />
              </Section>

              {/* Academic Info */}
              <Section title="Academic Information">
                <Info label="Grade" value={student.grade} />
                <Info label="XP" value={student.xp} />
                <Info label="Level" value={student.level} />
                <Info label="Coins" value={student.coins} />
              </Section>

              {/* Account Info */}
              <Section title="Account Information">
                <Info label="Role" value={student.role} />
                <Info label="Provider" value={student.provider} />
                <Info
                  label="Created At"
                  value={new Date(
                    student.createdAt
                  ).toDateString()}
                />
              </Section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* ================= Reusable Components ================= */

const Section = ({ title, children }) => (
  <>
    <h5 className="mt-4 mb-3" style={{ color: "#651d32" }}>
      {title}
    </h5>
    <div className="row g-3">{children}</div>
    <hr />
  </>
);

const Info = ({ label, value }) => (
  <div className="col-md-6">
    <div className="p-3 bg-light rounded">
      <small className="text-muted">{label}</small>
      <div className="fw-bold">{value ?? "-"}</div>
    </div>
  </div>
);

export default StudentDetails;
