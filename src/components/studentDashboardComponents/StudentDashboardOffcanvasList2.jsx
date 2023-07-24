import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";

const StudentDashboardOffcanvasList2 = ({icons, item, params}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const offcanvasState = useSelector((state) => state.portalReducer.hide_show);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
      localStorage.removeItem('studentSignInToken');
    }, 1200);
  };
  return (
    <>
      <div
        className={`d-grid gap-3 text-white ${
          offcanvasState ? "offcanvaslist" : ""
        }`}
        onClick={() => handleClick()}
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex gap-3">
          <i
            className={icons}
            style={{ marginTop: "auto", marginBottom: "auto" }}
          ></i>
          {!offcanvasState && <div className="text-capitalize">{item}</div>}
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          {isLoading && <div className="loader"></div>}
        </Backdrop>
      </div>
    </>
  );
};

export default StudentDashboardOffcanvasList2;
