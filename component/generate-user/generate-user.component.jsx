import React, { useState } from "react";
import io from "socket.io-client";
import CustomButton from "../custom-button/custom-button.component";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    padding: "10px",
    margin: "10px",
    height: "40px",
    fontSize: "13px",
    width: "190px",
    wordBreak: "break-all",

    color: (props) =>
      props.role === "manager"
        ? "cyan"
        : props.is_connect_or_disconnect
        ? "red"
        : "white",
  },
  label: {},
});

const GenerateUser = ({ id, storeId, role, name }) => {
  const [sockets, setSockets] = useState({});
  const [is_connect_or_disconnect, setConnectionStyling] = useState(false);
  const newuser = (number) => {
    setConnectionStyling(!is_connect_or_disconnect);
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
  const sendMessage = (socket) => {
    socket.send("Hello world!");
  };
  const sendOrderComplete = (socket) => {
    socket.emit("trigger");
  };
  const classes = useStyles({
    role: role,
    is_connect_or_disconnect: is_connect_or_disconnect,
  });

  return (
    <div style={{ display: "flex" }}>
      <CustomButton
        variant="outlined"
        color="inherit"
        onClick={() => newuser(id)}
        className={classes.root}
      >
        {is_connect_or_disconnect ? `Disconnect ${name} ` : ` Connect ${name}`}
      </CustomButton>

      {is_connect_or_disconnect ? (
        <div style={{ display: "flex" }}>
          <CustomButton
            variant="outlined"
            color="inherit"
            className={classes.root}
            style={{ color: "lightgreen" }}
            onClick={() => sendMessage(sockets[id])}
          >
            {" "}
            Message{" "}
          </CustomButton>

          <CustomButton
            variant="outlined"
            color="inherit"
            className={classes.root}
            style={{ color: "orange" }}
            onClick={() => sendOrderComplete(sockets[id])}
          >
            {" "}
            Complete{" "}
          </CustomButton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GenerateUser;
