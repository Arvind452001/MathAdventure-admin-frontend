'use client';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function AddQuest() {

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Add Quest" />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Quest Title</label>
                    <input className="form-control" defaultValue="Fractions Mastery" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Reward (points)</label>
                    <input className="form-control" defaultValue="50" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="6">Complete 10 fraction problems...</textarea>
                  </div>
                  <div><button type="submit" className="btn btn-primary">Save</button></div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddQuest
