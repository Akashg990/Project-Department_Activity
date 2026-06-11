import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}) {

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  return (

    <div className="bg-slate-100 min-h-screen">

      {/* Mobile Overlay */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />

      )}

      {/* Mobile Sidebar */}

      <div
        className={`
          fixed
          top-0
          left-0
          h-full
          z-50
          transform
          transition-transform
          duration-300
          lg:hidden

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />
      </div>

      {/* Desktop Sidebar */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}

      <div
        className="
          lg:ml-[280px]
          p-4
          md:p-6
        "
      >

        {/* Mobile Header */}

        <div
          className="
            lg:hidden
            flex
            items-center
            justify-between
            bg-white
            p-4
            rounded-2xl
            shadow-md
            mb-4
          "
        >

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
          >

            <Menu size={28} />

          </button>

          <h2 className="font-bold text-lg">
            DeptTrack
          </h2>

        </div>

        {/* Page Content */}

        <div className="p-1">
          {children}
        </div>

      </div>

    </div>

  );

}