import { Pencil } from "lucide-react";
import React from "react";

interface DashboardInterface {
  // Define your interface properties here
}

const Stastics: React.FC<DashboardInterface> = () => {
  return (
    <div className='shadow-2xl border-[1px] rounded border-gray-500 bg-white h-[120px] flex items-center justify-between p-10 text-gray-600'>
      <div>
        <Pencil color='red' />
      </div>
      <div className='flex flex-col items-center gap-2'>
        <h5 className='font-semibold text-2xl'>12,500</h5>
        <h2 className='text-[16px]'>New Post</h2>
      </div>
    </div>
  );
};

export default Stastics;
