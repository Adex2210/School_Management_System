import React, { useEffect, useRef, useState } from 'react'
import StudentDashboardOffcanvasTitle from './StudentDashboardOffcanvasTitle'
import StudentDashboardOffcanvasList from './StudentDashboardOffcanvasList'
import StudentDashboardOffcanvasList2 from './StudentDashboardOffcanvasList2'


const StudentDashboardOffcanvas_On_Small_Screen = () => {
  const offCanvasRef = useRef(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen((prev) => !prev); // Toggle the isOffcanvasOpen state
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-start offcanvas-on-small-screen"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
        style={{ backgroundColor: "#030552", width: '75%', overflowY: 'scroll'}}
        ref={offCanvasRef}
      >
       <div className="dashboard-offcanvas w-100 position-relative text-white">
          <div
            className="w-100 d-flex justify-content-center shadow"
            style={{ height: "80px", width: "100%", borderBottom: '2px solid white' }}
          >
            <img
              src="/pic/ade.png"
              alt=""
              className="my-auto"
              style={{ width: "60px", height: "60px" }}
            />
          </div>
          <div
            className="text-capitalize text-center py-5 fs-5 fw-bold"
            id="menu"
          >
            personal menu
          </div>
          <div className="px-4 d-grid gap-5">
            <div className="d-grid gap-3">
              <StudentDashboardOffcanvasTitle title="main menu" />
              <StudentDashboardOffcanvasList toggleOffcanvas={toggleOffcanvas} item="dashboard" params="/student_dashboard/home" icons="fas fa-border-all" />
            </div>
            <div className="d-grid gap-3">
              <StudentDashboardOffcanvasTitle title="profile" />
              <StudentDashboardOffcanvasList  item="my profile" params="/student_dashboard/profile" icons="fas fa-user" />
              <StudentDashboardOffcanvasList  item="change password" params="/student_dashboard/change_password" icons="fas fa-lock" />
              <StudentDashboardOffcanvasList  item="edit details" params="/student_dashboard/edit_details" icons="fas fa-edit" />
            </div>
            <div className="d-grid gap-3">
              <StudentDashboardOffcanvasTitle title="academics" />
              <StudentDashboardOffcanvasList  item="resources" params="/student_dashboard/resources" icons="fas fa-file"/>
              <StudentDashboardOffcanvasList  item="course registration" params="/student_dashboard/course_registration" icons="fas fa-user" />
              <StudentDashboardOffcanvasList item="registration history" params="/student_dashboard/registration_history" label="registration history" icons="fas fa-lock" />
              <StudentDashboardOffcanvasList item="results" params="/student_dashboard/results" label="results" icons="fas fa-edit" />
            </div>
            <div className="d-grid gap-3">
              <StudentDashboardOffcanvasTitle title="payment" />
              <StudentDashboardOffcanvasList item="pay tuition" params="/student_dashboard/pay_tuition" label="pay tuition" icons="fas fa-user" />
              <StudentDashboardOffcanvasList item="payment history" params="/student_dashboard/payment_history" label="payment history" icons="fas fa-lock" />
            </div>
            <div className="d-grid gap-3 mb-5">
              {/* <StudentDashboardOffcanvasTitle title="" /> */}
              <StudentDashboardOffcanvasList2 item="logout" icons="fas fa-user" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDashboardOffcanvas_On_Small_Screen