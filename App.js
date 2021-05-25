import React from "react";
import "./App.css";

import GenerateAllUsers from "./component/generate-all-users/generate-all-users.component";

// import GenerateUser from "./component/generate-user/generate-user.component";

// import MoveUser from "./component/move-user/move-user.component";
// import OrderComplete from "./component/order-completion/order-completion.component";
/*
This version of parcel is deperacated but parcel is lightweight

**** Make sure there is a manager in one store ******** 
    *****  otherwise drivers can't connect ****
*/

const App = () => {
  return (
    <div>
      <div className="center">
        {/* <GenerateUser id={"4545"} name={"bryan"} />
        
        <GenerateUser id={"3533"} name={"cam"} /> */}

        <GenerateAllUsers storeId={"psq2"} manager={"felipe"} />

        {/* <MoveUser id={4545} storeId={"psq2"} role={"driver"} />
        <MoveUser id={8954} storeId={"psq2"} role={"driver"} />  */}
        {/* <br />
        <OrderComplete /> */}
      </div>
    </div>
  );
};

export default App;
