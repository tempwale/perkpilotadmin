import { useState, useEffect, type ReactElement } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Star,
  Tags,
  FileText,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  Slack,
  LogOut,
  Sun,
  Moon,
  UserPlus,
  Home,
} from "lucide-react";

type SidebarProps = {
  onNavigate?: (key: string) => void;
  onLogout?: () => void;
  initialActive?: string;
};

// Map route paths to sidebar keys
const getActiveKeyFromPath = (pathname: string): string => {
  const path = pathname.toLowerCase();
  
  // Blogs routes (check more specific routes first)
  if (path.startsWith("/blogsmanagement") || path.startsWith("/addblog")) {
    return "blogs";
  }
  if (path.startsWith("/blogs")) {
    return "blogs";
  }
  
  // Reviews routes (check more specific routes first)
  if (path.startsWith("/updatereview") || path.startsWith("/reviewmanagement") || path.startsWith("/addreview")) {
    return "reviews";
  }
  if (path.startsWith("/reviews")) {
    return "reviews";
  }
  
  // Comparisons routes (check more specific routes first, note: route has capital C but we lowercase it)
  if (path.startsWith("/comparisonsmanagement") || path.startsWith("/addcomparision")) {
    return "comparisons";
  }
  if (path.startsWith("/comparisons")) {
    return "comparisons";
  }
  
  // Deals routes (check more specific routes first)
  if (path.startsWith("/dealsmanagement") || path.startsWith("/updatedeal") || path.startsWith("/adddeal")) {
    return "deals";
  }
  if (path.startsWith("/deals")) {
    return "deals";
  }
  
  // Site Management routes
  if (path.startsWith("/home") || path.startsWith("/home-management")) {
    return "home";
  }
  
  // Add Author route
  if (path.startsWith("/addauthor")) {
    return "addAuthor";
  }
  
  // Dashboard route
  if (path.startsWith("/dashboard")) {
    return "dashboard";
  }
  
  // Analytics route
  if (path.startsWith("/analytics")) {
    return "analytics";
  }
  
  // Users route
  if (path.startsWith("/users")) {
    return "users";
  }
  
  // Settings route
  if (path.startsWith("/settings")) {
    return "settings";
  }
  
  // Support route
  if (path.startsWith("/support")) {
    return "support";
  }
  
  // Admin Management route
  if (path.startsWith("/admin-management")) {
    return "admin-management";
  }
  
  // Stacks route
  if (path.startsWith("/stacks")) {
    return "stacks";
  }

  // Default to dashboard
  return "dashboard"; 
};

