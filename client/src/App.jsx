import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import ProgramsPage from "./pages/ProgramsPage";
import DonatePage from "./pages/DonatePage";
import ContactPage from "./pages/ContactPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import VacanciesPage from "./pages/VacanciesPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateBlog from "./pages/admin/CreateBlog";
import EditBlog from "./pages/admin/EditBlog";
import ManageBlogs from "./pages/admin/ManageBlogs";
import CreateTeam from "./pages/admin/CreateTeam";
import EditTeam from "./pages/admin/EditTeam";
import ManageTeam from "./pages/admin/ManageTeam";
import CreatePartner from "./pages/admin/CreatePartner";
import EditPartner from "./pages/admin/EditPartner";
import ManagePartners from "./pages/admin/ManagePartners";
import CreateVacancy from "./pages/admin/CreateVacancy";
import EditVacancy from "./pages/admin/EditVacancy";
import ManageVacancies from "./pages/admin/ManageVacancies";
import ApplyPage from "./pages/ApplyPage";
import ManageApplications from "./pages/admin/ManageApplications";
import ManagePrograms from "./pages/admin/ManagePrograms";
import CreateProgram from "./pages/admin/CreateProgram";
import EditProgram from "./pages/admin/EditProgram";
import ScrollToTop from "./components/ScrollToTop";

import { useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SingleBlogPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/create"
          element={
            <ProtectedRoute adminOnly>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute adminOnly>
              <ManageBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/team"
          element={
            <ProtectedRoute adminOnly>
              <ManageTeam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/team/create"
          element={
            <ProtectedRoute adminOnly>
              <CreateTeam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/team/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditTeam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <ProtectedRoute adminOnly>
              <ManagePartners />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/partners/create"
          element={
            <ProtectedRoute adminOnly>
              <CreatePartner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/partners/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditPartner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vacancies"
          element={
            <ProtectedRoute adminOnly>
              <ManageVacancies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute adminOnly>
              <ManageApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vacancies/create"
          element={
            <ProtectedRoute adminOnly>
              <CreateVacancy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vacancies/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditVacancy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/programs"
          element={
            <ProtectedRoute adminOnly>
              <ManagePrograms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/programs/create"
          element={
            <ProtectedRoute adminOnly>
              <CreateProgram />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/programs/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditProgram />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
