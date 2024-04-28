import React from "react";

interface DetailLoaderProps {}
const DetailLoader: React.FC<DetailLoaderProps> = () => {
  return (
    <div className="grid">
      <div className="flex gap-7">
        <div className="w-[35rem] h-[35rem] animate-pulse bg-gray-300"></div>
        <div className="flex flex-col gap-7 w-full">
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailLoader;
