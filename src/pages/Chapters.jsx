"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axiosInstance from "../api/axiosInstance";
import { getChapterApi } from './../api/chapterApi';

function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CHAPTERS ================= */
  const fetchChapters = async () => {
    try {
      const res = await getChapterApi()
      setChapters(res?.data?.data || []);
    } catch (error) {
      console.error("Chapters fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Chapters" />

        <main className="container-fluid">
          <div className="card mt-4 mb-4">
            <div className="card-body">
              <h5 style={{ color: "#651d32", fontWeight: 600 }}>
                All Chapters
              </h5>

              {loading ? (
                <p className="mt-3">Loading chapters...</p>
              ) : (
                <div className="table-responsive mt-3">
                  <table className="table table-hover align-middle">
                    <thead style={{ background: "#651d32", color: "#fff" }}>
                      <tr>
                        <th>Title</th>
                        <th>Lesson</th>
                        <th>Teacher</th>
                        <th>Duration</th>
                        <th>Access</th>
                        <th>Status</th>
                        <th style={{ textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {chapters.map((chapter) => (
                        <tr key={chapter._id}>
                          <td style={{ fontWeight: 500 }}>
                            {chapter.title}
                          </td>

                          <td>{chapter.lessonId?.title}</td>

                          <td>
                            {chapter.teacherId?.firstName}{" "}
                            {chapter.teacherId?.lastName}
                          </td>

                          <td>{chapter.duration} min</td>

                          <td>
                            <span className="badge bg-info text-dark">
                              {chapter.accessType}
                            </span>
                          </td>

                          <td>
                            <span className="badge bg-success">
                              {chapter.status}
                            </span>
                          </td>

                          <td style={{ textAlign: "right" }}>
                            <Link
                              to={`/chapters/${chapter._id}`}
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

export default Chapters;
