import React from "react";
import { Link } from "react-router-dom";
const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <div>
      <div className='card'>
        {avatar_url && (
          <img
            className='round-img'
            src={avatar_url}
            style={{ width: "60px" }}
          />
        )}
        {login && <h3>{login}</h3>}
        <Link to={`/user/${login}`} className='btn btn-primary'>
          More
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
