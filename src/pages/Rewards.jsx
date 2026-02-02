'use client';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Rewards() {

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Rewards" />
        <main className="container-fluid">
          <div className="row g-3 page-section">
            <div className="col-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title mb-0">Manage Rewards & Badges</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>Badge Name</th>
                          <th>Description</th>
                          <th>Points Required</th>
                          <th>Category</th>
                          <th>Earned By</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Gold Master</strong></td>
                          <td>Complete 50 quests</td>
                          <td>12,000</td>
                          <td><span className="badge bg-warning">Gold</span></td>
                          <td>12 students</td>
                          <td>
                            <a href="#" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></a>
                            <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Silver Star</strong></td>
                          <td>Complete 30 quests</td>
                          <td>8,000</td>
                          <td><span className="badge bg-info">Silver</span></td>
                          <td>28 students</td>
                          <td>
                            <a href="#" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></a>
                            <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Bronze Achiever</strong></td>
                          <td>Complete 15 quests</td>
                          <td>5,000</td>
                          <td><span className="badge bg-secondary">Bronze</span></td>
                          <td>45 students</td>
                          <td>
                            <a href="#" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></a>
                            <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Math Wizard</strong></td>
                          <td>Score 90%+ in Algebra</td>
                          <td>6,000</td>
                          <td><span className="badge" style={{ background: '#651d32' }}>Math</span></td>
                          <td>18 students</td>
                          <td>
                            <a href="#" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></a>
                            <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Science Scholar</strong></td>
                          <td>Complete all Science lessons</td>
                          <td>7,000</td>
                          <td><span className="badge" style={{ background: '#00305c' }}>Science</span></td>
                          <td>22 students</td>
                          <td>
                            <a href="#" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></a>
                            <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Rewards
