import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newName } from "../../redux/portalSlice";
import axios from "axios";

const StudentCourseRegistration = () => {
//   let dispatch = useDispatch();
const globalState = useSelector((state)=>state.portalReducer.staffInfo)
  useEffect(() => {
    let endpoint = "http://localhost:2000/staff_account/edit_details";
    axios.get(endpoint)
    .then((res) => {
        dispatch(newName(res.data.response))
        // console.log(globalState.firstName);
    })
  }, []);

  return (
    <>
      <div>Course Registration</div>
    </>
  );
};

export default StudentCourseRegistration;
