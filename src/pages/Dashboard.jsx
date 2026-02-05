import { useEffect, useState } from "react";
import { getDashboardApi, getSubscriptionAnalyticsApi } from "../api/dashboardApi";
import SubscriptionAnalytics from "../components/SubscriptionAnalytics";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard() {
  /* ================= STATES ================= */
  const [subscriptionData, setSubscriptionData] = useState(null);

  const [stats, setStats] = useState({
    activeStudents: { total: 0, growth: 0 },
    totalTeachers: { total: 0, growth: 0 },
    questsCompleted: { total: 0, growth: 0 },
    totalLessons: { total: 0, growth: 0 },
  });

  /* ================= FETCH SUBSCRIPTION DATA ================= */
  useEffect(() => {
    getSubscriptionAnalyticsApi()
      .then(res => setSubscriptionData(res?.data?.data))
      .catch(err => console.error("Subscription analytics failed", err));
  }, []);

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getDashboardApi();
        setStats(res?.data?.data);
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
      }
    };

    fetchDashboardData();
  }, []);

  /* ================= CHART INIT ================= */
  useEffect(() => {
    const initCharts = () => {
      if (typeof Chart === "undefined") return;

      const barCanvas = document.getElementById("barChart");
      if (barCanvas && !barCanvas.dataset.chartInit) {
        new Chart(barCanvas, {
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
        barCanvas.dataset.chartInit = "true";
      }

      const donutCanvas = document.getElementById("donutChart");
      if (donutCanvas && !donutCanvas.dataset.chartInit) {
        new Chart(donutCanvas, {
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
        donutCanvas.dataset.chartInit = "true";
      }
    };

    const timer = setTimeout(initCharts, 300);
    return () => clearTimeout(timer);
  }, []);

  /* ================= UI ================= */
  return (
   <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Leaderboard" />
        <main className="container-fluid mr-4 ">
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

      {/* ================= CHARTS ================= */}
      <div className="row g-3 mb-3">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Performance Overview</h5>
              <div style={{ height: "320px" }}>
                <canvas id="barChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Learning Progress</h5>
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

/* ================= STAT BOX (INLINE STYLED) ================= */

const StatBox = ({ title, value, growth, color, icon }) => {
  const isPositive = growth >= 0;

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div
        style={{
          background: color,
          padding: "18px 20px",
          borderRadius: "14px",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "120px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div>
          <h6 style={{ marginBottom: "6px", fontWeight: 600 }}>
            {title}
          </h6>

          <h3 style={{ margin: 0, fontWeight: 700 }}>
            {value}
          </h3>

          <small
            style={{
              opacity: 0.9,
              color: isPositive ? "#d1fae5" : "#fee2e2",
            }}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(growth)}%
          </small>
        </div>

        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




 