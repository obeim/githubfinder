import React, { Component, Fragment } from "react";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import RepoItem from "./RepoItem";
class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getRepos(this.props.match.params.login);
  }
  render() {
    const { loading } = this.props;
    const {
      avatar_url,
      html_url,
      login,
      blog,
      company,
      followers,
      following,
      hireable,
      bio,
      public_repos,
      public_gists,
      location,
    } = this.props.user;
    const repos = this.props.repos;

    if (loading) return <Spinner />;
    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
        Hireable :{" "}
        {hireable ? (
          <i className='fas fa-check' style={{ color: "green" }} />
        ) : (
          <i className='fas fa-times-circle' style={{ color: "red" }} />
        )}
        <div className='card all-center grid-2'>
          <div>
            <img
              src={avatar_url}
              alt=''
              className='round-img'
              style={{ width: "150px" }}
            />
            <h3>{login}</h3>
            <p> {location}</p>
          </div>
          <div style={{ textAlign: "left" }}>
            {bio && (
              <Fragment>
                <h3 style={{ fontWeight: "bold" }}>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-black'>
              Visit Github Profile
            </a>
            <p>username : {login}</p>
            {company && <p>Company: {company}</p>}
            {blog && <p>blog: {blog}</p>}
          </div>
        </div>
        <div className='card all-center'>
          <div className='badge badge-primary'>Following : {following}</div>
          <div className='badge badge-red'>Followers : {followers}</div>
          <div className='badge badge-light'>Public Repos : {public_repos}</div>
          <div className='badge badge-yellow'>
            Public Gists : {public_gists}
          </div>
        </div>
        <div>
          {repos &&
            repos.map((repo) => <RepoItem repo={repo} key={repo.full_name} />)}
        </div>
      </Fragment>
    );
  }
}

export default User;
