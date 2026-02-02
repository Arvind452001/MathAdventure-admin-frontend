'use client';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function AddLesson() {

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Add Lesson" />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input className="form-control" defaultValue="Advanced Algebra" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" rows="8">Lesson content...</textarea>
                  </div>
                  <div className="mb-3 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-outline-secondary">Approve</button>
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

export default AddLesson
