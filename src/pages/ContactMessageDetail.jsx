'use client';

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getContactMessageByIdApi } from "../api/contactApi";

function ContactMessageDetail() {
  const { massageID } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessageDetail = async () => {
    try {
      const res = await getContactMessageByIdApi(massageID);
      setMessage(res?.data?.data);
    } catch (error) {
      console.error("Fetch message failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessageDetail();
  }, [massageID]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!message) return <p style={{ padding: 20 }}>Message not found</p>;

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Contact Message Detail" />

        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">

                <Link to="/contact/messages" className="text-decoration-none">
                  ← Back to Messages
                </Link>

                <h5 className="mt-3 mb-3">Message Detail</h5>

                <p><strong>Name:</strong> {message.name}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Subject:</strong> {message.subject}</p>
                <p><strong>Status:</strong> {message.status}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(message.createdAt).toLocaleString()}
                </p>

                <hr />

                <p><strong>Message:</strong></p>
                <div className="p-3 bg-light rounded">
                  {message.message}
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ContactMessageDetail;
