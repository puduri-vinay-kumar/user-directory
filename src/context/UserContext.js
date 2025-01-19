// UserContext.js
import React, { Component } from "react";

const UserContext = React.createContext();

class UserProvider extends Component {
  state = {
    users: [],
    apiStatus: "INITIAL",
    searchQuery: "",
    currentPage: 1,
    usersPerPage: 5,
    darkMode: false,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    this.setState({ apiStatus: "IN_PROGRESS" });
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (response.ok) {
        const data = await response.json();
        this.setState({ users: data, apiStatus: "SUCCESS" });
      } else {
        this.setState({ apiStatus: "FAILURE" });
      }
    } catch {
      this.setState({ apiStatus: "FAILURE" });
    }
  };

  setUsers = (users) => this.setState({ users });

  setApiStatus = (status) => this.setState({ apiStatus: status });

  setSearchQuery = (query) => this.setState({ searchQuery: query });

  setCurrentPage = (page) => this.setState({ currentPage: page });

  toggleDarkMode = () =>
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUsers: this.setUsers,
          setApiStatus: this.setApiStatus,
          setSearchQuery: this.setSearchQuery,
          setCurrentPage: this.setCurrentPage,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext, UserProvider };
