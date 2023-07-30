import React, { useEffect, useState } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { Textarea } from "@mantine/core";

const ChatModal = ({
  selectedSenderName,
  selectedSenderSubject,
  selectedSenderBody,
  selectedSenderDate,
  selectedSenderTime,
  socket,
  name,
  picture,
  id,
}) => {
  const [message, setMessage] = useState("");
  const [allmessages, setAllmessages] = useState([]);
  const [myChat, setMyChat] = useState([]);
  const [me, setMe] = useState("");

  // useEffect(() => {
  //   // alert("hii")
  //   setMe('adex')
  //   if (socket.current) {
  //     socket.current.on("broadcastMsg", (receivedMessage) => {
  //       console.log(receivedMessage);
  //       setMyChat(receivedMessage);
  //     });
  //   }
  // }, []);

  // ChatModal.jsx

  // const sendMessage = () => {
  //   let payload = {
  //     message: message,
  //     name: name,
  //     messageDate: new Date().toLocaleDateString("en-GB", {
  //       year: "2-digit",
  //       month: "2-digit",
  //       day: "2-digit",
  //     }),
  //     messageTime: new Date().toLocaleTimeString("en-US", {
  //       hour12: false,
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     picture: localStorage.cloudImage,
  //     id: id,
  //   };

  //   // console.log(payload);
  //   socket.current.emit("sentMsg", payload);
  //   setAllmessages([...allmessages, payload]);
  // };

  return (
    <>
      {/* <div
        className="modal fade w-100 h-100"
        id="staticBackdrop"
        data-bs-backdrop="false"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog d-flex">
          <div className="modal-content my-auto">
            <div className="modal-header">
              <div className="modal-title d-flex" id="staticBackdropLabel">
                <img src="/pic/avatar.png" style={{ width: "50px" }} alt="" />
                <div className="my-auto d-flex flex-column">
                  <small>{selectedSenderName}</small>
                  <small>Active 2h ago</small>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                {allmessages.map((msg, index) => (
                  <div key={index}>
                    <div>{msg.name}</div>
                    <div>{msg.message}</div>
                    <div>{msg.messageDate}</div>
                    <div>{msg.messageTime}</div>
                    <img
                      src={msg.picture}
                      alt=""
                      style={{ width: "50px", borderRadius: "50%" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer d-flex w-100">
              <BsFillEmojiSmileFill size={20} color="orange" />
              <Textarea
                label=""
                placeholder="Message"
                autosize
                minRows={1}
                maxRows={4}
                style={{ width: "70%", backgroundColor: "" }}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                // onClick={sendMessage}
                className="btn btn-sm btn-primary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ChatModal;



