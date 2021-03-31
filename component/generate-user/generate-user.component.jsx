import React, { useState } from "react";
import io from "socket.io-client";
import CustomButton from "../custom-button/custom-button.component";

const GenerateUser = ({ id, storeId, role, name }) => {
  const [sockets, setSockets] = useState({});
  const [showtext, setText] = useState(false);
  const newuser = (number) => {
    setText(!showtext);
    if (Object.keys(sockets).length === 0) {
      const socket = io("http://localhost:3001");
      const conv = sockets;
      conv[number] = socket;
      setSockets(conv);
      socket.on("connect", () => {
        socket.emit("new-user", {
          store: storeId,
          id: number,
          role: role,
        });
      });
    } else {
      if (sockets[number]) {
        sockets[number].disconnect();
        delete sockets[number];
      } else {
        const socket = io("http://localhost:3001");
        const conv = sockets;
        conv[number] = socket;
        setSockets(conv);
        socket.on("connect", () => {
          socket.emit("new-user", {
            store: storeId,
            id: number,
            role: role,
          });
        });
      }
    }
  };
  return (
    <CustomButton
      variant="outlined"
      color="inherit"
    >
      {showtext ? (
        <div onClick={() => newuser(id)} style={role === "manager" ? { color: "gold" } : { color: "red" }}>
          {name ? `Disconnect ${name}` : `Disconnect ${id}`}
        </div>
      ) : (
        <div onClick={() => newuser(id)} style={role === "manager" ? { color: "gold" } : {}}>
          {" "}
          {name ? `Connect ${name}` : `Connect ${id}`}
        </div>
      )}
      {showtext ? <div onClick={()=>sendMessage(sockets[id])}>message</div> : null}
    </CustomButton>
  );
  function sendMessage(socket){
    socket.send("fuck you")
  }
};

export default GenerateUser;
