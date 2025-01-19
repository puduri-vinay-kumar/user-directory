
import React, { Component } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useParams } from "react-router-dom";
import "./index.css";

class UserDetails extends Component {
  renderUserDetails = () => {
    const { users } = this.context;
    const { id } = this.props.params;
    const user = users.find((u) => u.id === parseInt(id));

    if (!user) return <p className="not-found">User not found.</p>;

    return (
      <div className="user-details">
        <h1 className="user-details-title">{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Company: {user.company.name}</p>
        <p>Website: {user.website}</p>
      </div>
    );
  };

  render() {
    const { darkMode } = this.context;

    return (
      <div className={`user-details-container ${darkMode ? "dark-mode" : ""}`}>
        {this.renderUserDetails()}
        <Link to="/" className="back-button">
          Go Back
        </Link>
      </div>
    );
  }
}

UserDetails.contextType = UserContext;

const UserDetailsWithParams = (props) => {
  const params = useParams();
  return <UserDetails {...props} params={params} />;
};

export default UserDetailsWithParams;
