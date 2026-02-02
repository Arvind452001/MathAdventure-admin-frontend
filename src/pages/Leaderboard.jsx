'use client';

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Leaderboard() {

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Leaderboard" />
        <main className="container-fluid">
          <div className="row g-3 page-section">
            <div className="col-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title mb-0">Student Leaderboard</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table datatable">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Student Name</th>
                          <th>Grade</th>
                          <th>Points</th>
                          <th>Quests</th>
                          <th>Badges</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong style={{ color: '#651d32' }}>1</strong></td>
                          <td><strong>Jane Doe</strong></td>
                          <td>Grade 8</td>
                          <td><strong>12,400 pts</strong></td>
                          <td>45</td>
                          <td><span className="badge bg-success">Gold</span></td>
                        </tr>
                        <tr>
                          <td><strong style={{ color: '#651d32' }}>2</strong></td>
                          <td><strong>John Smith</strong></td>
                          <td>Grade 7</td>
                          <td><strong>9,800 pts</strong></td>
                          <td>38</td>
                          <td><span className="badge bg-info">Silver</span></td>
                        </tr>
                        <tr>
                          <td><strong style={{ color: '#651d32' }}>3</strong></td>
                          <td><strong>Arjun Kumar</strong></td>
                          <td>Grade 7</td>
                          <td><strong>8,950 pts</strong></td>
                          <td>35</td>
                          <td><span className="badge bg-info">Silver</span></td>
                        </tr>
                        <tr>
                          <td><strong style={{ color: '#651d32' }}>4</strong></td>
                          <td><strong>Priya Singh</strong></td>
                          <td>Grade 8</td>
                          <td><strong>8,600 pts</strong></td>
                          <td>32</td>
                          <td><span className="badge bg-secondary">Bronze</span></td>
                        </tr>
                        <tr>
                          <td><strong style={{ color: '#651d32' }}>5</strong></td>
                          <td><strong>Rahul Mehta</strong></td>
                          <td>Grade 6</td>
                          <td><strong>7,250 pts</strong></td>
                          <td>28</td>
                          <td><span className="badge bg-secondary">Bronze</span></td>
                        </tr>
                        <tr>
                          <td><strong style={{ color: '#651d32' }}>6</strong></td>
                          <td><strong>Maria Garcia</strong></td>
                          <td>Grade 7</td>
                          <td><strong>6,800 pts</strong></td>
                          <td>25</td>
                          <td><span className="badge bg-secondary">Bronze</span></td>
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

export default Leaderboard
