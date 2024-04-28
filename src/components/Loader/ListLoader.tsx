import React from "react";

interface ListLoaderProps {}
const ListLoader: React.FC<ListLoaderProps> = () => {
  return (
    <div className="grid gap-5">
      <div className="flex gap-4">
        <div className="w-24 h-24 animate-pulse bg-gray-300"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-24 h-24 animate-pulse bg-gray-300"></div>
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-24 h-24 animate-pulse bg-gray-300"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ListLoader;
