import React, { useEffect, useState } from "react";
// import { Modal, Group, Button, ScrollArea } from "@mantine/core";
import { Drawer, Group, Button, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import "../studentDashboardComponents/MessageModal.css";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { FaUserTie} from "react-icons/fa";
import { Textarea } from "@mantine/core";
import ChatModal from "./ChatModal";

// const style = {
//   position: "absolute",
//   top: "85px",
//   left: "",
//   right: "40px",
//   // transform: 'translate(-50%, -50%)',
//   width: 400,
//   height: "87%",
//   bgcolor: "background.paper",
//   // border: '2px solid #000',
//   boxShadow: 24,
//   padding: "10px",
// };

const MessageModal = ({ opened, onClose, myMessages, socket  }) => {
  const [selectedSenderName, setSelectedSenderName] = useState("");
  const [selectedSenderSubject, setSelectedSenderSubject] = useState("");
  const [selectedSenderBody, setSelectedSenderBody] = useState("");
  const [selectedSenderDate, setSelectedSenderDate] = useState("");
  const [selectedSenderTime, setSelectedSenderTime] = useState("");
  const isMobile = useMediaQuery("(max-width: 50em)");
  const isLargeScreen = useMediaQuery({ query: "(min-width: 768px)" });


  const openChatModal = (
    senderName,
    senderSubject,
    senderBody,
    senderDate,
    senderTime,
  ) => {
    onClose();
    setSelectedSenderName(senderName);
    setSelectedSenderSubject(senderSubject);
    setSelectedSenderBody(senderBody);
    setSelectedSenderDate(senderDate);
    setSelectedSenderTime(senderTime);
  };



  

  return (
    <>
      <Drawer
        opened={opened}
        onClose={onClose}
        title="Messages"
        scrollAreaComponent={ScrollArea.Autosize}
        transitionProps={{ transition: "rotate-left" }}
        position="right"
        // size={isLargeScreen ? 350 : "100%"}
        className="mantine-drawer"
        size={isLargeScreen ? 300 : null}
      style={{ width: isLargeScreen ? 300 : '100%' }}
        // style={{display: 'flex', marginTop: 'auto', marginBottom: 'auto', height: '300px'}}
      >
        {myMessages.map((message) => (
          <div
            className="d-flex w-100 each-modal-message mb-3"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            key={message._id}
            onClick={() =>
              openChatModal(
                message.senderName,
                message.messageSubject,
                message.messageBody,
                message.messageDate,
                message.messageTime
              )
            }
          >
            <img src="/pic/avatar.png" style={{ width: "80px" }} alt="" />
            <div className="my-auto">
              <div>{message.senderName}</div>
              <div style={{ fontSize: "12px" }}>{message.messageSubject}</div>
            </div>
            <div className="ms-auto d-flex flex-column my-auto">
              <small className="my-auto" style={{ fontSize: "10px" }}>
                {message.messageDate}
              </small>
              <small className="my-auto" style={{ fontSize: "10px" }}>
                {message.messageTime}
              </small>
            </div>
          </div>
        ))}
      </Drawer>
      {/* <ChatModal selectedSenderName={selectedSenderName} selectedSenderBody={selectedSenderBody} selectedSenderSubject={selectedSenderSubject} selectedSenderDate={selectedSenderDate} selectedSenderTime={selectedSenderTime} socket/> */}
      
    </>
  );
};

export default MessageModal;

