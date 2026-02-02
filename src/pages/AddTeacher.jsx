'use client';

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function AddTeacher() {
  const [photoPreview, setPhotoPreview] = useState(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Add Teacher" />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <h5 className="mb-4">Add New Teacher</h5>
                <form>
                  <div className="row">
                    <div className="col-md-3 text-center mb-4">
                      <div style={{ width: '140px', height: '140px', background: '#f0f0f0', borderRadius: '10px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }} id="photoPreview">
                        {photoPreview ? (
                          <img src={photoPreview || "/placeholder.svg"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
                        ) : (
                          <i className="bi bi-image" style={{ fontSize: '48px', color: '#ccc' }}></i>
                        )}
                      </div>
                      <div className="mt-3">
                        <input type="file" id="photoInput" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => document.getElementById('photoInput').click()}>Upload Photo</button>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Full Name *</label>
                          <input type="text" className="form-control" placeholder="Prof. John Doe" required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Email *</label>
                          <input type="email" className="form-control" placeholder="john@example.com" required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Phone</label>
                          <input type="tel" className="form-control" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Subject(s) Taught *</label>
                          <input type="text" className="form-control" placeholder="e.g., Algebra, Geometry" required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Qualification *</label>
                          <input type="text" className="form-control" placeholder="e.g., B.Sc Mathematics" required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Experience (years)</label>
                          <input type="number" className="form-control" placeholder="5" min="0" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Bio/About</label>
                        <textarea className="form-control" rows="3" placeholder="Brief bio or introduction"></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea className="form-control" rows="2" placeholder="Street address, city, state"></textarea>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success"><i className="bi bi-check-circle"></i> Add Teacher</button>
                    <a href="/teachers" className="btn btn-outline-secondary">Cancel</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddTeacher
