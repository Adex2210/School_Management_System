import React, { useEffect, useState } from "react";
import "../pages/StaffEditDetails.css";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { newName } from "../redux/portalSlice";

const StaffEditDetails = () => {
  const globalState = useSelector((state)=>state.portalReducer.staffInfo)

  useEffect(() => {
        // console.log(globalState);
//     let endpoint = "http://localhost:2000/staff_account/edit_details";
//     axios.get(endpoint, myEmail )
//     .then((response) => {
// //       dispatch(newName(response.data.response));
// //       console.log(response.data.response);
//     });
  }, );

  let formik = useFormik({
    initialValues: {
      address: "",
      country: "",
      lga: "",
      hubby: "",
      receivedEmail: ""
    },

    onSubmit: (values) => {
      console.log(globalState);
      const newValues = {...values,receivedEmail:globalState.email};
      console.log(newValues);
      let endpoint = "http://localhost:2000/staff_account/edit_details";
      axios.post(endpoint, newValues)
      .then((response) => {
        console.log(response);
      });
    },
  });
  return (
    <>
      <div className="edit-container">
        <div className="edit-card">
          <h3 className="edit-login">Edit Your Details</h3>
          <form onSubmit={formik.handleSubmit} action="/staff_account/edit_details" method="post">
            <div className="edit-inputBox">
              <input
                type="text"
                name="address"
                required="required"
                onChange={formik.handleChange}
              />
              <span className="edit-user">Address</span>
            </div>

            <div className="edit-inputBox">
              <input
                type="text"
                name="country"
                required="required"
                onChange={formik.handleChange}
              />
              <span className="edit-user">Country</span>
            </div>

            <div className="edit-inputBox">
              <input
                type="text"
                name="lga"
                required="required"
                onChange={formik.handleChange}
              />
              <span className="edit-user">LGA</span>
            </div>

            <div className="edit-inputBox">
              <input
                type="text"
                name="hubby"
                required="required"
                onChange={formik.handleChange}
              />
              <span>Hubby</span>
            </div>

            <button type="submit" className="edit-enter">
              Enter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StaffEditDetails;
