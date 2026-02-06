import { useEffect, useRef, useState } from "react";
import {
  getDashboaranalyticsdApi,
 getDashboardprogressApi,
  getSubscriptionAnalyticsApi,
} from "../api/dashboardApi";
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

  const [questProgress, setQuestProgress] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });
  // console.log("questProgress", questProgress);
  /* ================= CHART REFS ================= */
  const barChartRef = useRef(null);
  const donutChartRef = useRef(null);
  const donutChartInstance = useRef(null);

  /* ================= FETCH SUBSCRIPTION DATA ================= */
  useEffect(() => {
    getSubscriptionAnalyticsApi()
      .then((res) => setSubscriptionData(res?.data?.data))
      .catch((err) => console.error("Subscription analytics failed", err));
  }, []);

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getDashboardprogressApi();
       
        // console.log("chart-res",res?.data?.data)
        // setStats(res?.data?.data?.stats || stats);
        setQuestProgress(res?.data?.data);
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
      }
    };

    fetchDashboardData();
  }, []);

    /* ================= FETCH DASHBOARD DATA ================= */
 useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const res = await getDashboaranalyticsdApi();

      // console.log("stats response:", res?.data?.data);

      // ✅ FIXED MAPPING
      setStats(res?.data?.data);
    } catch (error) {
      console.error("Dashboard analytics fetch failed:", error);
    }
  };

  fetchDashboardData();
}, []);

  /* ================= BAR CHART ================= */
  useEffect(() => {
    if (typeof Chart === "undefined") return;
    if (!barChartRef.current) return;

    if (barChartRef.current.chart) return;

    barChartRef.current.chart = new Chart(barChartRef.current, {
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
  }, []);

  /* ================= DONUT CHART (FIXED 🔥) ================= */
  useEffect(() => {
    if (typeof Chart === "undefined") return;
    if (!donutChartRef.current) return;

    const total =
      questProgress.completed +
      questProgress.inProgress +
      questProgress.notStarted;

    if (total === 0) return;

    if (donutChartInstance.current) {
      donutChartInstance.current.destroy();
    }

    donutChartInstance.current = new Chart(donutChartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Completed", "In Progress", "Not Started"],
        datasets: [
          {
            data: [
              questProgress.completed,
              questProgress.inProgress,
              questProgress.notStarted,
            ],
            backgroundColor: ["#39ab71", "#00305c", "#d4a5b4"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        cutout: "70%",
      },
    });
  }, [questProgress]);

  /* ================= UI ================= */
  return (
    <div className="admin-app">
      <Sidebar />
      <div className="content">
        <Header title="Dashboard" />
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
                    <canvas ref={barChartRef}></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Learning Progress</h5>
                  <div style={{ height: "320px" }}>
                    <canvas ref={donutChartRef} height="300"></canvas>
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

/* ================= STAT BOX ================= */

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
          <h6 style={{ marginBottom: "6px", fontWeight: 600 }}>{title}</h6>
          <h3 style={{ margin: 0, fontWeight: 700 }}>{value}</h3>
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
