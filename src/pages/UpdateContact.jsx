'use client';

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getContactApi, updateContactApi } from "../api/contactApi";

function ContactUpdate() {

  const [contactId, setContactId] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ================= FETCH CONTACT ================= */
  const fetchContact = async () => {
    try {
      const res = await getContactApi();
      const data = res?.data?.data;

      setContactId(data._id);
      setFormData({
        address: data.address || "",
        email: data.email || "",
        phone: data.phone || ""
      });

    } catch (error) {
      console.error("Fetch contact failed", error);
      alert("Failed to load contact data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await updateContactApi(formData);

      // show success popup
      setShowSuccess(true);

      // hide after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);

    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update contact");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Update Contact" />

        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">

                <h5 className="mb-4">Contact Information</h5>

                <form onSubmit={handleSubmit}>

                  {/* ADDRESS */}
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* PHONE */}
                  <div className="mb-4">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? "Updating..." : "Update Contact"}
                  </button>

                </form>

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ===== SUCCESS POPUP (2 SECONDS) ===== */}
      {showSuccess && (
        <div
          className="position-fixed top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
          style={{
            zIndex: 1055,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)"
          }}
        >
          <div
            className="bg-white text-center p-4 rounded"
            style={{ minWidth: "260px" }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
              style={{
                width: "48px",
                height: "48px",
                background: "#28a745",
                color: "#fff",
                fontSize: "26px"
              }}
            >
              ✓
            </div>
            <div className="fw-semibold">
              Contact updated successfully
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


export default ContactUpdate;
