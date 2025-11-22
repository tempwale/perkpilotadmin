import "./App.css";
import { type ReactElement } from "react";
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
import EditReviewPage from "./pages/Reviews/EditReviewPage";
import ReviewPageManagementPage from "./pages/Reviews/ReviewPageManagementPage";
import DealsPage from "./pages/Deal/DealsPage";
import UpdateDealPage from "./pages/Deal/UpdateDealPage";
import ComparisionsPage from "./pages/Comparisions/ComparisionsPage";
import AddAuthor from "./pages/AddAuthor";
import ReviewsPage from "./pages/Reviews/ReviewsPage";
import BlogsPage from "./pages/Blogs/BlogsPage";
import AddBlogPage from "./pages/Blogs/AddBlogPage";

function AppContent(): ReactElement{
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar on the left - fixed/sticky */}
      <Sidebar onNavigate={(key) => { void navigate(`/${key}`); }} />

      {/* Main content area - scrollable */}
      <div className="flex-1 flex flex-col ml-[276px] min-h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="m-4">
            <Routes>
              <Route path="/addauthor" element={<AddAuthor />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogsmanagement" element={<BlogManagementPage />} />
              <Route path="/addblog" element={<AddBlogPage />} />
              <Route path="/addblog/:id" element={<AddBlogPage />} />

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
              <Route path="/updatereview/:id" element={<EditReviewPage />} />
              <Route path="/reviewmanagement" element={<ReviewPageManagementPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App(): ReactElement{
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
