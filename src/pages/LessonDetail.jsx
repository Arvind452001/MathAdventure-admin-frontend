"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getLessonDetailsApi } from "../api/LessonsApi";

function LessonDetail() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SINGLE LESSON ================= */
  const fetchLessonDetail = async () => {
    try {
      const res = await getLessonDetailsApi(lessonId);
      console.log("fetchLessonDetail", res);
      setLesson(res?.data?.data);
    } catch (error) {
      console.error("Lesson detail fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonDetail();
  }, [lessonId]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  if (!lesson) {
    return <p style={{ padding: "20px" }}>Lesson not found</p>;
  }

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Lesson Detail" />

        <main className="container-fluid">
          <div className="card mt-0 mb-4">
            <div className="card-body">
              <Link to="/lessons" style={{ color: "#651d32" }}>
                ← Back to Lessons
              </Link>

              <div className="row mt-3">
                <div className="col-md-4">
                  <img
                    src={
                      lesson.thumbnail || "https://via.placeholder.com/300x180"
                    }
                    alt="Lesson Thumbnail"
                    style={{
                      width: "260px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                <div className="col-md-8">
                  <h4 style={{ color: "#651d32" }}>{lesson.title}</h4>

                  <p className="text-muted">{lesson.topic}</p>

                  <p>{lesson.description}</p>

                  <hr />

                  <p className="d-flex align-items-center gap-2">
                    <strong>Teacher:</strong>

                    <img
                      src={lesson.teacherId.avatar}
                      alt="Teacher"
                      width={34}
                      height={34}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />

                    <span>
                      {lesson.teacherId.firstName} {lesson.teacherId.lastName}
                    </span>
                  </p>

                  <p>
                    <strong>Email:</strong> {lesson.teacherId.email}
                  </p>

                  <p>
                    <strong>Difficulty:</strong> {lesson.difficultyLevel}
                  </p>

                  <p>
                    <strong>Status:</strong> {lesson.status}
                  </p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LessonDetail;
