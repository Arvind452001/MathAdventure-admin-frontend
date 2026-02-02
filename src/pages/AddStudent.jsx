'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { addStudentApi } from '../api/StudentApi';

function AddStudent() {
  const navigate = useNavigate();

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    guardianName: '',
    guardianEmail: '',
    address: '',
  });

  // 🔹 INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 PHOTO CHANGE
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔹 SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('grade', formData.grade);
      payload.append('guardianName', formData.guardianName);
      payload.append('guardianEmail', formData.guardianEmail);
      payload.append('address', formData.address);

      if (photoFile) {
        payload.append('photo', photoFile);
      }

      await addStudentApi(payload);

      setSuccessMessage('Student added successfully');

      setTimeout(() => {
        navigate('/students');
      }, 2000);

    } catch (error) {
      console.error('Add student failed:', error);
      alert('Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Add Student" />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">

                <h5 className="mb-4">Add New Student</h5>

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                  <div className="alert alert-success py-2">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-3 text-center mb-4">
                      <div
                        style={{
                          width: '140px',
                          height: '140px',
                          background: '#f0f0f0',
                          borderRadius: '10px',
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt="preview"
                          />
                        ) : (
                          <i className="bi bi-image" style={{ fontSize: '48px', color: '#ccc' }}></i>
                        )}
                      </div>

                      <div className="mt-3">
                        <input
                          type="file"
                          id="photoInput"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handlePhotoChange}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => document.getElementById('photoInput').click()}
                        >
                          Upload Photo
                        </button>
                      </div>
                    </div>

                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Email *</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Grade/Class *</label>
                          <select
                            name="grade"
                            className="form-control"
                            required
                            value={formData.grade}
                            onChange={handleChange}
                          >
                            <option value="">Select grade</option>
                            <option value="1">Grade 1</option>
                            <option value="2">Grade 2</option>
                            <option value="3">Grade 3</option>
                            <option value="4">Grade 4</option>
                            <option value="5">Grade 5</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Guardian Name</label>
                          <input
                            type="text"
                            name="guardianName"
                            className="form-control"
                            value={formData.guardianName}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Guardian Email</label>
                          <input
                            type="email"
                            name="guardianEmail"
                            className="form-control"
                            value={formData.guardianEmail}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                          name="address"
                          className="form-control"
                          rows="2"
                          value={formData.address}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      <i className="bi bi-check-circle"></i>{' '}
                      {loading ? 'Saving...' : 'Add Student'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/students')}
                    >
                      Cancel
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddStudent;
