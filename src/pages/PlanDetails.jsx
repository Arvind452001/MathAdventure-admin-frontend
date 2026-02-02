"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getPlanByIdApi } from "../api/PlanApi";

const PlanDetails = () => {
  const { planId } = useParams();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlan();
  }, [planId]);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await getPlanByIdApi(planId);
      setPlan(res.data.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch plan details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Plan Details" />

        {/* ✅ main is ALWAYS present */}
        <main className="container-fluid pt-8">
          {/* LOADING */}
          {loading && (
            <div className="text-center mt-5">
              <div
                className="spinner-border"
                style={{ color: "#651d32" }}
              />
              <p
                className="mt-2"
                style={{ color: "#651d32" }}
              >
                Loading plan details...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          {/* DATA */}
          {!loading && !error && plan && (
            <div className="card shadow-lg border-0">
              {/* HEADER */}
              <div
                className="card-header text-white d-flex align-items-center justify-content-between"
                style={{ backgroundColor: "#651d32" }}
              >
                <div>
                  <h3 className="mb-1">{plan.name}</h3>
                  <p className="mb-0">{plan.title}</p>
                </div>

                <span
                  className={`badge ${
                    plan.isActive
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* BODY */}
              <div className="card-body">
                <Section title="Basic Information">
                  <Info label="Plan Name" value={plan.name} />
                  <Info label="Title" value={plan.title} />
                  <Info
                    label="Interval"
                    value={plan.interval}
                  />
                  <Info
                    label="Currency"
                    value={plan.currency}
                  />
                </Section>

                <Section title="Pricing">
                  <Info
                    label="Price"
                    value={`${plan.currency} ${plan.price}`}
                  />
                  <Info
                    label="Stripe Price ID"
                    value={plan.stripePriceId}
                  />
                </Section>

                <Section title="Features">
                  <div className="col-12">
                    {Array.isArray(plan.features) &&
                    plan.features.length ? (
                      <ul className="list-group">
                        {plan.features.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className="list-group-item"
                            >
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <div className="text-muted small">
                        No features available
                      </div>
                    )}
                  </div>
                </Section>

                <Section title="Meta Information">
                  <Info
                    label="Plan ID"
                    value={plan._id}
                  />
                  <Info
                    label="Created At"
                    value={new Date(
                      plan.createdAt
                    ).toDateString()}
                  />
                  <Info
                    label="Updated At"
                    value={new Date(
                      plan.updatedAt
                    ).toDateString()}
                  />
                </Section>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

/* ===== Reusable Components ===== */

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
      <div className="fw-bold">{value ?? "-"}</div>
    </div>
  </div>
);

export default PlanDetails;
