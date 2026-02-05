'use client';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getAllContactMessagesApi } from "../api/contactApi";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await getAllContactMessagesApi();
      setMessages(res?.data?.data || []);
    } catch (error) {
      console.error("Fetch messages failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Contact Messages" />

        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">

                <h5 className="mb-3">All Contact Messages</h5>

                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Subject</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.length === 0 && (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No messages found
                            </td>
                          </tr>
                        )}

                        {messages.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.subject}</td>
                            <td>
                              <span className="status-active">
                                {item.status}
                              </span>
                            </td>
                            <td>
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <Link
                                to={`/message/details/${item._id}`}
                                className="btn btn-sm btn-primary"
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
          </div>
        </main>
      </div>
    </div>
  );
}



export default ContactMessages
