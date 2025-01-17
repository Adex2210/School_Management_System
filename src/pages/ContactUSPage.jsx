import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../pages/ContactUsPage.css";
import PagesNavbar from "../components/navbarComponents/PagesNavbar";
import Footer from "../components/footerComponents/Footer";

const ContactUSPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      let endpoint =
        "https://school-portal-backend-adex2210.vercel.app/staff_account/people_reaching_us";
      axios
        .post(endpoint, values)
        .then((response) => {
          setIsLoading(false);
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom",
            showConfirmButton: false,
            html: `
              <div class="toast-content">
                <button id="close-toast-button" class="close-button">&times;</button>
              </div>
            `,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);

              const closeButton = document.getElementById("close-toast-button");
              closeButton.addEventListener("click", () => {
                Swal.close(); // Close the toast
              });

              document.body.addEventListener("click", () => {
                Swal.close(); // Close the toast
              });
            },
            customClass: {
              container: "custom-toast-width",
              popup: "custom-toast-position",
            },
          });

          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      resetForm();
    },
  });
  return (
    <>
      <PagesNavbar />
      <div
        className="d-flex flex-column justify-content-center w-100"
        style={{
          height: "100%",
          backgroundColor: "#f1f1f1",
          paddingTop: "170px",
        }}
      >
        <div className="m-auto w-lg-50 w-sm-100 shadow px-5 py-5 d-flex flex-column justify-content-center account-type-page">
          <div className="contact-info">
            <h1>Contact Us</h1>
            <p>
              We value your feedback and inquiries. Please feel free to reach
              out to us using the contact form below.
            </p>
            <p>Contact Information:</p>
            <p>Phone: +2347033959586</p>
            <p>Email: adeoluamole@gmail.com</p>
            <p>Address:No 16, Randa Area, Ogbomoso, Oyo state, Nigeria</p>
          </div>
          <div className="contact-form-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  required=""
                  placeholder="Your Name"
                  className="text-capitalize contact-form-container-input"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error text-danger">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required=""
                  placeholder="Your Email"
                  className="contact-form-container-input"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error text-danger">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  required=""
                  placeholder="Your Message"
                  className="text-capitalize contact-form-container-input"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  rows={5}
                />
                {formik.touched.message && formik.errors.message ? (
                  <div className="error text-danger">
                    {formik.errors.message}
                  </div>
                ) : null}
              </div>

              <button type="submit" className="contact-form-submit-btn">
                {isLoading ? <div className="spinner"></div> : <div>Send </div>}
              </button>
            </form>
          </div>
          <div className="map" style={{height: '200px !important'}}>
            {/* Add your map or location here */}
            {/* Example: <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3083..." width="100%" height="400" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUSPage;
