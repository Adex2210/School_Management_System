import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';

const StudentPaymentHistory = () => {
  const globalState = useSelector((state) => state.portalReducer.studentInfo);

  const receivedEmail = globalState.email;
  const formClass = globalState.level;
  const formTerm = globalState.term;
  const formOption = globalState.options;

  const [yhea, setYhea] = useState([]);

  useEffect(() => {    
    let endpoint2 =
      "https://school-portal-backend-adex2210.vercel.app/student_account/paymentHistory";
    axios
      .get(endpoint2, {
        params: {
          receivedEmail,
          formClass,
          formTerm,
          formOption,
        },
      })
      .then((response) => {
        setYhea(response.data.response);
      });
  }, [globalState]);
  return (
    <>
      <div className="w-100 px-2 course-reg-container" style={{height: '100%', backgroundColor: ''}}>
        <div className="d-flex gap-4  py-2">
          <div>Payment History: </div>
          <div className="fw-bold">
            {globalState.level}
          </div>
        </div>
        <div className="" style={{overflowY: 'auto', height: '70%'}}>
          <table className="table table-borderd mt-4">
            <thead>
              <tr>
                <td>#INVOIVE</td>
                <td>AMOUNT TO BE PAID</td>
                <td>AMOUNT PAID</td>
                <td>BALANCE</td>
                <td>DATE</td>
                <td>ACTION</td>
              </tr>
            </thead>
            <tbody>
              {yhea && yhea.length > 0 ? (
                yhea.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.paidFor}</td>
                    <td>{payment.amountToPaid}</td>
                    <td>{payment.amountPaid}</td>
                    <td>{payment.balance}</td>
                    <td>{payment.date}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-white shadow delete-btn"
                        onClick={() => deleteSelectedSubject(subject._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Results Found. Add subjects.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
    </>
  )
}

export default StudentPaymentHistory