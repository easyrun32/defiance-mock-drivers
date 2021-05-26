import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
const OrderComplete = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const socket = io("http://localhost:3001/ ");
    setSocket(socket);
    socket.on("connect", () => {
      socket.emit("new-user", {
        store: "psq2",
        id: 4545,
        role: "driver",
      });
    });
    socket.on("disconnect", () => {
      console.log("client disconnected from server");
    });
    return () => {
      socket.close();
    };
  }, []);
  const completeOrder = () => {
    socket.emit("order-new");
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => completeOrder()}
      >
        complete
      </Button>
    </div>
  );
};

export default OrderComplete;
