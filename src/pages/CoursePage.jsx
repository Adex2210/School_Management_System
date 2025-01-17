import axios from "axios";
import React, { useEffect, useState } from "react";
import PagesNavbar from "../components/navbarComponents/PagesNavbar";
import Footer from "../components/footerComponents/Footer";
import "../pages/CoursePage.css";
import { useLocation } from "react-router-dom";

const CoursePage = () => {
  const [subjects, setSubjects] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const location = useLocation();
  const para = location.state ? location.state.para : null;

  const [selectedOption, setSelectedOption] = useState("science");

  useEffect(() => {
    window.scrollTo(0, 0);
    let endpoint =
      "https://school-portal-backend-adex2210.vercel.app/staff_account/student_subject";
    let endpoint2 =
      "https://school-portal-backend-adex2210.vercel.app/staff_account/science_option_endpoint";
    let endpoint3 =
      "https://school-portal-backend-adex2210.vercel.app/staff_account/commercial_option_endpoint";
    let endpoint4 =
      "https://school-portal-backend-adex2210.vercel.app/staff_account/art_option_endpoint";

    axios.get(endpoint).then((response) => {
      setSubjects(response.data);
    });

    axios.get(endpoint2).then((response) => {
      setData2(response.data);
    });

    // Third Request
    axios.get(endpoint3).then((response) => {
      setData3(response.data);
    });

    axios.get(endpoint4).then((response) => {
      setData4(response.data);
    });
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };
  return (
    <>
      <PagesNavbar />
      {para === null || para === undefined ? (
        <div className="course-container">
          <div className="d-flex flex-column justify-content-center align-items-center course-main mx-auto">
            <div className="my-5 junior">
              <h1 className="course-header">
                All Subjects in Junior Secondary School
              </h1>
              <div className="subject-list">
                {subjects ? (
                  subjects.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : (
                  <div>not available</div>
                )}
              </div>
            </div>

            <div className="my-5 senior">
              <h1 className="course-header">
                All Subjects in Senior Secondary School
              </h1>
              <select
                className="custom-select"
                name="myOption"
                id=""
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select An Option
                </option>
                <option value="science">Sciences</option>
                <option value="commercial">Commercial</option>
                <option value="art">Art</option>
              </select>
              <div className="subject-list">
                {selectedOption === "commercial" && data3.length > 0 ? (
                  data3.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : selectedOption === "science" && data2.length > 0 ? (
                  data2.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : selectedOption === "art" && data4.length > 0 ? (
                  data4.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : (
                  <div>
                    There is currently no subject available for the selected
                    sources. We apologize for any inconvenience. Kindly please
                    check back later.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : para && (para == "jOne" || para == "jTwo" || para == "jThree") ? (
        <div className="course-container">
          <div className="d-flex flex-column justify-content-center align-items-center course-main mx-auto">
            <div className="my-5 junior">
              <h1 className="course-header">
                All Subjects in Junior Secondary School
              </h1>
              <div className="subject-list">
                {subjects ? (
                  subjects.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : (
                  <div>not available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : para && (para === "sOne" || para === "sTwo" || para === "sThree") ? (
        <div className="course-container">
          <div className="d-flex flex-column justify-content-center align-items-center course-main mx-auto">
            <div className="my-5 senior">
              <h1 className="course-header">
                All Subjects in Senior Secondary School
              </h1>
              <select
                className="custom-select"
                name="myOption"
                id=""
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select An Option
                </option>
                <option value="science">Sciences</option>
                <option value="commercial">Commercial</option>
                <option value="art">Art</option>
              </select>
              <div className="subject-list">
                {selectedOption === "commercial" && data3.length > 0 ? (
                  data3.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : selectedOption === "science" && data2.length > 0 ? (
                  data2.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : selectedOption === "art" && data4.length > 0 ? (
                  data4.map((sub, index) => (
                    <div className="subject-card" key={index}>
                      <h2 className="subject-title">{sub.subject}</h2>
                    </div>
                  ))
                ) : null }
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Invalid para value. Please select a valid option.</div>
      )}
      <Footer />
    </>
  );
};

export default CoursePage;
