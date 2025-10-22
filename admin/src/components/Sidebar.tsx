import { useState } from "react";
import {
  Grid,
  Briefcase,
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
} from "lucide-react";

type SidebarProps = {
  onNavigate?: (key: string) => void;
  onLogout?: () => void;
  initialActive?: string;
};

export default function Sidebar({
  onNavigate,
  onLogout,
  initialActive = "dashboard",
}: SidebarProps) {
  const [active, setActive] = useState(initialActive);
  const [darkMode, setDarkMode] = useState(true);

  const handleNav = (key: string) => {
    setActive(key);
    if (onNavigate) {
      onNavigate(key);
    } else {
      // fallback navigation: update the hash so pages can respond
      try {
        window.location.hash = `#${key}`;
      } catch (e) {
        /* noop in non-browser envs */
      }
    }
  };

  const handleLogout = () => {
    onLogout?.();
  };

  const iconClass = "w-5 h-5 text-[#ebeef4]";

  return (
    <aside>
      <div
        data-layer="Admin Side Bar"
        className="AdminSideBar w-[276px] h-[5232px] relative bg-zinc-900 overflow-hidden"
      >
        <div
          data-layer="Frame 2"
          className="Frame2 w-full flex flex-col px-6 gap-2 py-6"
        >
          <div className="flex items-center gap-4">
            <div
              data-layer="Ellipse 6048"
              className="Ellipse6048 w-10 h-10 bg-gradient-to-b from-[#501bd6] to-[#7f57e3] rounded-full flex items-center justify-center"
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
            onClick={() => handleNav("dashboard")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex justify-start items-center gap-3 ${
              active === "dashboard"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("site-management")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "site-management"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
                : ""
            }`}
          >
            <Briefcase className={iconClass} />
            <div
              data-layer="Site Management"
              className={`SiteManagement justify-center text-sm font-normal font-['Poppins'] leading-normal ${
                active === "site-management" ? "text-white" : "text-[#ebeef4]"
              }`}
            >
              Site Management
            </div>
          </button>

          <button
            data-layer="Side Menu"
            onClick={() => handleNav("reviews")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "reviews"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("comparisons")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "comparisons"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("blogs")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "blogs"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("deals")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "deals"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("stacks")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "stacks"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("analytics")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "analytics"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("users")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "users"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            className="Line46 self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-[#ebeef4]/25"
          />

          <div
            data-layer="More Tabs"
            className="MoreTabs justify-center text-[#ebeef4] text-[10px] font-medium font-['Poppins']"
          >
            More Tabs
          </div>

          <button
            data-layer="Side Menu"
            onClick={() => handleNav("settings")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "settings"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("support")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "support"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
            onClick={() => handleNav("admin-management")}
            className={`SideMenu self-stretch h-10 p-2 rounded inline-flex items-center gap-3 ${
              active === "admin-management"
                ? "bg-gradient-to-b from-[#501bd6] to-[#7f57e2]"
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
              className="Button w-[53.33px] h-7 relative bg-gradient-to-b from-[#501bd6] to-[#7f57e2] rounded-[66.67px] outline outline-1 outline-offset-[-1px] outline-[#501bd6] overflow-hidden cursor-pointer"
              onClick={() => setDarkMode((s) => !s)}
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
          className="Line46 w-[228px] h-0 left-[24px] top-[83.53px] absolute outline outline-1 outline-offset-[-0.50px] outline-zinc-800"
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
