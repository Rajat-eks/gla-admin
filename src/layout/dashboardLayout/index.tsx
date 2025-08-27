import React, { type ReactNode } from "react";
import { Navbar } from "../../components";
import Sidebar from "../../components/Sidebar";

interface DashboardLayoutInterface {
  // Define your interface properties here
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutInterface> = ({ children }) => {
  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">
      {/* Navbar */}
      <header className="h-[60px] shrink-0 border-b border-gray-300">
        <Navbar />
      </header>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[18%] border-r border-gray-400 p-4 overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Scrollable Content Area */}
        <section className="w-[82%] p-4 bg-[#ECF0F4] overflow-y-auto">
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
DashboardLayout;
