import React from "react";

const Dot = () => {
  return <div className="w-3 h-3 bg-slate-500 rounded-full animate-bounce" />;
};

const Loader = () => {
  return (
    <div className="flex flex-1 justify-center items-center w-full">
      <div className="loader p-5 flex space-x-2">
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  );
};

export default Loader;
