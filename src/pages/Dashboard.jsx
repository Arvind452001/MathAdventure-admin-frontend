"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getDashboardApi, getSubscriptionAnalyticsApi } from "../api/dashboardApi";
import SubscriptionAnalytics from "../components/SubscriptionAnalytics";


function Dashboard() {
  /* ================= STATES ================= */
const [subscriptionData, setSubscriptionData] = useState(null);


  const [stats, setStats] = useState({
    activeStudents: { total: 0, growth: 0 },
    totalTeachers: { total: 0, growth: 0 },
    questsCompleted: { total: 0, growth: 0 },
    totalLessons: { total: 0, growth: 0 },
  });

/* ================= FETCH subscription DATA ================= */
  useEffect(() => {
  getSubscriptionAnalyticsApi().then(res => {
    setSubscriptionData(res.data.data);
  });
}, []);

  /* ================= FETCH DASHBOARD DATA ================= */

  const fetchDashboardData = async () => {
    try {
      const res = await getDashboardApi();
      setStats(res?.data?.data);
    } catch (error) {
      console.error("Dashboard data fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* ================= CHART INIT (UNCHANGED) ================= */

  useEffect(() => {
    const initCharts = () => {
      if (typeof Chart !== "undefined") {
        const barCanvas = document.getElementById("barChart");
        if (barCanvas && !barCanvas.dataset.chartInit) {
          new Chart(barCanvas.getContext("2d"), {
            type: "bar",
            data: {
              labels: ["Mathematics", "Science", "English"],
              datasets: [
                {
                  label: "Students",
                  data: [420, 560, 380],
                  backgroundColor: "#651d32",
                  borderRadius: 8,
                },
                {
                  label: "Teachers",
                  data: [42, 38, 35],
                  backgroundColor: "#00305c",
                  borderRadius: 8,
                },
              ],
            },
            options: {
              indexAxis: "y",
              maintainAspectRatio: false,
            },
          });
          barCanvas.dataset.chartInit = "1";
        }

        const donutCanvas = document.getElementById("donutChart");
        if (donutCanvas && !donutCanvas.dataset.chartInit) {
          new Chart(donutCanvas.getContext("2d"), {
            type: "doughnut",
            data: {
              labels: ["Completed", "In Progress", "Not Started"],
              datasets: [
                {
                  data: [65, 25, 10],
                  backgroundColor: ["#39ab71", "#00305c", "#d4a5b4"],
                },
              ],
            },
            options: { maintainAspectRatio: false },
          });
          donutCanvas.dataset.chartInit = "1";
        }
      }
    };

    setTimeout(initCharts, 300);
  }, []);

  /* ================= UI ================= */

  return (
    <div className="admin-app">
      <Sidebar />

      <div className="content">
        <Header title="Dashboard" />

        <main className="container-fluid">
          {/* ================= STATS ================= */}
          <div className="row g-3 mb-3">
            <StatBox
              title="Active Students"
              value={stats.activeStudents.total}
              growth={stats.activeStudents.growth}
              color="linear-gradient(135deg,#651d32,#8b2f47)"
              icon="bi-people-fill"
            />

            <StatBox
              title="Total Teachers"
              value={stats.totalTeachers.total}
              growth={stats.totalTeachers.growth}
              color="linear-gradient(135deg,#00305c,#004a8a)"
              icon="bi-person-plus-fill"
            />

            <StatBox
              title="Quests Completed"
              value={stats.questsCompleted.total}
              growth={stats.questsCompleted.growth}
              color="linear-gradient(135deg,#39ab71,#21651d)"
              icon="bi-flag-fill"
            />

            <StatBox
              title="Total Lessons"
              value={stats.totalLessons.total}
              growth={stats.totalLessons.growth}
              color="linear-gradient(135deg,#FF5722,#9f3b00)"
              icon="bi-journal-text"
            />
          </div>

     
          {/* ================= CHARTS (UNCHANGED) ================= */}
          <div className="row g-3 mb-3">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    Performance Overview
                  </h5>
                  <div style={{ height: "320px" }}>
                    <canvas id="barChart"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    Learning Progress
                  </h5>
                  <div style={{ height: "320px" }}>
                    <canvas id="donutChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {subscriptionData && (
      <SubscriptionAnalytics data={subscriptionData} />
    )}
        </main>
      </div>
    </div>
  );
}

/* ================= STAT BOX (WITH GROWTH) ================= */

const StatBox = ({ title, value, growth, color, icon }) => {
  const isPositive = growth >= 0;

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="stat-box" style={{ background: color }}>
        <div>
          <h6>{title}</h6>
          <h3>{value}</h3>

          <small
            className={isPositive ? "text-success" : "text-danger"}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(growth)}%
          </small>
        </div>

        <div className="icon-box">
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
