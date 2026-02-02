import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getTeacherByID } from "../api/TeacherApi";

const TeacherDetails = () => {
  const { teacherId } = useParams();
// console.log("teacherId",teacherId)
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeacher();
  }, [teacherId]);

  const fetchTeacher = async () => {
    try {
      setLoading(true);

      const res = await getTeacherByID(teacherId);

console.log("res",res)
      // API usually returns { success, data }
      setTeacher(res.data.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch teacher details"
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
          <Header title="Teacher Details" />
          <div className="text-center mt-5">
            <div
              className="spinner-border"
              style={{ color: "#651d32" }}
            />
            <p className="mt-2" style={{ color: "#651d32" }}>
              Loading teacher details...
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
          <Header title="Teacher Details" />
          <div className="alert alert-danger m-4 text-center pt-8">
            {error}no data found
          </div>
        </div>
      </div>
    );
  }

  if (!teacher) return null;

  const subjects = teacher.subjectsYouTeach?.length
    ? JSON.parse(teacher.subjectsYouTeach[0])
    : [];

  const grades = teacher.gradesYouTeach?.length
    ? JSON.parse(teacher.gradesYouTeach[0])
    : [];

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Teacher Details" />

        <main className="container-fluid pt-8">
          <div className="card shadow-lg border-0">
            {/* Card Header */}
            <div
              className="card-header text-white d-flex align-items-center gap-4"
              style={{ backgroundColor: "#651d32" }}
            >
              <img
                src={teacher.avatar}
                alt="Teacher Avatar"
                className="rounded-circle border border-3 border-white"
                width="120"
                height="120"
              />

              <div>
                <h3 className="mb-1">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="mb-2">
                  {teacher.highestQualification} •{" "}
                  {teacher.totalExperienceYears} Years Experience
                </p>

                <span
                  className={`badge me-2 ${
                    teacher.isActive ? "bg-success" : "bg-danger"
                  }`}
                >
                  {teacher.isActive ? "Active" : "Inactive"}
                </span>

                {teacher.isVerified && (
                  <span className="badge bg-warning text-dark">
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <Section title="Personal Information">
                <Info label="Email" value={teacher.email} />
                <Info label="Mobile" value={teacher.mobileNumber} />
                <Info label="Gender" value={teacher.gender} />
                <Info label="Date of Birth" value={teacher.dateOfBirth} />
                <Info
                  label="Location"
                  value={`${teacher.city}, ${teacher.country}`}
                />
              </Section>

              <Section title="Teaching Details">
                <Info
                  label="Subjects You Teach"
                  value={subjects.join(", ")}
                />
                <Info
                  label="Grades You Teach"
                  value={grades.join(", ")}
                />
              </Section>

              <Section title="Account Information">
                <Info label="Teacher ID" value={teacher._id} />
                <Info
                  label="Created At"
                  value={new Date(
                    teacher.createdAt
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
      <div className="fw-bold">{value || "-"}</div>
    </div>
  </div>
);

export default TeacherDetails;
