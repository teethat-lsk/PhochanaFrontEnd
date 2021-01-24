import React from "react";

function ScrollText({ children, h, w }) {
  return (
    <div
      style={{
        overflow: "scroll",
        height: h,
        width: w,
        backgroundColor: "#fff",
        color: "black",
        padding: "10px 20px",
      }}
    >
      <p style={{ fontSize: "16px" }}>{children}</p>
    </div>
  );
}

export default ScrollText;
