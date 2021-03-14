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
    <div>
      <div className="center">
        <GenerateAllUsers storeId={"psq1"} manager={"felipe"} />
      </div>
    </div>
  );
};

export default App;
