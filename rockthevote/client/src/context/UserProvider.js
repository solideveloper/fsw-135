import React, { useState } from "react";
import axios from "axios";

export const UserContext = React.createContext();

const userAxios = axios.create();
userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    userComments: [],
    issueComments: [],
    userIssues: [],
    username: "",
    errMsg: "",
  };

  const [userState, setUserState] = useState(initState);

  const handleAuthErr = (errMsg) => {
    setUserState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  }

  const resetAuthErr = () => {
    setUserState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  }

// Signup
  const signup = (credentials) => {
    axios
      .post("/auth/signup", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => handleAuthErr(err.response.data.errMsg));
  }

// Login
  const login = (credentials) => {
    axios
      .post("/auth/login", credentials)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        getIssuesByUser();
        setUserState((prevUserState) => ({
          ...prevUserState,
          user,
          token,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

// Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState({
      user: {},
      token: "",
      issues: [],
    });
  }

// POST Issue
  const createIssue = (newIssue) => {
    userAxios
      .post(`/api/issues/`, newIssue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  // POST Comment
  const createComment = (event, newComment) => {
    const par = event.target.parentNode;
    const id = par.parentNode.id;
    newComment.issueId = id;
    userAxios
      .post(`/api/comments`, newComment)
      .then((res) => console.log(`Comment added to Database`))
      .catch((err) => console.log(err.response.data.errMsg));
  }

// GET
  const getIssuesByUser = () => {
    userAxios
      .get("/api/issues")
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const getUserIssues = () => {
    userAxios
      .get(`/api/issues`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          userIssues: res.data,
        }));
        console.log(userState.userIssues);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const getUserComments = () => {
    userAxios
      .get(`/api/comments/user/${userState.user._id}`) 
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          userComments: res.data,
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const getIssueComments = (_id) => {
    userAxios
      .get(`api/comments/issues/${_id}`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issueComments: res.data,
        }));
        console.log(userState.issueComments);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const getUsername = (id) => {
    userAxios.get(`/api/user/${id}`).then((res) => {
      const newUserName = res.data;
      setUserState((prevState) => ({
        ...prevState,
        username: newUserName,
      }));
    });
  }

//Edit 
const editComment = (id) => {
  userAxios.put(`/api/comments/${id}`)
  .then(res => {
      setUserState(res.data);
  })
  .catch(err => {
      handleAuthErr(err);
  })
}

const editIssue = (id) => {
  userAxios.put(`/api/issues/${id}`)
  .then(res => {
      setUserState(res.data);
  })
  .catch(err => {
      handleAuthErr(err);
  })
}

// DELETE
  const deleteComment = (id) => {
    userAxios
      .delete(`/api/comments/${id}`)
      .then((res) => {
        getUserComments();
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const deleteIssue = (id) => {
    userAxios
      .delete(`/api/issues/${id}`)
      .then((res) => {
        getUserIssues();
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

// ADD Upvote or DownVote to Issues and Comments
  const addUpvote = (event) => {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/issues/upvotes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const addCommentUpvote = (event) => {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/comments/upvotes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const addDownvote = (event) => {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/issues/downvotes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const addCommentDownvote = (event) => {
    const btnPar = event.target.parentNode;
    const id = btnPar.id;
    userAxios
      .put(`/api/comments/downvotes/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        createIssue,
        getUserComments,
        getIssueComments,
        createComment,
        getIssuesByUser,
        getUsername,
        resetAuthErr,
        getUserIssues,
        editComment,
        editIssue,
        deleteComment,
        deleteIssue,
        addUpvote,
        addDownvote,
        addCommentUpvote,
        addCommentDownvote,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}