import React, { useEffect, useState } from "react";
import axios from "axios";
import GenerateUser from "../generate-user/generate-user.component";
import "./generate-all-users.css";
const GenerateAllUsers = ({ storeId, manager }) => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/ api/users").then((res) => {
      setUser(res.data);
    });
  }, []);
  // console.log(users);
  // console.log("hello", process.env);

  return (
    <div className="all-users">
      <div className="storename">{storeId}</div>
      <div className="user-buttons">
        {users.map(({ employeeId, firstName, ...otherinfo }, index) => (
          <div key={index}>
            {firstName.toUpperCase() === manager.toUpperCase() ? (
              //Blue manager
              <GenerateUser
                role="manager"
                id={employeeId}
                storeId={storeId}
                name={firstName}
                otherinfo={otherinfo}
              />
            ) : (
              //white driver
              <GenerateUser
                role="driver"
                id={employeeId}
                storeId={storeId}
                name={firstName}
                otherinfo={otherinfo}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateAllUsers;
