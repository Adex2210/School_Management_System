import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myEmailVerify, mySentOTP } from "../../redux/portalSlice";
import { useDispatch, useSelector } from "react-redux";
import OTPCountdown from "./OTPCountdown";

const EmailVerifications = ({ sentEmail: sentEmail }) => {
  const dispatch = useDispatch();
  const [myEmail, setMyEmail] = useState("");
  const [myHarshOTP, setMyHarshOTP] = useState("");
  const [startCountdown, setStartCountdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const countdownExpired = useSelector(
    (state) => state.portalReducer.countdownExpired
  );

  useEffect(() => {
    const storedValue = localStorage.getItem("ok");

    if (storedValue) {
      setStartCountdown(storedValue === "true");
    } else {
      setStartCountdown(false);
    }
  }, [startCountdown]);

  const countdownTime = 180;
  let formik = useFormik({
    initialValues: {
      myEmail: sentEmail || "",
      startCountdown: true,
      countdownStartTime: Date.now(),
      countdownTimeRemaining: countdownTime,
    },

    onSubmit: (values) => {
      setIsLoading(true);
      const myOTP = Math.floor(Math.random() * 9000 + 1000);
      const newValues = { ...values, myOTP };
      let endpoint =
        "https://school-portal-backend-adex2210.vercel.app/student_account/forgot_password";
      axios.post(endpoint, newValues).then((response) => {
        if (response.data.status) {
          setIsLoading(false);
          localStorage.secret = response.data.secret;
          setMyEmail(response.data.response[0]);
          setIsLoading(false);
          if (response.data.status) {
            localStorage.setItem(
              "ok",
              response.data.result[0].startCountdown.toString()
            );
            setStartCountdown(response.data.result[0].startCountdown);
            // setIsCountdownActive(response.data.result[0].startCountdown);
            localStorage.setItem(
              "OTPCountdownStartTime",
              response.data.result[0].countdownStartTime
            );
            localStorage.setItem(
              "OTPCountdownTimeRemaining",
              response.data.result[0].countdownTimeRemaining
            );
            dispatch(myEmailVerify(response.data.response[0]));
            dispatch(mySentOTP(myOTP));
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
          }
        } else {
          setIsLoading(false);
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "warning",
            title: response.data.message,
          });
        }
      });
    },
  });

  return (
    <>
      <form
        action=""
        className="email-verification-from mx-auto d-flex border shadow"
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <div className="pt-4">
          <img
            src="pic/ade.png"
            alt=""
            style={{ width: "50px" }}
            className="mx-auto d-flex mb-4"
          />
          <h3 className="text-center">Forgot Password?</h3>
          <hr />
        </div>
        <div className="d-flex flex-column pt-2 px-5">
          <small className="pb-4 text-center">
            To reset your password, kindly enter your email address below,
            submit it and click Next step to continue
          </small>
          <div className="col-lg-12 position-relative  flex-column mb-3 mt-3">
            <input
              type="email"
              autoComplete="on"
              className={
                formik.touched.email && formik.errors.email
                  ? "input form-control is-invalid"
                  : "input form-control"
              }
              name="myEmail"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={sentEmail}
            />
            <label htmlFor="validationServer01" className="user-label">
              Email Address
            </label>
            <div id="validationServer04Feedback" className="invalid-feedback">
              Please provide a valid Email address.
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success btn-sm my-4"
            disabled={localStorage.getItem("ok") === "true" || isLoading}
          >
            {isLoading ? <div className="spinner"></div> : <div>Submit</div>}
          </button>
          <Link
            to="/student_login"
            className="fw-bold mb-4 mt-2"
            style={{ textDecoration: "none" }}
          >
            Sign in
          </Link>
          <div>
            {startCountdown ? (
              <div className="d-flex gap-3">
                <small style={{ color: "red" }}>Token Expires in: </small>
                <OTPCountdown
                  startCountdown={startCountdown}
                />
              </div>
            ) : (
              <div
                className=""
                style={{ width: "100px", height: "25px" }}
              ></div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default EmailVerifications;
