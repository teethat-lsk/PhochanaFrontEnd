import React from "react";
import { Link } from "react-router-dom";
import "./ButtonLink.css";

function ButtonLink({ children, to, height, backgroundColor }) {
  let style = { height: height, lineHeight: height };
  if (backgroundColor !== undefined) {
    style = { ...style, backgroundColor: backgroundColor };
  }
  return (
    <Link to={to}>
      <div className="button" style={style}>
        {children}
      </div>
    </Link>
  );
}

export default ButtonLink;
