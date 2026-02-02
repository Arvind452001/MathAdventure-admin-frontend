'use client';

import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

function Problems() {

  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Problems" />
        <main className="container-fluid">
          <div className="page-section">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Problem Scenarios</h5>
                  <div><Link to="/problems/add" className="btn btn-primary">New problem</Link></div>
                </div>
                <div className="table-responsive">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Problem</th>
                        <th>Difficulty</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Fraction addition (3 terms)</td>
                        <td>Easy</td>
                        <td><Link to="/problems/1" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Solve for x: 2x+5=15</td>
                        <td>Easy</td>
                        <td><Link to="/problems/2" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Area of triangle</td>
                        <td>Medium</td>
                        <td><Link to="/problems/3" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Quadratic roots</td>
                        <td>Medium</td>
                        <td><Link to="/problems/4" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Probability: coin tosses</td>
                        <td>Medium</td>
                        <td><Link to="/problems/5" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Rate and time word problem</td>
                        <td>Hard</td>
                        <td><Link to="/problems/6" className="btn btn-sm btn-success"><i className="bi bi-pencil"></i></Link> <a href="#" className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></a></td>
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

export default Problems
