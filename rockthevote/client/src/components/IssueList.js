import React, { useEffect} from "react";
import IssueForm from './IssueForm'
import '../app.css';
export default function IssueList(props) {
  const { user, issues, addIssue, allIssues, getIssues, username } = props;
  useEffect(() => {
    getIssues();
  });

  return (
    <div id="issues" className="issues">
  <h1>Welcome @{user.username}</h1>
      <h3>Post an issue</h3>
      <h1>{allIssues}</h1>
      <IssueForm addIssue={ addIssue }/>

      {issues.map((issue) => (
        <IssueForm username={username} {...issue} key={issue._id} />
      ))}
    </div>
  );
}
