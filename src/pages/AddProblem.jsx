'use client';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function AddProblem() {

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Add Problem" />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input className="form-control" defaultValue="Fraction addition (3 terms)" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Content / Prompt</label>
                    <textarea className="form-control" rows="6">Enter problem text...</textarea>
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

export default AddProblem
