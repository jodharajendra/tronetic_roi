import React from "react";
import loading from "../../assets/loader.gif";

const LoadingPage = (props) => {
  return (
    <div className="spinnerContainer">
      <img src={loading} className="spinner" alt="Loading" />
    </div>
  );
};

export default LoadingPage;
