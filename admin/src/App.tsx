import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BlogManagementPage from "./pages/BlogManagementPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ComparisionManagementPage from "./pages/Comparisions/ComparisionManagementPage";
import DealManagementPage from "./pages/Deal/DealsManagementPage";
import HomeManagementPage from "./pages/HomePageManagement";
import AddComparisionPage from "./pages/Comparisions/AddComparisionPage";
import AddDealPage from "./pages/Deal/AddDealPage";
import AddReviewPage from "./pages/Reviews/AddReviewPage";
import DealsPage from "./pages/Deal/DealsPage";
import UpdateDealPage from "./pages/Deal/UpdateDealPage";
import ComparisionsPage from "./pages/Comparisions/ComparisionsPage";

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
            <Route path="/blogs" element={<BlogManagementPage />} />

            <Route path="deals" element={<DealsPage />} />
            <Route path="/dealsmanagement" element={<DealManagementPage />} />
            <Route path="/adddeal" element={<AddDealPage />} />
            <Route path="/updatedeal/:id" element={<UpdateDealPage />} />

            <Route path="/comparisons" element={<ComparisionsPage />} />
            <Route
              path="/Comparisionsmanagement"
              element={<ComparisionManagementPage />}
            />
            <Route path="/addcomparision" element={<AddComparisionPage />} />
            <Route path="/home" element={<HomeManagementPage />} />

            <Route path="/addreview" element={<AddReviewPage />} />
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
