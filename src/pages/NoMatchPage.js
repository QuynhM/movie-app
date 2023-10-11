import React from "react";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // Center vertically
};

function NoMatchPage() {
  return (
    <div style={style}>
      <h1>Page not found!</h1>
    </div>
  );
}

export default NoMatchPage;
