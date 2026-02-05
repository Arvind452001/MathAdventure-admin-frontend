'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { getQuestsApi } from '../api/QuestStatsApi';

function Quests() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuests = async () => {
    try {
      const res = await getQuestsApi();
      setQuests(res.data.data || []);
    } catch (err) {
      setError('Failed to load quests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

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
                  {/* <Link to="/quests/add" className="btn btn-sm btn-primary">
                    New Quest
                  </Link> */}
                </div>

                {loading && (
                  <div className="text-center py-4">Loading quests...</div>
                )}

                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                {!loading && !error && (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Quest</th>
                          <th>Teacher</th>
                          <th>Reward</th>
                          <th>Status</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {quests.map((quest, index) => (
                          <tr key={quest._id}>
                            <td>{index + 1}</td>

                            {/* Quest Info */}
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={quest.thumbnail}
                                  alt="thumb"
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '6px',
                                    objectFit: 'cover',
                                  }}
                                />
                                <div>
                                  <div style={{ fontWeight: 600 }}>
                                    {quest.title}
                                  </div>
                                  <small className="text-muted">
                                    {quest.lessonId?.title}
                                  </small>
                                </div>
                              </div>
                            </td>

                            {/* Teacher */}
                            <td>
                              {quest.teacherId?.firstName}{' '}
                              {quest.teacherId?.lastName}
                            </td>

                            {/* Reward */}
                            <td>
                              {quest.rewards?.xpPoints} XP /{' '}
                              {quest.rewards?.coins} Coins
                            </td>

                            {/* Status */}
                            <td>
                              {quest.isPublished ? (
                                <span className="badge bg-success">
                                  Live
                                </span>
                              ) : (
                                <span className="badge bg-secondary">
                                  Draft
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            {/* <td>
                              <Link
                                to={`/quests/${quest._id}`}
                                className="btn btn-sm btn-success me-1"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button className="btn btn-sm btn-danger">
                                <i className="bi bi-trash"></i>
                              </button>
                            </td> */}
                          </tr>
                        ))}

                        {quests.length === 0 && (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              No quests found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Quests;