export default function Sidebar({
  onNavigate,
  onLogout,
  initialActive,
}: SidebarProps): ReactElement {
  const location = useLocation();
  const [active, setActive] = useState<string>(initialActive ?? getActiveKeyFromPath(location.pathname));
  const [darkMode, setDarkMode] = useState(true);

  // Update active state when route changes
  useEffect((): void => {
    const newActive = getActiveKeyFromPath(location.pathname);
    setActive(newActive);
  }, [location.pathname]);

  const handleNav = (key: string): void => {
    setActive(key);
    if (onNavigate) {
      onNavigate(key);
    } else {
      // fallback navigation: update the hash so pages can respond
      try {
        window.location.hash = `#${key}`;
      } catch {
        /* noop in non-browser envs */
      }
    }
  };

  const handleLogout = (): void => {
    onLogout?.();
  };

  const iconClass = "w-5 h-5 text-[#ebeef4]";

  return (
    <aside className="fixed left-0 top-0 h-screen z-50">
      <div
        data-layer="Admin Side Bar"
        className="AdminSideBar w-[276px] h-full relative bg-zinc-900 overflow-y-auto"
      >
        <div
          data-layer="Frame 2"
          className="Frame2 w-full flex flex-col px-6 gap-2 py-6"
        >
          <div className="flex items-center gap-4">
            <div
              data-layer="Ellipse 6048"
              className="Ellipse6048 w-10 h-10 bg-linear-to-b from-[#501bd6] to-[#7f57e3] rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 27 27"
                fill="none"
                aria-hidden
              >
                <path
                  d="M19.582 10.9895H13.332V0.833252L7.08203 15.677H13.332V25.8333L19.582 10.9895Z"
                  fill="white"
                />
              </svg>
            </div>

            <div
              data-layer="PerkPilot"
              className="Perkpilot text-neutral-50 text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-loose"
            >
              PerkPilot
            </div>
          </div>
        </div>
        <div
          data-layer="Frame 1321314927"
          className="Frame1321314927 w-[228px] left-[24px] top-[123px] absolute inline-flex flex-col justify-start items-start gap-3"
        >
          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("dashboard")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex justify-start items-center gap-3 ${
              active === "dashboard"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Grid className={iconClass} />
            <div
              data-layer="Dashboard"
              className={`Dashboard justify-center text-sm font-normal font-['Poppins'] ${
                active === "dashboard" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Dashboard
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("home")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "home"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Home className={iconClass} />
            <div
              data-layer="Home"
              className={`SiteManagement justify-center text-sm font-normal font-['Poppins'] leading-normal ${
                active === "site-management" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Home
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("reviews")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "reviews"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Star className={iconClass} />
            <div
              data-layer="Reviews"
              className={`Reviews justify-center text-sm font-normal font-['Poppins'] leading-normal ${
                active === "reviews" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Reviews
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("comparisons")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "comparisons"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Tags className={iconClass} />
            <div
              data-layer="Comparisons"
              className={`Comparisons justify-center text-sm font-normal font-['Poppins'] leading-normal ${
                active === "comparisons" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Comparisons
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("blogs")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "blogs"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <FileText className={iconClass} />
            <div
              data-layer="Blogs"
              className={`Blogs justify-center text-sm font-normal font-['Poppins'] leading-normal ${
                active === "blogs" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Blogs
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("deals")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "deals"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Tags className={iconClass} />
            <div
              data-layer="Deals"
              className={`Deals justify-center text-sm font-normal font-['Poppins'] ${
                active === "deals" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Deals
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("stacks")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "stacks"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Tags className={iconClass} />
            <div
              data-layer="Stacks"
              className={`Stacks justify-center text-sm font-normal font-['Poppins'] leading-normal ${
                active === "stacks" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Stacks
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("analytics")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "analytics"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <BarChart2 className={iconClass} />
            <div
              data-layer="Analytics"
              className={`Analytics justify-center text-sm font-normal font-['Poppins'] leading-normal ${
                active === "analytics" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Analytics
            </div>
          </button>
          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("addAuthor")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "addAuthor"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <UserPlus className={iconClass} />
            <div
              data-layer="Add Author"
              className={`Users justify-center text-sm font-normal font-['Poppins'] ${
                active === "users" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Add Author
            </div>
          </button>
            <button
              data-layer="Side Menu"
              onClick={(): void => handleNav("users")}
              className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
                active === "users"
                  ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                  : ""
              }`}
            >
              <Users className={iconClass} />
              <div
                data-layer="Users"
                className={`Users justify-center text-sm font-normal font-['Poppins'] ${
                  active === "users" ? "text-white" : "text-[#ebeef4]"
                }`}
              >
              Users
            </div>
          </button>

          <div
            data-layer="Line 46"
            className="Line46 self-stretch h-0 outline-1 -outline-offset-0.5 outline-[#ebeef4]/25"
          />

          <div
            data-layer="More Tabs"
            className="MoreTabs justify-center text-[#ebeef4] text-[10px] font-medium font-['Poppins']"
          >
            More Tabs
          </div>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("settings")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "settings"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Settings className={iconClass} />
            <div
              data-layer="Settings"
              className={`Settings justify-center text-sm font-normal font-['Poppins'] ${
                active === "settings" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Settings
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("support")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "support"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <HelpCircle className={iconClass} />
            <div
              data-layer="Support"
              className={`Support justify-center text-sm font-normal font-['Poppins'] ${
                active === "support" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Support
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={(): void => handleNav("admin-management")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "admin-management"
                ? "bg-linear-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Slack className={iconClass} />
            <div
              data-layer="Admin Management"
              className={`AdminManagement justify-center text-sm font-normal font-['Poppins'] ${
                active === "admin-management" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Admin Management
            </div>
          </button>

          <div
            data-layer="Side Menu"
            className="SideMenu self-stretch h-10 p-2 rounded inline-flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Sun className={iconClass} />
              ) : (
                <Moon className={iconClass} />
              )}
              <div
                data-layer="Dark Mode"
                className="DarkMode justify-center text-[#ebeef4] text-sm font-normal font-['Poppins']"
              >
                Dark Mode
              </div>
            </div>
            <div
              data-layer="Button"
              className="Button w-[53.33px] h-7 relative bg-linear-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline-1 -outline-offset-1 outline-[#501bd6] overflow-hidden cursor-pointer"
              onClick={(): void => setDarkMode((s) => !s)}
              role="button"
              aria-pressed={darkMode}
            >
              <div
                data-layer="Button"
                className={`Button w-[23.33px] h-[22.67px] left-[${
                  darkMode ? "26.67px" : "2.67px"
                }] top-[2.67px] absolute bg-white rounded-[66.67px]`}
              />
            </div>
          </div>

          <button
            data-layer="Side Menu"
            onClick={handleLogout}
            className="SideMenu self-stretch h-10 p-2  rounded inline-flex items-center gap-3"
          >
            <LogOut className="w-5 h-5 text-[#501bd6]" />
            <div
              data-layer="Logout"
              className="Logout justify-center text-[#501bd6] text-sm font-normal font-['Poppins']"
            >
              Logout
            </div>
          </button>
        </div>

        <div
          data-layer="Line 46"
          className="Line46 w-[228px] h-0 left-[24px] top-[83.53px] absolute outline-1 -outline-offset-0.5 outline-zinc-800"
        />
        <div
          data-layer="Your Quick Tabs"
          className="YourQuickTabs left-[24px] top-[92px] absolute justify-center text-[#ebeef4] text-[10px] font-medium font-['Poppins']"
        >
          Your Quick Tabs
        </div>
      </div>
    </aside>
  );
}
