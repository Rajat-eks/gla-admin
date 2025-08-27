import React from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import Stastics from "./Statistics";

interface DashboardInterface {
  // Define your interface properties here
}


const Dashboard: React.FC<DashboardInterface> = () => {
  return (
    <>
      <DashboardLayout>
        <section className='grid grid-cols-3 gap-10 px-10'>
          <Stastics />
          <Stastics />
          <Stastics />
        </section>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
