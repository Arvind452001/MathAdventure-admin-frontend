"use client";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getPlansApi, updatePlanApi } from "../api/PlanApi";

const UpdatePlan = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    price: "",
    currency: "",
    interval: "",
    stripePriceId: "",
    features: [""],
    isActive: true,
  });

  /* ================= FETCH PLAN ================= */

  useEffect(() => {
    fetchPlan();
  }, [planId]);

  const fetchPlan = async () => {
    try {
      setLoading(true);

      // ⚠️ list API → find by ID
      const res = await getPlansApi();
      const plan = res.data.data.find((p) => p._id === planId);

      if (!plan) throw new Error("Plan not found");

      setForm({
        name: plan.name,
        title: plan.title,
        price: plan.price,
        currency: plan.currency,
        interval: plan.interval,
        stripePriceId: plan.stripePriceId,
        features: plan.features?.length
          ? plan.features
          : [""],
        isActive: plan.isActive,
      });
    } catch (err) {
      setError(err.message || "Failed to load plan");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      await updatePlanApi(planId, {
        ...form,
        price: Number(form.price),
      });

      navigate("/plans");
    } catch (err) {
      alert("Failed to update plan");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI STATES ================= */

  if (loading) {
    return (
      <div className="admin-app">
        <Sidebar />
        <div className="content">
          <Header title="Update Plan" />
          <div className="text-center mt-5">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-app">
        <Sidebar />
        <div className="content">
          <Header title="Update Plan" />
          <div className="alert alert-danger m-4">{error}</div>
        </div>
      </div>
    );
  }

  /* ================= FORM UI ================= */

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Update Plan" />

        <main className="container-fluid pt-8">
          <form
            onSubmit={handleSubmit}
            className="card shadow border-0"
          >
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#651d32" }}
            >
              Update Plan
            </div>

            <div className="card-body">
              <div className="row g-3">
                <Input
                  label="Plan Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                <Input
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />

                <Input
                  label="Price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                />

                <Input
                  label="Currency"
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                />

                <Input
                  label="Interval"
                  name="interval"
                  value={form.interval}
                  onChange={handleChange}
                />

                <Input
                  label="Stripe Price ID"
                  name="stripePriceId"
                  value={form.stripePriceId}
                  onChange={handleChange}
                />
              </div>

              {/* FEATURES */}
              <hr />
              <h6 className="mb-2">Features</h6>

              {form.features.map((feature, index) => (
                <div
                  key={index}
                  className="d-flex gap-2 mb-2"
                >
                  <input
                    className="form-control"
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange(
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Feature"
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFeature(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addFeature}
              >
                + Add Feature
              </button>
            </div>

            <div className="card-footer text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Plan"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

/* ================= REUSABLE INPUT ================= */

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div className="col-md-6">
    <label className="form-label">{label}</label>
    <input
      className="form-control"
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      required
    />
  </div>
);

export default UpdatePlan;
