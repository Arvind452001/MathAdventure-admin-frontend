"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getLessonsApi } from "../api/LessonsApi";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH LESSONS ================= */
  const fetchLessons = async () => {
    try {
      const res = await getLessonsApi();
      setLessons(res?.data?.data || []);
    } catch (error) {
      console.error("Lesson fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Lessons" />

        <main className="container-fluid">
          <div className="card mt-0 mb-4">
            <div className="card-body">
              <h5 style={{ color: "#651d32", fontWeight: 600 }}>
                All Lessons
              </h5>

              {loading ? (
                <p className="mt-3">Loading lessons...</p>
              ) : (
                <div className="table-responsive mt-3">
                  <table className="table table-hover align-middle">
                    <thead
                      style={{
                        backgroundColor: "#651d32",
                        color: "#fff",
                      }}
                    >
                      <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Topic</th>
                        <th>Teacher</th>
                        <th>Level</th>
                        <th>Status</th>
                        <th style={{ textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {lessons.map((lesson) => (
                        <tr key={lesson._id}>
                          <td>
                            <img
                              src={
                                lesson.thumbnail ||
                                "https://via.placeholder.com/60"
                              }
                              alt=""
                              width={60}
                              height={40}
                              style={{
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                          </td>

                          <td style={{ fontWeight: 500 }}>
                            {lesson.title}
                          </td>

                          <td>{lesson.topic}</td>

                          <td>
                            {lesson.teacherId.firstName}{" "}
                            {lesson.teacherId.lastName}
                          </td>

                          <td>
                            <span className="badge bg-secondary">
                              {lesson.difficultyLevel}
                            </span>
                          </td>

                          <td>
                            <span className="badge bg-success">
                              {lesson.status}
                            </span>
                          </td>

                          <td style={{ textAlign: "right" }}>
                            <Link
                              to={`/lessonDetail/${lesson._id}`}
                              className="btn btn-sm"
                              style={{
                                border: "1px solid #651d32",
                                color: "#651d32",
                              }}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Lessons;
