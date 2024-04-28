import React from "react";

interface GridLoaderProps {}
const GridLoader: React.FC<GridLoaderProps> = () => {
  return (
    <div
      className="grid gap-5"
      style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
    >
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
      <div className="animate-pulse bg-gray-300 w-full h-48"></div>
    </div>
  );
};

export default GridLoader;
