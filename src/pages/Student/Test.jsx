import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newStudent } from "../../redux/portalSlice";
import "../Student/Test.css";
import "animate.css";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Number(localStorage.getItem("currentQuestionIndex")) || 0
  );
  const [selectedOptions, setSelectedOptions] = useState(Array(0));
  const [questionScores, setQuestionScores] = useState(Array(0));
  const [taken, setTaken] = useState(false);
  const [beginExam, setBeginExam] = useState(false);
  const [allTotalScore, setAllTotalScore] = useState(0);
  const [isSubmissionTriggered, setIsSubmissionTriggered] = useState(false);
  // const [done, setDone] = useState(false);

  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });

  const currentQuestion = questions[currentQuestionIndex];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.portalReducer.studentInfo);
  let warningSound = new Audio("warning.wav");

  useEffect(() => {
    let studentLoginToken = localStorage.studentLoginToken;
    let endpoint =
      "https://school-portal-backend-adex2210.vercel.app/student_account/student__admission_dashboard";
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${studentLoginToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.data.status) {
          dispatch(newStudent(res.data.response));
        } else {
          console.log(res.data.message);
          console.log(res.data.status);
          navigate("/student_login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [globalState]);

  const startCountdown = () => {
    const startTime = parseInt(localStorage.getItem("countdownStartTime"));
    const countdownTime = parseInt(
      localStorage.getItem("countdownTimeRemaining")
    );

    if (startTime && countdownTime) {
      const countdownInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);

        const remainingTime = countdownTime - elapsedTime;
        if (remainingTime <= 0) {
          clearInterval(countdownInterval);
          localStorage.done = true;

          console.log('timeout')


          if (localStorage.done) {
            // setIsSubmissionTriggered(true);
      
            const nonNegativeScores = questionScores.map((score) =>
              Math.max(score, 0)
            );
      
            const totalNonNegativeScore = nonNegativeScores.reduce(
              (total, score) => total + score,
              0
            );
            submit(totalNonNegativeScore);
          }
        // };
      
        // setTimeout(() => {
        //   // finishedByForce();
        // }, 10000);
          
          // setDone(true);
        } else {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;

          setCountdown({ minutes, seconds });

          if (minutes === 0 && seconds <= 30) {
            // warningSound.play();
          }
        }
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  };

  useEffect(() => {
    let endpoint =
      "https://school-portal-backend-adex2210.vercel.app/staff_account/questions";
    axios.get(endpoint).then((response) => {
      setQuestions(response.data);
      // if (localStorage.getItem("currentQuestionIndex") === null) {
      //   localStorage.setItem(
      //     "currentQuestionIndex",
      //     String(currentQuestionIndex)
      //   );
      // }

      const storedQuestionIndex = localStorage.getItem("currentQuestionIndex");
      if (storedQuestionIndex === null) {
        localStorage.setItem(
          "currentQuestionIndex",
          String(currentQuestionIndex)
        );
      } else {
        setCurrentQuestionIndex(Number(storedQuestionIndex)); // Use the stored index
      }
    });

    startCountdown();
  }, []);

  const handleNextClick = () => {
    const newQuestionIndex = currentQuestionIndex + 1;

    if (newQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex]; // Store the current question
      const scoreToUpdate = questionScores[currentQuestionIndex];

      console.log(scoreToUpdate);
      console.log("currentQuestion.id:", currentQuestion.id);

      const newQuestionScores = [...questionScores];
      newQuestionScores[currentQuestionIndex] = scoreToUpdate;

      setQuestionScores(newQuestionScores);

      localStorage.setItem("currentQuestionIndex", String(newQuestionIndex));

      setCurrentQuestionIndex(newQuestionIndex);
    } else if (currentQuestion && currentQuestion.id === 10) {
      const nonNegativeScores = questionScores.map((score) =>
        Math.max(score, 0)
      );

      const totalNonNegativeScore = nonNegativeScores.reduce(
        (total, score) => total + score,
        0
      );
      submit(totalNonNegativeScore);
    }
  };

  const submit = (newScores) => {
    console.log(newScores);
    const endpoint2 =
      "http://localhost:2000/student_account/update_my_admission_exam_score";
    axios
      .post(endpoint2, {
        myScores: newScores,
        myEmail: globalState.email,
      })
      .then((response) => {
        if (response.data.status) {
          setTaken(true);
        }
      });
  };

  // const handleNextClick = () => {
  //   const newQuestionIndex = currentQuestionIndex + 1;

  //   if (newQuestionIndex < questions.length) {
  //     const currentQuestion = questions[currentQuestionIndex]; // Store the current question
  //     const scoreToUpdate = questionScores[currentQuestionIndex];

  //     console.log(scoreToUpdate);
  //     console.log("currentQuestion.id:", currentQuestion.id);

  //     // Update local state
  //     const newQuestionScores = [...questionScores];
  //     newQuestionScores[currentQuestionIndex] = scoreToUpdate;

  //     setQuestionScores(newQuestionScores);

  //     localStorage.setItem("currentQuestionIndex", String(newQuestionIndex));

  //     setCurrentQuestionIndex(newQuestionIndex);
  //   } else if (currentQuestion && currentQuestion.id === 10) {
  //     const totalScore = questionScores.reduce((total, score) => total + score, 0);
  //     setAllTotalScore(totalScore)

  //     if (allTotalScore !== 0 && allTotalScore !== undefined && allTotalScore !== null) {
  //       console.log("Total score:", totalScore);
  //       console.log("All total score:", allTotalScore);
  //       submit();
  //     }
  //   }
  // };

  // const submit = () => {
  //   const endpoint2 =
  //       "http://localhost:2000/student_account/update_my_admission_exam_score";
  //     axios
  //       .post(endpoint2, {
  //         scores: allTotalScore,
  //         myEmail: globalState.email,
  //       })
  //       .then((response) => {
  //         if (response.data.status) {
  //           setTaken(true);
  //         }
  //       });
  // }

  // const handleNextClick = () => {
  //   const newQuestionIndex = currentQuestionIndex + 1;
  //   if (newQuestionIndex < questions.length) {
  //     const currentQuestion = questions[currentQuestionIndex]; // Store the current question
  //     const scoreToUpdate = questionScores[currentQuestionIndex];

  //     console.log(scoreToUpdate);
  //     console.log("currentQuestion.id:", currentQuestion.id);

  //     const endpoint2 =
  //       "http://localhost:2000/student_account/update_my_admission_exam_score";
  //     axios
  //       .post(endpoint2, {
  //         scores: scoreToUpdate,
  //         myEmail: globalState.email,
  //       })
  //       .then((response) => {
  //         if (response.data.status) {
  //           const newQuestionScores = [...questionScores];
  //           newQuestionScores[currentQuestionIndex] = scoreToUpdate;

  //           setQuestionScores(newQuestionScores);

  //           localStorage.setItem(
  //             "currentQuestionIndex",
  //             String(newQuestionIndex)
  //           );

  //           setCurrentQuestionIndex(newQuestionIndex);
  //         }
  //       });
  //   } else if (currentQuestion && currentQuestion.id === 10) {
  //     const totalScore = questionScores.reduce((total, score) => total + score, 0);

  //     console.log("Total score:", totalScore);

  //     const endpoint2 =
  //       "http://localhost:2000/student_account/update_my_admission_exam_score";
  //     axios
  //       .post(endpoint2, {
  //         scores: totalScore,
  //         myEmail: globalState.email,
  //       })
  //       .then((response) => {
  //         if (response.data.status) {
  //           setTaken(true);
  //         }
  //       });
  //   }
  // };

  // const handleNextClick = () => {
  //   const newQuestionIndex = currentQuestionIndex + 1;
  //   if (newQuestionIndex < questions.length) {
  //     const currentQuestion = questions[currentQuestionIndex]; // Store the current question
  //     const scoreToUpdate = questionScores[currentQuestionIndex];

  //     console.log(scoreToUpdate);
  //     console.log("currentQuestion.id:", currentQuestion.id);

  //     const endpoint2 =
  //       "http://localhost:2000/student_account/update_my_admission_exam_score";
  //     axios
  //       .post(endpoint2, {
  //         scores: scoreToUpdate,
  //         myEmail: globalState.email,
  //       })
  //       .then((response) => {
  //         if (response.data.status) {
  //           const newQuestionScores = [...questionScores];
  //           newQuestionScores[currentQuestionIndex] = scoreToUpdate;

  //           setQuestionScores(newQuestionScores);

  //           localStorage.setItem(
  //             "currentQuestionIndex",
  //             String(newQuestionIndex)
  //           );

  //           setCurrentQuestionIndex(newQuestionIndex);
  //         }
  //       });
  //   } else if (currentQuestion && currentQuestion.id === 10) {
  //     const scoreToUpdate = questionScores[currentQuestionIndex];
  //     console.log("Final scoreToUpdate:", scoreToUpdate);

  //     // Send scoreToUpdate to the server for all questions (from 1 to 10)
  //     const endpoint2 =
  //       "http://localhost:2000/student_account/update_my_admission_exam_score";
  //     axios
  //       .post(endpoint2, {
  //         scores: questionScores,
  //         myEmail: globalState.email,
  //       })
  //       .then((response) => {
  //         if (response.data.status) {
  //           setTaken(true);
  //         }
  //       });
  //   }
  // };

  // const handleNextClick = () => {
  //   const newQuestionIndex = currentQuestionIndex + 1;
  //   if (newQuestionIndex < questions.length) {
  //     const scoreToUpdate = questionScores[currentQuestionIndex];
  //     console.log(scoreToUpdate);
  //     console.log("currentQuestion.id:", currentQuestion.id);

  //     const endpoint2 =
  //       "http://localhost:2000/student_account/update_my_admission_exam_score";
  //     axios
  //       .post(endpoint2, {
  //         scores: scoreToUpdate,
  //         myEmail: globalState.email,
  //       })
  //       .then((response) => {
  //         if (response.data.status) {
  //           const newQuestionScores = [...questionScores];
  //           newQuestionScores[currentQuestionIndex] = scoreToUpdate;

  //           setQuestionScores(newQuestionScores);

  //           if (currentQuestion.id === 10) {
  //             // setTaken(true);
  //           }

  //           localStorage.setItem(
  //             "currentQuestionIndex",
  //             String(newQuestionIndex)
  //           );
  //         }
  //       });

  //     setCurrentQuestionIndex(newQuestionIndex);
  //   } else {
  //     setTaken(true);
  //   }
  // };

  // const handleNextClick = () => {
  //   const scoreToUpdate = questionScores[currentQuestionIndex];
  //    console.log(scoreToUpdate);
  //     console.log("currentQuestion.id:", currentQuestion.id);

  //     const endpoint2 =
  //       "http://localhost:2000/student_account/update_my_admission_exam_score";
  //     axios
  //       .post(endpoint2, {
  //         scores: scoreToUpdate,
  //         myEmail: globalState.email,
  //       })
  //       .then((response) => {
  //         if (response.data.status) {
  //           const newQuestionScores = [...questionScores];
  //           newQuestionScores[currentQuestionIndex] = scoreToUpdate;

  //           setQuestionScores(newQuestionScores);

  //           if (currentQuestion.id === 10) {
  //             // setTaken(true);
  //           }

  //           localStorage.setItem(
  //             "currentQuestionIndex",
  //             String(newQuestionIndex)
  //           );
  //         }
  //       });
  //   if (currentQuestionIndex < questions.length - 1) {
  //     const newQuestionIndex = currentQuestionIndex + 1;
  //     setCurrentQuestionIndex(newQuestionIndex);

  //   } else {
  //     setTaken(true);
  //   }
  // };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      const newQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newQuestionIndex);
      localStorage.setItem("currentQuestionIndex", String(newQuestionIndex));
    }
  };

  const handleOptionSelect = (option) => {
    const newSelectedOptions = [...selectedOptions];
    const newQuestionScores = [...questionScores];

    const currentQuestion = questions[currentQuestionIndex];
    const questionIndex = currentQuestion.id - 1;

    newSelectedOptions[questionIndex] = option;

    if (option.startsWith(currentQuestion.correctOption)) {
      newQuestionScores[questionIndex] = 10;
    } else {
      newQuestionScores[questionIndex] = -10;
    }

    setSelectedOptions(newSelectedOptions);
    setQuestionScores(newQuestionScores);
  };

  const toLogin = () => {
    const payload = {
      yourKeyHere: true,
      myEmail: globalState.email,
    };
    let updateEndpoint =
      "http://localhost:2000/student_account/update_admission_state";
    axios
      .post(updateEndpoint, payload)
      .then((response) => {
        if (response.data.status) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          // console.log(response.data.newResult);
          localStorage.taken = response.data.newResult;
          navigate("/student_login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };






  // const finishedByForce = () => {
  //   if (localStorage.done && !isSubmissionTriggered) {
  //     setIsSubmissionTriggered(true);

  //     const nonNegativeScores = questionScores.map((score) =>
  //       Math.max(score, 0)
  //     );

  //     const totalNonNegativeScore = nonNegativeScores.reduce(
  //       (total, score) => total + score,
  //       0
  //     );
  //     submit(totalNonNegativeScore);
  //   }
  // };

  // setTimeout(() => {
  //   finishedByForce();
  // }, 10000);






  // const finishedByForce = () => {
  //   if (localStorage.done) {
  //     const nonNegativeScores = questionScores.map((score) =>
  //       Math.max(score, 0)
  //     );

  //     const totalNonNegativeScore = nonNegativeScores.reduce(
  //       (total, score) => total + score,
  //       0
  //     );
  //     submit(totalNonNegativeScore);
  //   }
  // };

  // Delay the execution of finishedByForce by 10 seconds
  // setTimeout(() => {
  //   if (!isSubmissionTriggered && localStorage.done) {
  //     setIsSubmissionTriggered(true);
  //     finishedByForce();
  //   }
  // }, 10000);


  // const finishedByForce = () => {
  //   if (localStorage.done) {
      
  //     // const nonNegativeScores = questionScores.map((score) =>
  //     //   Math.max(score, 0)
  //     // );

  //     // const totalNonNegativeScore = nonNegativeScores.reduce(
  //     //   (total, score) => total + score,
  //     //   0
  //     // );
  //     // submit(totalNonNegativeScore);
  //     // toLogin();
  //   }
  // };



  // const finishedByForce = () => {
  //   if (localStorage.done) {
  //     const nonNegativeScores = questionScores.map((score) =>
  //       Math.max(score, 0)
  //     );

  //     const totalNonNegativeScore = nonNegativeScores.reduce(
  //       (total, score) => total + score,
  //       0
  //     );
  //     submit(totalNonNegativeScore);
  //     // toLogin();
  //   }
  // };

  // setTimeout(() => {
  //   if (localStorage.done) {
  //     const nonNegativeScores = questionScores.map((score) =>
  //       Math.max(score, 0)
  //     );

  //     const totalNonNegativeScore = nonNegativeScores.reduce(
  //       (total, score) => total + score,
  //       0
  //     );
  //     // submit(totalNonNegativeScore);
  //   } else {
  //     return null
  //   }
  // }, 10000);



 
  // const finishedByForce = () => {
  //   if (localStorage.done) {
  //     submit(totalNonNegativeScore);
  //     toLogin();
  //   }
  // };
  // finishedByForce();

  const startExam = () => {
    Swal.fire({
      title: "Start Exam?",
      text: "You will have a limited time to complete all 10 questions. Make sure you're prepared before beginning.",
      showCancelButton: true,
      confirmButtonText: "Start Exam",
      cancelButtonText: "Cancel",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setBeginExam(true);
        localStorage.setItem("examStarted", "true");

        const countdownTime = 20; // 5 minutes in seconds
        localStorage.setItem("countdownStartTime", Date.now());
        localStorage.setItem("countdownTimeRemaining", countdownTime);

        startCountdown();
      }
    });
  };

  return (
    <>
      {!beginExam && !localStorage.examStarted ? (
        <div className="w-100 pb-4" style={{ width: "100%" }}>
          <div className="w-50 mx-auto text-container2">
            <div className="d-flex justify-content-center mt-5 mb-3">
              <span className="fs-4">Hello, </span>{" "}
              <div className="fw-bold fs-4">
                {globalState.firstName} {globalState.lastName}{" "}
                {globalState.takenExam}
              </div>
            </div>
            <div className="exam-instructions">
              <h2 className="text-center mb-3">Exam Instructions:</h2>
              <p>
                You are about to take a timed exam consisting of 10
                multiple-choice questions. You will have 5 minutes to complete
                the entire exam. Please read the instructions carefully before
                starting the exam:
              </p>
              <ol>
                <li>
                  The exam comprises 10 questions, each with multiple-choice
                  options.
                </li>
                <li>You must select one correct option for each question.</li>
                <li>
                  You can change your selected option for a question before
                  submitting the exam.
                </li>
                <li>
                  Make sure to read each question and all the options before
                  making a selection.
                </li>
                <li>
                  The exam is timed, and you have 5 minutes to complete it. The
                  timer will start when you begin the exam.
                </li>
                <li>
                  You can see your remaining time on the top-left corner of the
                  screen.
                </li>
                <li>
                  After answering all 10 questions or when the timer runs out,
                  the exam will be automatically submitted.
                </li>
                <li>
                  Do not refresh the page or leave the exam screen during the
                  test, as it may result in submission.
                </li>
                <li>Good luck! Start the exam when you are ready.</li>
              </ol>
              <p>
                Please note that your responses will be recorded and evaluated
                once the exam is completed or the time limit is reached.
                Remember, managing your time efficiently is essential to
                complete all the questions within the given timeframe.
              </p>
              <div className="start-exam-div">
                <button
                  className="start-exam-btn btn btn-sm btn-success d-flex px-3 mx-auto"
                  onClick={startExam}
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 h-100">
          <div className="w-75 question-container shadow mx-auto d-flex flex-column justify-content-center p-4 mt-5">
            <div className="d-flex gap-2 justify-content-center position-relative">
              {taken ? (
                <span className="fs-4">Thank You: </span>
              ) : (
                <>
                  <div
                    className={`fs-4 position-absolute start-0 ${
                      countdown.minutes === 0 && countdown.seconds <= 30
                        ? "text-danger blinking"
                        : countdown.minutes === 0 && countdown.seconds <= 59
                        ? "text-danger"
                        : "text-dark"
                    }`}
                  >
                    {countdown.minutes}:{countdown.seconds}
                  </div>
                  <span className="fs-4"> Welcome: </span>
                </>
              )}
              <div className="fw-bold fs-4">
                {globalState.firstName} {globalState.lastName}{" "}
                {globalState.takenExam}
              </div>
            </div>
            {currentQuestion && (
              <div className="div text-center">
                {currentQuestion.id === 10 || localStorage.done ? (
                  <div className="mt-4">
                    <div className="mb-5">
                      Congratulations for successfully participating in our
                      entrance examination! We commend your efforts and wish you
                      the best of luck on your educational journey. To view your
                      results, kindly click the "Finish" button below, and your
                      scores will be promptly sent to your email.
                    </div>
                    <button
                      className="btn btn-success btn-sm px-5 py-2"
                      onClick={toLogin}
                    >
                      Finish
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="my-3">Question {currentQuestion.id}</h1>
                    <p className="my-3">{currentQuestion.content}</p>
                    <ul className="d-flex flex-column mx-auto mb-5 question-ul">
                      {currentQuestion.options.map((option, index) => (
                        <label
                          key={index}
                          className="d-flex mx-auto"
                          style={{ cursor: "pointer", width: "50%" }}
                        >
                          <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={
                              selectedOptions[currentQuestionIndex] === option
                            }
                            onChange={() => handleOptionSelect(option)}
                            className="select-radio"
                            style={{
                              height: "unset",
                              width: "unset",
                              verticalAlign: "unset",
                              float: "unset",
                              marginRight: "10px",
                            }}
                          />
                          {option}
                        </label>
                      ))}
                    </ul>
                    <div className="d-flex gap-3 justify-content-center my-4">
                      <button
                        className="btn btn-primary btn-sm px-3"
                        onClick={handlePreviousClick}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-primary btn-sm px-3"
                        onClick={handleNextClick}
                      >
                        Next
                      </button>
                      {/* <button
                      className="btn btn-primary btn-sm px-3"
                      onClick={handleNextClick}
                    >
                      {currentQuestion.id === 10 ? "Submit" : "Next"}
                    </button> */}
                    </div>
                    <p>Score: {questionScores[currentQuestionIndex]}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Test;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { newStudent, takenExam } from "../../redux/portalSlice";

// const Test = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
//     Number(localStorage.getItem("currentQuestionIndex")) || 0
//   );
//   const [selectedOption, setSelectedOption] = useState("");
//   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
//   const [scores, setScores] = useState(0);
//   const [clicked, setClicked] = useState(false);
//   const [taken, setTaken] = useState(false);

//   const [selectedOptions, setSelectedOptions] = useState(
//     Array(questions.length).fill("")
//   );
//   const [questionScores, setQuestionScores] = useState(
//     Array(questions.length).fill(0)
//   );

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const globalState = useSelector((state) => state.portalReducer.studentInfo);
//   const examState = useSelector((state) => state.portalReducer.taken);

//   useEffect(() => {
//     let studentLoginToken = localStorage.studentLoginToken;
//     let endpoint =
//       "https://school-portal-backend-adex2210.vercel.app/student_account/student__admission_dashboard";
//     axios
//       .get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${studentLoginToken}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       })
//       .then((res) => {
//         if (res.data.status) {

//           dispatch(newStudent(res.data.response));
//           // console.log(res.data.message);
//         } else {
//           console.log(res.data.message);
//           console.log(res.data.status);
//           navigate("/student_login");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // alert(globalState.takenExam)
//   }, [globalState]);

//   useEffect(() => {
//     let endpoint =
//       "https://school-portal-backend-adex2210.vercel.app/staff_account/questions";
//     axios.get(endpoint).then((response) => {
//       setQuestions(response.data);
//       if (localStorage.getItem("currentQuestionIndex") === null) {
//         localStorage.setItem(
//           "currentQuestionIndex",
//           String(currentQuestionIndex)
//         );
//       }
//     });
//   }, []);

//   // http://localhost:2000

//   let myEmail = globalState.email;
//   const handleNextClick = (takenValue) => {
//     if (currentQuestionIndex < questions.length - 1) {
//       let endpoint2 =
//         "https://school-portal-backend-adex2210.vercel.app/student_account/update_my_admission_exam_score";
//       axios.post(endpoint2, { score: questionScores[currentQuestionIndex], myEmail }).then((response) => {
//         if (response.data.status) {
//           console.log(response.data.message);
//           // setCurrentQuestionIndex(currentQuestionIndex + 1);
//           const newQuestionIndex = currentQuestionIndex + 1;
//           setCurrentQuestionIndex(newQuestionIndex);

//           const totalScore = questionScores.reduce(
//             (acc, score) => acc + score,
//             0
//           );
//           setScores(totalScore);
//           localStorage.setItem(
//             "currentQuestionIndex",
//             String(newQuestionIndex)
//           );
//           setSelectedOption("");
//           setShowCorrectAnswer(false);
//           setClicked(false);
//           setScores(0);
//         } else {
//         }
//       });
//     } else {
//       if (currentQuestion.id === 10) {
//         setTaken(true);
//       }
//     }
//   };

//   const handlePreviousClick = () => {
//     if (currentQuestionIndex > 0) {
//       const newQuestionIndex = currentQuestionIndex - 1;
//       setCurrentQuestionIndex(newQuestionIndex);
//       localStorage.setItem("currentQuestionIndex", String(newQuestionIndex));
//       setSelectedOption(selectedOptions[newQuestionIndex]);
//       setShowCorrectAnswer(false);

//       // Calculate the total score based on updated questionScores array
//       const totalScore = questionScores.reduce(
//         (acc, score, index) => (index <= newQuestionIndex ? acc + score : acc),
//         0
//       );
//       setScores(totalScore);
//     }
//     // if (currentQuestionIndex > 0) {
//     //   const newQuestionIndex = currentQuestionIndex - 1;
//     //   setCurrentQuestionIndex(newQuestionIndex);
//     //   localStorage.setItem("currentQuestionIndex", String(newQuestionIndex));
//     //   setSelectedOption("");
//     //   setShowCorrectAnswer(false);
//     //   setClicked(false);
//     //   setScores(0);
//     // }
//   };

//   const handleOptionSelect = (option) => {
//     const newSelectedOptions = [...selectedOptions];
//     const newQuestionScores = [...questionScores];

//     const currentQuestion = questions[currentQuestionIndex];
//     const questionIndex = currentQuestion.id - 1;

//     newSelectedOptions[questionIndex] = option;

//     if (option.startsWith(currentQuestion.correctOption)) {
//       newQuestionScores[questionIndex] = 10;
//     } else {
//       newQuestionScores[questionIndex] = -10;
//     }

//     setSelectedOptions(newSelectedOptions);
//     setQuestionScores(newQuestionScores);
//     // setSelectedOption(option);
//     // setShowCorrectAnswer(true);
//     // if (option.startsWith(questions[currentQuestionIndex].correctOption)) {
//     //   if (!clicked) {
//     //     setClicked(true);
//     //     setScores(scores + 10);
//     //   }
//     // } else {
//     //   if (clicked) {
//     //     setClicked(false);
//     //     setScores(scores - 10);
//     //   }
//     // }
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   const toLogin = () => {
//     let myEmail = globalState.email;
//         const payload = {
//           yourKeyHere: true,
//           myEmail: myEmail,
//         };
//         let updateEndpoint =
//           "https://school-portal-backend-adex2210.vercel.app/student_account/update_admission_state";
//         axios.post(updateEndpoint, payload)
//         .then((response) => {
//           if (response.data.status) {
//             localStorage.taken = response.data.response;
//             // dispatch();
//             navigate("/student_login");
//           }
//         });
//   };

//   return (
//     <>
//       <div className="w-100 h-100">
//         <div className="w-75 shadow mx-auto d-flex flex-column justify-content-center p-4 mt-5">
//           <div className="text-center d-flex gap-2 justify-content-center">
//             <span className="fs-4">Welcome: </span>{" "}
//             <div className="fw-bold fs-4">
//               {" "}
//               {globalState.firstName} {globalState.lastName}{" "}
//               {globalState.takenExam}
//             </div>
//           </div>
//           {currentQuestion && (
//             <div className="div text-center">
//               {currentQuestion.id === 10 && taken  ? (
//                 <div>
//                   <div>Hello</div>
//                   <button onClick={toLogin}>Finish</button>
//                 </div>
//               ) : (
//                 <>
//                   <h1 className="my-3">Question {currentQuestion.id}</h1>
//                   <p className="my-3">{currentQuestion.content}</p>
//                   <ul className="d-flex flex-column mx-auto mb-5">
//                     {currentQuestion.options.map((option, index) => (
//                       <label
//                         key={index}
//                         className="d-flex align-items-center  mx-auto"
//                         style={{ cursor: "pointer" }}
//                       >
//                         <input
//                           type="radio"
//                           name="option"
//                           value={option}
//                           checked={selectedOption === option}
//                           onChange={() => handleOptionSelect(option)}
//                           className="select-radio"
//                           style={{
//                             height: "unset",
//                             width: "unset",
//                             verticalAlign: "unset",
//                             float: "unset",
//                             marginRight: "10px",
//                           }}
//                         />
//                         {option}
//                       </label>
//                     ))}
//                   </ul>
//                   <div className="d-flex gap-3 justify-content-center my-4">
//                     <button
//                       className=" btn btn-primary btn-sm px-3"
//                       onClick={handlePreviousClick}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       className=" btn btn-primary btn-sm px-3"
//                       onClick={handleNextClick}
//                     >
//                       {currentQuestion.id === 10 ? "Submit" : "Next"}
//                     </button>
//                   </div>
//                   <p>Score: {questionScores[currentQuestionIndex]}</p>
//                   {/* <p>Score: {scores}</p> */}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Test;
