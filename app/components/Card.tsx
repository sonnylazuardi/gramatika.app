import React from "react";

interface Props {
  title?: any;
  children?: any;
}

const Card = ({ title = null, children = null }: Props) => {
  return (
    <div className="card text-left shadow-2xl w-full" style={{ height: 182 }}>
      <div className="card-body p-4">
        {title}
        {children}
      </div>
    </div>
  );
};

export default Card;
