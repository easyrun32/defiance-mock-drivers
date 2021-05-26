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

const GenerateUser = ({ id, storeId, role, name, otherinfo }) => {
  const [sockets, setSockets] = useState({});
  const [is_connect_or_disconnect, setConnectionStyling] = useState(false);
  const newuser = (number) => {
    setConnectionStyling(!is_connect_or_disconnect);
    if (Object.keys(sockets).length === 0) {
      const socket = io("http://localhost:3001/ ");
      const conv = sockets;
      conv[number] = socket;
      setSockets(conv);
      socket.on("connect", () => {
        socket.emit("new-user", {
          ...{
            store: storeId,
            id: id,
            role: role,
            firstName: name,
          },
          ...otherinfo,
        });
      });
    } else {
      if (sockets[number]) {
        sockets[number].disconnect();
        delete sockets[number];
      } else {
        const socket = io("http://localhost:3001/ ");
        const conv = sockets;
        conv[number] = socket;
        setSockets(conv);
        socket.on("connect", () => {
          socket.emit("new-user", {
            ...{
              store: storeId,
              id: id,
              role: role,
              firstName: name,
            },
            ...otherinfo,
          });
        });
      }
    }
  };
  const sendMessage = (socket) => {
    socket.send("Hello world!");
  };
  const sendNewOrders = (socket) => {
    socket.emit("trigger-new-orders", {
      status: "unassigned",
      date: "3/30/2021",
      _id: "606385ce29a30529c486098c",
      orderNumber: 83,
      address: "5479 Pine Ln, Coral Springs, FL 33067, USA",
      time: {
        hour: 18,
        minute: 10,
      },
      phone: "954-753-4148 ",
      geocode: {
        lat: 26.2975058,
        lng: -80.235486,
      },
      __v: 0,
    });
  };
  const sendOrderUpdates = (socket) => {
    socket.emit("trigger-new-updates", {
      status: "completed",
      date: "3/30/2021",
      _id: "606385ce29a30529c486098c",
      orderNumber: 82,
      address: "5479 Pine Ln, Coral Springs, FL 33067, USA",
      time: {
        hour: 18,
        minute: 10,
      },
      phone: "954-753-4148 ",
      geocode: {
        lat: 26.2975058,
        lng: -80.235486,
      },
      __v: 0,
    });
  };
  const sendOrderDelete = (socket) => {
    socket.emit("trigger-order-delete", {
      status: "completed",
      date: "3/30/2021",
      _id: "606385ce29a30529c486098c",
      orderNumber: 82,
      address: "5479 Pine Ln, Coral Springs, FL 33067, USA",
      time: {
        hour: 18,
        minute: 10,
      },
      phone: "954-753-4148 ",
      geocode: {
        lat: 26.2975058,
        lng: -80.235486,
      },
      __v: 0,
    });
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
        {is_connect_or_disconnect
          ? `Disconnect ${name}, ${id} `
          : ` Connect ${name}, ${id}`}
      </CustomButton>
    </div>
  );
};

export default GenerateUser;
