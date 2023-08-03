import React from "react";
import SuccessAlert from "./successAlert";

const SuccessPage = ({ message }) => {
  return (
    <div className="success-page">
      <SuccessAlert message={message} />
    </div>
  );
};

export default SuccessPage;
