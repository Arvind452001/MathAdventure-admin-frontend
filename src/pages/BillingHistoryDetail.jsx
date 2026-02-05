import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getBillingDetailsApi } from "../api/dashboardApi";

const BRAND = "#651d32";
const BRAND_DARK = "#00305c";
const BG_SOFT = "#faf7f8";

function BillingHistoryDetail() {
  const { historyId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    getBillingDetailsApi(historyId)
      .then((res) => setData(res?.data?.data))
      .catch((err) => console.error(err));
  }, [historyId]);

  if (!data) {
    return (
      <p style={{ padding: 24, color: BRAND }}>Loading billing details...</p>
    );
  }

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Billing Details" />

        <main className="container-fluid mt-4">
          <div
            className="card"
            style={{
              padding: "24px",
              borderRadius: "14px",
              border: `1px solid ${BRAND}20`,
              background: BG_SOFT,
            }}
          >
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate(-1)}
              style={{
                border: `1px solid ${BRAND}`,
                color: BRAND,
                background: "#fff",
                padding: "6px 14px",
                borderRadius: "8px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              ← Back
            </button>

            {/* USER DETAILS */}
            <div
              style={{
                borderLeft: `4px solid ${BRAND}`,
                paddingLeft: "12px",
                marginBottom: "20px",
              }}
            >
              <h5 style={{ color: BRAND, marginBottom: "12px" }}>
                User Details
              </h5>

              <p>
                <b>Name:</b> {data.userId.firstName} {data.userId.lastName}
              </p>
              <p>
                <b>Email:</b> {data.userId.email}
              </p>
            </div>

            {/* PAYMENT DETAILS */}
            <div
              style={{
                borderLeft: `4px solid ${BRAND_DARK}`,
                paddingLeft: "12px",
              }}
            >
              <h5 style={{ color: BRAND_DARK, marginBottom: "12px" }}>
                Payment Details
              </h5>

              <p>
                <b>Amount:</b>{" "}
                <span style={{ fontWeight: 700 }}>₹ {data.amount / 100}</span>
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    background: data.status === "paid" ? "#2e7d32" : "#c62828",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {data.status.toUpperCase()}
                </span>
              </p>

              <p>
                <b>Paid At:</b> {new Date(data.paidAt).toLocaleString()}
              </p>

              <p>
                <b>Transaction ID:</b>{" "}
                <span style={{ color: BRAND_DARK }}>
                  {data.stripePaymentIntentId}
                </span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BillingHistoryDetail;
