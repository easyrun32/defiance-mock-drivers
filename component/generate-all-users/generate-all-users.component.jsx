import React, { useEffect, useState } from "react";
import axios from "axios";
import GenerateUser from "../generate-user/generate-user.component";
import "./generate-all-users.css";
const GenerateAllUsers = ({ storeId }) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/users").then((res) => {
      setUser(res.data);
    });
  }, []);
  console.log(users);
  return (
    <div className="all-users">
      {users.map((user, index) => (
        <GenerateUser
          key={index}
          id={user.employeeId}
          storeId={storeId}
          role="driver"
          name={user.firstName}
        />
      ))}
    </div>
  );
};

export default GenerateAllUsers;
