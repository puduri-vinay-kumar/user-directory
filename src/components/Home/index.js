
import React, { Component } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  IN_PROGRESS: "IN_PROGRESS",
};

class Home extends Component {
  handleSearch = (event) => {
    const { setSearchQuery } = this.context;
    setSearchQuery(event.target.value);
  };

  sortUsers = (order) => {
    const { users, setUsers } = this.context;
    const sortedUsers = [...users].sort((a, b) =>
      order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setUsers(sortedUsers);
  };

  changePage = (page) => {
    const { setCurrentPage } = this.context;
    setCurrentPage(page);
  };

  renderPagination = () => {
    const { users, currentPage, usersPerPage } = this.context;
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => this.changePage(index + 1)}
            className={currentPage === index + 1 ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  renderUsersList = () => {
    const { users, searchQuery, currentPage, usersPerPage } = this.context;
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredUsers.length === 0) {
      return <p className="not-found">No users found</p>;
    }

    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(
      startIndex,
      startIndex + usersPerPage
    );

    return (
      <div className="user-list">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="user-card">
            <Link to={`/user/${user.id}`} className="user-link">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
              <p className="user-city">{user.address.city}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { apiStatus, darkMode, toggleDarkMode } = this.context;

    return (
      <div className={`home-container ${darkMode ? "dark-mode" : ""}`}>
        <header className="header">
          <h1 className="title">User Directory</h1>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>
        <div className="controls">
          <input
            type="text"
            placeholder="Search users..."
            onChange={this.handleSearch}
            className="search-input"
          />
          <div className="sort-buttons">
            <button onClick={() => this.sortUsers("asc")}>
              <FaSortAlphaDown />
            </button>
            <button onClick={() => this.sortUsers("desc")}>
              <FaSortAlphaUp />
            </button>
          </div>
        </div>
        {apiStatus === apiStatusConstants.IN_PROGRESS && (
          <TailSpin height="50" width="50" color="#000" ariaLabel="loading" />
        )}
        {apiStatus === apiStatusConstants.SUCCESS && this.renderUsersList()}
        {apiStatus === apiStatusConstants.SUCCESS && this.renderPagination()}
        {apiStatus === apiStatusConstants.FAILURE && (
          <p className="error-message">Failed to load users. Try again later.</p>
        )}
      </div>
    );
  }
}

Home.contextType = UserContext;

export default Home;
