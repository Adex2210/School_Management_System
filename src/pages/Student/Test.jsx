import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newStudent, takenExam } from "../../redux/portalSlice";

const Test = () => {
  // const [questions, setQuestions] = useState([]);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
  //   Number(localStorage.getItem("currentQuestionIndex")) || 0
  // );
  // const [selectedOption, setSelectedOption] = useState("");
  // const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  // const [scores, setScores] = useState(0);
  // const [clicked, setClicked] = useState(false);

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const globalState = useSelector((state) => state.portalReducer.studentInfo);
  // const examState = useSelector((state) => state.portalReducer.taken);

  // useEffect(() => {
  //   let studentLoginToken = localStorage.studentLoginToken;
  //   let endpoint =
  //     "https://school-portal-backend-adex2210.vercel.app/student_account/student__admission_dashboard";
  //   axios
  //     .get(endpoint, {
  //       headers: {
  //         Authorization: `Bearer ${studentLoginToken}`,
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status) {
  //         //       setIsLoading(false);
  //         //       setOpen(false);
  //         dispatch(newStudent(res.data.response));
  //         // console.log(res.data.message);
  //       } else {
  //         console.log(res.data.message);
  //         console.log(res.data.status);
  //         navigate("/student_login");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });


      
  // }, []);

  // useEffect(() => {
  //   let endpoint =
  //     "https://school-portal-backend-adex2210.vercel.app/staff_account/questions";
  //   axios.get(endpoint).then((response) => {
  //     setQuestions(response.data);
  //     if (localStorage.getItem("currentQuestionIndex") === null) {
  //       localStorage.setItem(
  //         "currentQuestionIndex",
  //         String(currentQuestionIndex)
  //       );
  //     }
  //   });
  // }, []);

  // // http://localhost:2000

  // let myEmail = globalState.email;
  // const handleNextClick = () => {
  //   if (currentQuestionIndex < questions.length - 1) {
  //     let endpoint2 =
  //     "https://school-portal-backend-adex2210.vercel.app/student_account/update_my_admission_exam_score";
  //     axios.post(endpoint2, { scores, myEmail }).then((response) => {
  //       if (response.data.status) {
  //         console.log(response.data.message);
  //         // setCurrentQuestionIndex(currentQuestionIndex + 1);
  //         const newQuestionIndex = currentQuestionIndex + 1;
  //         setCurrentQuestionIndex(newQuestionIndex);
  //         localStorage.setItem("currentQuestionIndex", String(newQuestionIndex));
  //         setSelectedOption("");
  //         setShowCorrectAnswer(false);
  //         setClicked(false);
  //         setScores(0)
  //       } else {

  //       }
  //       // dispatch(takenExam(true))
  //     });
  //   }
  // };


  // const handlePreviousClick = () => {
  //   if (currentQuestionIndex > 0) {
  //     const newQuestionIndex = currentQuestionIndex - 1;
  //     setCurrentQuestionIndex(newQuestionIndex);
  //     localStorage.setItem("currentQuestionIndex", String(newQuestionIndex));
  //     setSelectedOption("");
  //     setShowCorrectAnswer(false);
  //     setClicked(false);
  //     setScores(0)
  //   }
  // };



  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  //   setShowCorrectAnswer(true);
  //   if (option.startsWith(questions[currentQuestionIndex].correctOption)) {
  //     if (!clicked) {
  //       setClicked(true);
  //       setScores(scores + 10);
  //     }
  //   } else {
  //     if (clicked) {
  //       setClicked(false);
  //       setScores(scores - 10);
  //     }
  //   }
  // };

  // const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div>
      hello
        {/* <div>
          Welcome: {globalState.firstName} {globalState.lastName}
        </div>
        {currentQuestion && (
          <>
            <h1>Question {currentQuestion.id}</h1>
            <p>{currentQuestion.content}</p>
            <ul>
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  style={{
                    backgroundColor:
                      showCorrectAnswer &&
                      option.startsWith(currentQuestion.correctOption)
                        ? "green"
                        : option === selectedOption
                        ? "red"
                        : "white",
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={handlePreviousClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
            <p>Score: {scores}</p>
          </>
        )} */}
      </div>
    </>
  );
};

export default Test;
