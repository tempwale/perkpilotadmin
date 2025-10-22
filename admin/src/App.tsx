import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BlogManagementPage from "./pages/BlogManagementPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ComparisionManagementPage from "./pages/ComparisionManagementPage";

function AppContent() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar on the left - pass navigation handler */}
      <Sidebar onNavigate={(key) => navigate(`/${key}`)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        {/* You can add other content here */}
        <div className="m-4">
          <Routes>
            <Route path="/" element={<div>Dashboard (placeholder)</div>} />
            <Route
              path="/dashboard"
              element={<div>Dashboard (placeholder)</div>}
            />
            <Route
              path="/site-management"
              element={<div>Site Management (placeholder)</div>}
            />
            <Route path="/reviews" element={<div>Reviews (placeholder)</div>} />
            <Route path="/blogs" element={<BlogManagementPage />} />
            <Route path="/deals" element={<div>Deals (placeholder)</div>} />
            <Route path="/stacks" element={<div>Stacks (placeholder)</div>} />
            <Route
              path="/comparisons"
              element={<ComparisionManagementPage />}
            />

            <Route
              path="/analytics"
              element={<div>Analytics (placeholder)</div>}
            />
            <Route path="/users" element={<div>Users (placeholder)</div>} />
            <Route
              path="/settings"
              element={<div>Settings (placeholder)</div>}
            />
            <Route path="/support" element={<div>Support (placeholder)</div>} />
            <Route
              path="/admin-management"
              element={<div>Admin Management (placeholder)</div>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
