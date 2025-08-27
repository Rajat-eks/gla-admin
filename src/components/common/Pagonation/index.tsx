import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

interface PaginationInterface {
  // Define your interface properties here
}

const Pagination: React.FC<PaginationInterface> = () => {
  return (
    <div className='flex items-center gap-3 justify-end py-1 px-2'>
      <button className='flex items-center py-2 px-3 rounded bg-green gap-2 text-white cursor-pointer'>
        <ArrowLeft size={22} />
        Back
      </button>
      <ul className='flex items-center gap-3'>
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <li key={index}>
              <button className='flex items-center py-2 px-3 rounded bg-yellow-600 text-white gap-3 cursor-pointer'>
                {index + 1}
              </button>
            </li>
          ))}
      </ul>
      <button className='flex items-center py-2 px-3 rounded bg-green  text-white gap-2 cursor-pointer'>
        Next <ArrowRight size={22} />
      </button>
    </div>
  );
};

export default Pagination;
