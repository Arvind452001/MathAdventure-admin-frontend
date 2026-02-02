import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Dashboard() {
  useEffect(() => {
    // Main.js handles toggle button - just ensure charts initialize
    const initCharts = () => {
      if (typeof Chart !== 'undefined') {
        const barCanvas = document.getElementById('barChart')
        if (barCanvas && !barCanvas.dataset.chartInit) {
          const barCtx = barCanvas.getContext('2d')
          new Chart(barCtx, {
            type: 'bar',
            data: {
              labels: ['Mathematics', 'Science', 'English'],
              datasets: [{
                label: 'Students',
                data: [420, 560, 380],
                backgroundColor: '#651d32',
                borderColor: '#651d32',
                borderWidth: 1,
                borderRadius: 8,
                barPercentage: 0.7
              }, {
                label: 'Teachers',
                data: [42, 38, 35],
                backgroundColor: '#00305c',
                borderColor: '#00305c',
                borderWidth: 1,
                borderRadius: 8,
                barPercentage: 0.7
              }]
            },
            options: {
              indexAxis: 'y',
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                tooltip: { padding: 12, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.8)' }
              },
              scales: {
                x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                y: { grid: { display: false } }
              }
            }
          })
          barCanvas.dataset.chartInit = '1'
        }

        const donutCanvas = document.getElementById('donutChart')
        if (donutCanvas && !donutCanvas.dataset.chartInit) {
          const donutCtx = donutCanvas.getContext('2d')
          new Chart(donutCtx, {
            type: 'doughnut',
            data: {
              labels: ['Completed', 'In Progress', 'Not Started'],
              datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#39ab71', '#00305c', '#d4a5b4'],
                borderColor: '#ffffff',
                borderWidth: 3
              }]
            },
            options: {
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', padding: 20 },
                tooltip: { padding: 12, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.8)' }
              }
            }
          })
          donutCanvas.dataset.chartInit = '1'
        }
      }
    }

    setTimeout(initCharts, 300)
  }, [])

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Dashboard" />
        <main className="container-fluid">
          <div className="row g-3 mb-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg,#651d32,#8b2f47)' }}>
                <div>
                  <h6>Active Students</h6>
                  <h3>1,248</h3>
                  <p className="small muted mt-2 mb-0">↑ 12% from last month</p>
                </div>
                <div className="icon-box"><i className="bi bi-people-fill"></i></div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg,#00305c,#004a8a)' }}>
                <div>
                  <h6>Total Teachers</h6>
                  <h3>342</h3>
                  <p className="small muted mt-2 mb-0">↑ 8% from last month</p>
                </div>
                <div className="icon-box"><i className="bi bi-person-plus-fill"></i></div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg, #39ab71, #21651d)' }}>
                <div>
                  <h6>Quests Completed</h6>
                  <h3>4,120</h3>
                  <p className="small muted mt-2 mb-0">↑ 24% from last month</p>
                </div>
                <div className="icon-box"><i className="bi bi-flag-fill"></i></div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="stat-box" style={{ background: 'linear-gradient(135deg, #FF5722, #9f3b00)' }}>
                <div>
                  <h6>Total Lessons</h6>
                  <h3>567</h3>
                  <p className="small muted mt-2 mb-0">↑ 5% from last month</p>
                </div>
                <div className="icon-box"><i className="bi bi-journal-text"></i></div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Performance Overview</h5>
                  <div style={{ height: '320px' }}><canvas id="barChart"></canvas></div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Learning Progress</h5>
                  <div style={{ height: '320px' }}><canvas id="donutChart"></canvas></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-lg-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title mb-0">Top Performing Students</h5>
                </div>
                <div className="card-body">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td><div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>AR</div></td>
                        <td><strong>Arjun Kumar</strong><br /><small className="muted">Grade 7</small></td>
                        <td className="text-end"><strong style={{ color: '#651d32' }}>98%</strong></td>
                      </tr>
                      <tr>
                        <td><div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>PR</div></td>
                        <td><strong>Priya Singh</strong><br /><small className="muted">Grade 8</small></td>
                        <td className="text-end"><strong style={{ color: '#651d32' }}>95%</strong></td>
                      </tr>
                      <tr>
                        <td><div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>RA</div></td>
                        <td><strong>Rahul Mehta</strong><br /><small className="muted">Grade 6</small></td>
                        <td className="text-end"><strong style={{ color: '#651d32' }}>92%</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title mb-0">Recent Activity</h5>
                </div>
                <div className="card-body">
                  <div className="timeline">
                    <div className="timeline-item mb-3">
                      <div className="d-flex gap-3">
                        <div className="timeline-marker" style={{ background: '#651d32', width: '12px', height: '12px', borderRadius: '50%', marginTop: '4px' }}></div>
                        <div>
                          <strong>Arjun completed Algebra Quest</strong>
                          <br /><small className="muted">2 hours ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item mb-3">
                      <div className="d-flex gap-3">
                        <div className="timeline-marker" style={{ background: '#00305c', width: '12px', height: '12px', borderRadius: '50%', marginTop: '4px' }}></div>
                        <div>
                          <strong>Priya earned Geometry Badge</strong>
                          <br /><small className="muted">4 hours ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="d-flex gap-3">
                        <div className="timeline-marker" style={{ background: '#651d32', width: '12px', height: '12px', borderRadius: '50%', marginTop: '4px' }}></div>
                        <div>
                          <strong>New lesson: Fractions Advanced</strong>
                          <br /><small className="muted">6 hours ago</small>
                        </div>
                      </div>
                    </div>
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

export default Dashboard
