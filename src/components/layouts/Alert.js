import React from "react";

const Alert = ({ alert }) => (
  <div>
    {alert && (
      <div className='alert'>
        <i className='fas fa-info-circle' /> {alert}
      </div>
    )}
  </div>
);
export default Alert;
