import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider.js";

export default function Profile() {
  const {
    user: { username },
    
   
  } = useContext(UserContext);

  return (
    <div className="profile">
      <h1>Welcome @{username}</h1>
      <hr/>
      <h3>This is your Profile Page</h3>
      <img src="https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg" alt="landscapephoto"/>
      <p>Click on your Public page to add new issues to the database.</p>
      <p>Click on your Issues page to view all issues in database.</p>
      
    </div>
  );
}
