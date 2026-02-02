"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { createPlanApi } from "../api/PlanApi";

const AddPlan = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      await createPlanApi({
        ...form,
        price: Number(form.price),
        features: form.features.filter(Boolean),
      });

      navigate("/plans");
    } catch (error) {
      console.error("Create plan failed:", error);
      alert("Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Add New Plan" />

        <main className="container-fluid pt-8">
          <form
            onSubmit={handleSubmit}
            className="card shadow border-0"
          >
            {/* HEADER */}
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#651d32" }}
            >
              Create New Plan
            </div>

            {/* BODY */}
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
                  placeholder="INR / USD"
                  value={form.currency}
                  onChange={handleChange}
                />

                <Input
                  label="Interval"
                  name="interval"
                  placeholder="month / year"
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
                    placeholder="Feature description"
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange(
                        index,
                        e.target.value
                      )
                    }
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

              {/* STATUS */}
              <hr />
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                />
                <label className="form-check-label">
                  Active
                </label>
              </div>
            </div>

            {/* FOOTER */}
            <div className="card-footer text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Plan"}
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
  placeholder = "",
}) => (
  <div className="col-md-6">
    <label className="form-label">{label}</label>
    <input
      className="form-control"
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  </div>
);

export default AddPlan;
