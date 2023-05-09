import React from "react";
import CalculateTotalNumber from "./CalculateTotalNumber";

const BgImageInner3 = ({ bg3_styles }) => {
  return (
    <>
      <div className="bg-image3-main center-div" style={bg3_styles}>
        <div className="bg-image3-container center-div2 d-flex col-lg-10 justify-content-between">
          <CalculateTotalNumber
            classes="each-calculate-to-number"
            innerText="teachers"
            styles={{ backgroundColor: "#74CEE4" }}
            text="54"
          ></CalculateTotalNumber>
          <CalculateTotalNumber
            classes="each-calculate-to-number"
            innerText="courses"
            styles={{ backgroundColor: "#6fc191" }}
            text="32"
          ></CalculateTotalNumber>
          <CalculateTotalNumber
            classes="each-calculate-to-number"
            innerText="students"
            styles={{ backgroundColor: "#edbf47" }}
            text="78"
          ></CalculateTotalNumber>
          <CalculateTotalNumber
            classes="each-calculate-to-number"
            innerText="activities"
            styles={{ backgroundColor: "#AC7AB5" }}
            text="45"
          ></CalculateTotalNumber>
        </div>
      </div>
    </>
  );
};

export default BgImageInner3;