import React from 'react';

export default function AdminDashboardBar({ percent }) {
  return (
    <div className="flex justify-between items-center my-2 h-12">
      <div className="w-1/2 mr-4 h-12 text-xs flex border border-black">
        
          <div
            style={{ width: `${percent}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"
            
          ><div className="text-center m-5 text-sm text-white">
          {percent}% of users
        </div></div>
          <div
            style={{ width: `${100-percent}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-300"
            
          ></div>
        
      </div>
      <div className="w-1/3 text-end m-5 text-sm text-gray-700">
        {percent}% of users
      </div>
    </div>
  );
}
