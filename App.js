import React from "react";
import "./App.css";
import GenerateUser from "./component/generate-user/generate-user.component";
import GenerateAllUsers from "./component/generate-all-users/generate-all-users.component";
/*
This version of parcel is deperacated but parcel is lightweight

**** Make sure there is a manager in one store ******** 
    *****  otherwise drivers can't connect ****
*/
const App = () => {
  return (
    <div className="center">
      <GenerateUser storeId={"psq1"} id={4545} role="manager" />
      <GenerateAllUsers storeId={"psq1"} />
    </div>
  );
};

export default App;
