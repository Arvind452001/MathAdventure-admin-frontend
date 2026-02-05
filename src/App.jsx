import { useState, createContext, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";

import Problems from "./pages/Problems";
import Quests from "./pages/Quests";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";
import AddTeacher from "./pages/AddTeacher";
import AddProblem from "./pages/AddProblem";
import AddQuest from "./pages/AddQuest";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddPlan from "./pages/AddPlan";
import TeacherDetails from "./pages/TeacherDetails";
import StudentDetails from "./pages/StudentDetails";
import Plans from "./pages/Plans";
import PlanDetails from "./pages/PlanDetails";
import UpdatePlan from "./pages/UpdatePlan";
import BillingHistory from "./pages/BillingHistory";
import AddLesson from "./pages/AddLesson";
import Lessons from "./pages/Lessons";
import LessonDetail from "./pages/LessonDetail";
import Chapters from "./pages/Chapters";
import ChapterDetail from "./pages/ChapterDetail";
import ContactUpdate from "./pages/UpdateContact";
import ContactMessages from "./pages/ContactMessages";
import ContactMessageDetail from "./pages/ContactMessageDetail";

// Sidebar Context
export const SidebarContext = createContext();
export function useSidebar() {
  return useContext(SidebarContext);
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ sidebarCollapsed, toggleSidebar }}>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* 🔒 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddPlan"
          element={
            <ProtectedRoute>
              <AddPlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacherDetails/:teacherId"
          element={
            <ProtectedRoute>
              <TeacherDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <ProtectedRoute>
              <Lessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessonDetail/:lessonId"
          element={
            <ProtectedRoute>
              <LessonDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chapters"
          element={
            <ProtectedRoute>
              <Chapters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chapters/:chapterID"
          element={
            <ProtectedRoute>
              <ChapterDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans/add"
          element={
            <ProtectedRoute>
              <AddPlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <Problems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quests"
          element={
            <ProtectedRoute>
              <Quests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rewards"
          element={
            <ProtectedRoute>
              <Rewards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billingHistory"
          element={
            <ProtectedRoute>
              <BillingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentDetails/:studentId"
          element={
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers/add"
          element={
            <ProtectedRoute>
              <AddTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plan/add"
          element={
            <ProtectedRoute>
              <AddPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planDetails/:planId"
          element={
            <ProtectedRoute>
              <PlanDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans/update/:planId"
          element={
            <ProtectedRoute>
              <UpdatePlan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems/add"
          element={
            <ProtectedRoute>
              <AddProblem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quests/add"
          element={
            <ProtectedRoute>
              <AddQuest />
            </ProtectedRoute>
          }
        />
         <Route
          path="/contact/update"
          element={
            <ProtectedRoute>
              <ContactUpdate />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/contact/messages"
          element={
            <ProtectedRoute>
              <ContactMessages />
            </ProtectedRoute>
          }
        />
         <Route 
          path="/message/details/:massageID"
          element={
            <ProtectedRoute>
              <ContactMessageDetail />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </SidebarContext.Provider>
  );
}

export default App;
