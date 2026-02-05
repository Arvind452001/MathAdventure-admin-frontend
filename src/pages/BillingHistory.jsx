"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getBillingHistoryApi } from "../api/dashboardApi";

function BillingHistory() {
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH BILLING HISTORY ================= */
  const fetchBillingHistory = async () => {
    try {
      const res = await getBillingHistoryApi();
      setBillingData(res?.data?.data || []);
    } catch (error) {
      console.error("Billing history fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingHistory();
  }, []);

  /* ================= UI ================= */
  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Billing History" />

        <main className="container-fluid">
          <div className="card mt-4 mb-4">
            <div className="card-body">
              <h5 style={{ color: "#651d32", fontWeight: 600 }}>
                All Transactions
              </h5>

              {loading ? (
                <p className="mt-4">Loading billing history...</p>
              ) : billingData.length === 0 ? (
                <p className="mt-4 text-muted">No billing records found</p>
              ) : (
                <div className="table-responsive mt-3">
                  <table className="table table-hover align-middle">
                    <thead
                      style={{ backgroundColor: "#651d32", color: "#fff" }}
                    >
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Paid At</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {billingData.map((item) => (
                        <tr key={item._id}>
                          <td className="d-flex align-items-center gap-2">
                            <img
                              src={item.userId.avatar}
                              alt=""
                              width={36}
                              height={36}
                              style={{ borderRadius: "50%" }}
                            />
                            <span style={{ fontWeight: 500 }}>
                              {item.userId.name}
                            </span>
                          </td>

                          <td>{item.userId.email}</td>

                          <td style={{ fontWeight: 600 }}>
                            ₹ {item.amount / 100}
                          </td>

                          <td>
                            <span
                              style={{
                                backgroundColor:
                                  item.status === "paid"
                                    ? "#2e7d32"
                                    : "#c62828",
                                color: "#fff",
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "12px",
                              }}
                            >
                              {item.status.toUpperCase()}
                            </span>
                          </td>

                          <td>
                            {new Date(item.paidAt).toLocaleDateString()}
                          </td>

                          <td>
                            <button
                              className="btn btn-sm"
                              style={{
                                border: "1px solid #651d32",
                                color: "#651d32",
                              }}
                              onClick={() =>
                                navigate(`/billing-history/${item._id}`)
                              }
                            >
                              View
                            </button>
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

export default BillingHistory;
