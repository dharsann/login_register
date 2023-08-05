import React from "react";
import successAlert from "./successAlert";

const successPage = ({ message }) => {
  return (
    <div className="success-page">
      <successAlert message={message} />
    </div>
  );
};

export default successPage;
