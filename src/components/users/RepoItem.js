import React from "react";

const RepoItem = ({ repo: { full_name, html_url } }) => {
  return (
    <div className='card'>
      <a href={html_url}>{full_name}</a>
    </div>
  );
};

export default RepoItem;
