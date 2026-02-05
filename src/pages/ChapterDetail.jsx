"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axiosInstance from "../api/axiosInstance";
import { getChapterDetailsApi } from "../api/chapterApi";

function ChapterDetail() {
  const { chapterID } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CHAPTER DETAIL ================= */
  const fetchChapterDetail = async () => {
    try {
      const res = await getChapterDetailsApi(chapterID);
      setChapter(res?.data?.data);
    } catch (error) {
      console.error("Chapter detail fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapterDetail();
  }, [chapterID]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!chapter) return <p style={{ padding: 20 }}>Chapter not found</p>;

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Chapter Detail" />

        <main className="container-fluid">
          <div className="card mt-2 mb-2">
            <div className="card-body">
              <Link to="/chapters" style={{ color: "#651d32" }}>
                ← Back to Chapters
              </Link>

              <h4 className="mt-3" style={{ color: "#651d32" }}>
                {chapter.title}
              </h4>

              <p className="text-muted">{chapter.description}</p>

              <hr />

              {/* VIDEO */}
              <div className="d-flex justify-content-center my-4">
                <video
                  controls
                  style={{
                    width: "75%",
                    borderRadius: "8px",
                  }}
                  src={chapter.videoUrl}
                />
              </div>

              <hr />

              <p>
                <strong>Lesson:</strong> {chapter.lessonId?.title}
              </p>

              <p>
                <strong>Teacher:</strong> {chapter.teacherId?.firstName}{" "}
                {chapter.teacherId?.lastName}
              </p>

              <p>
                <strong>Email:</strong> {chapter.teacherId?.email}
              </p>

              <p>
                <strong>Duration:</strong> {chapter.duration} minutes
              </p>

              <p>
                <strong>Access Type:</strong> {chapter.accessType}
              </p>

              <p>
                <strong>Status:</strong> {chapter.status}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(chapter.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChapterDetail;
