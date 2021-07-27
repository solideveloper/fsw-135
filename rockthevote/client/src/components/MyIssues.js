import React, { useContext } from "react";
import IssueList from "./IssueList.js";
import { UserContext } from "../context/UserProvider.js";

export default function Profile() {
     const {
       user: { username },
       getUserIssues,
       issueComments,
       issues,
       topic
     } = useContext(UserContext);
   
     return (
       <div className="issues">
         <h1>Welcome @{username}</h1>
        <h2>Posted Issues</h2>
         <div className="issues">
           <IssueList
           topic={topic}
             issues={issues}
             getIssues={getUserIssues}
             issueComments={issueComments}
           />
         </div>
       </div>
     );
   }