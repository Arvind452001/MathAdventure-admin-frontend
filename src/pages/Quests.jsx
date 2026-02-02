'use client';

import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Quests() {

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Quests" />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Quests</h5>
                  <div><Link to="/quests/add" className="btn btn-primary">New quest</Link></div>
                </div>
                <div className="table-responsive">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Quest</th>
                        <th>Reward</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Fractions Mastery</td>
                        <td>50 pts</td>
                        <td><span className="status-active">Live</span></td>
                        <td><Link to="/quests/1" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Algebra Sprint</td>
                        <td>75 pts</td>
                        <td><span className="status-active">Live</span></td>
                        <td><Link to="/quests/2" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Geometry Challenge</td>
                        <td>60 pts</td>
                        <td><span className="status-active">Live</span></td>
                        <td><Link to="/quests/3" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Decimals Drill</td>
                        <td>40 pts</td>
                        <td><span className="status-block">Paused</span></td>
                        <td><Link to="/quests/4" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Word Problem Marathon</td>
                        <td>100 pts</td>
                        <td><span className="status-active">Live</span></td>
                        <td><Link to="/quests/5" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Probability Run</td>
                        <td>55 pts</td>
                        <td><span className="status-active">Live</span></td>
                        <td><Link to="/quests/6" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Quests
