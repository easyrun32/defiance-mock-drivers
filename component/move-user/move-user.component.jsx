import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
/*
Test component that takes @params  id 
Description: Simulates a driver moving
*/
const MoveUser = ({ id, storeId, role }) => {
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(true);
  const [userexist, setUserexist] = useState(true);
  const [position, setPosition] = useState({
    position: {
      coords: {
        accuracy: 65,
        altitude: 210.50143432617188,
        altitudeAccuracy: 10,
        heading: -1,
        latitude: 26.259,
        longitude: -80.27,
        speed: -1,
      },
      timestamp: 1610579477507.111,
    },
    storeId: storeId,
    id: id,
  });
  // to get prevstate, see line 66 to explain why we get prevposition
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }
  //see line 66 to explain why we get prevposition
  const prevPosition = usePrevious(position);
  useEffect(() => {
    // If a socket is defined  then emit to the server
    if (socket) {
      socket.on("connect", () => {
        // i just want one user
        if (userexist) {
          socket.emit("new-user", {
            store: storeId,
            id: id,
            role: role,
          });
          setUserexist(false);
        }

        socket.emit("position", position);
      });
    }
    /*
     
     Since the useEffect already created a socket
     we don't want to create another socket connection and
     we use userexist to check that and to check if 
    
     and the reason we use prevPosition is because we want to check
     if the position change  with prevPosition
    */
    if (userexist === false && prevPosition !== position) {
      socket.emit("position", position);
    }

    return () => {};
  }, [socket, userexist, position, prevPosition, id]);

  const newuser = () => {
    //So it doesn't create a new socket
    if (connected) {
      const socket = io("http://localhost:3001/");
      setSocket(socket);
      setConnected(false);
    }

    //  if a user exist
    //  then set the position only when the button is clicked
    //  this conditionall statement is decieving but you can think of it that
    //  way (:

    if (userexist === false) {
      setPosition({
        position: {
          coords: {
            accuracy: 65,
            altitude: 210.50143432617188,
            altitudeAccuracy: 10,
            heading: -1,
            latitude: position.position.coords.latitude + 0.0001,
            longitude: -80.27,
            speed: -1,
          },
          timestamp: 1610579477507.111,
        },
        storeId: storeId,
        id: id,
      });
    }
  };
  return (
    <Button variant="outlined" color="inherit" onClick={() => newuser()}>
      Move User {id}
    </Button>
  );
};

export default MoveUser;
