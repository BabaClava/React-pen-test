import React from "react";
import { NavLink } from "react-router-dom";

const Dialog = props => {
  return (
    <div className="dialog">
      <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
    </div>
  );
};

export default Dialog;
