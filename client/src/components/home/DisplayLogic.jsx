import { useState, useEffect } from "react";
import axios from "axios";
import { useSelectedDate } from "../../context/SelectedDateContext";

const calendarDisplayLogic = () => {
  const {
    dayHeaderRow,
    dateHeaderRow,
    selectedDate,
    setSelectedDate,
    occupiedBy,
    numberOfClassrooms,
    daysToShow,
  } = useSelectedDate();

  //==========================================
  // Fetching COHORT from api and setting to state
  const [cohortState, setCohortState] = useState([]);
  const fetchCohort = async () => {
    try {
      const { data: response } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/cohorts`
      );
      if (response) {
        setCohortState(response);
        // console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCohort();
  }, []);

  // //==========================================
  // // Logic for creating empty array (to be appended later) then mapped onto table
  // //Default is 6 classrooms, change code above if needed
  // const occupiedBy = [];
  // for (let i = 0; i < numberOfClassrooms; i++) {
  //   occupiedBy.push([]);
  //   for (let j = 0; j < daysToShow; j++) {
  //     occupiedBy[i].push("");
  //   }
  // }
  // // console.log("OCC BY", occupiedBy)
  // // occupiedBy = Array of 6 arrays(representing 6 classrooms),
  // // within each of the 6 arrays, there are 7 empty strings,
  // // (representing 7 empty days) to be filled later in logic

  //=============================//
  //MAIN LOGIC FOR DISPLAY BELOW //
  //=============================//

  //Actual looping through the whole list of cohorts (stored in cohortState)
  for (let i = 0; i < cohortState.length; i++) {
    let currDate = "";
    let currCohortStartDate = "";
    let currCohortEndDate = "";

    let saturdays = [];
    let evenSaturdays = [];
    let oddSaturdays = [];
    //for "7" times, with each time,
    // selectedDate = selectedDate + 1
    for (let j = 0; j < daysToShow; j++) {
      currDate = new Date(selectedDate);
      currDate.setDate(currDate.getDate() + j);
      currDate = new Date(currDate);
      console.log("cDate", currDate);
      currCohortStartDate = new Date(cohortState[i].startDate);
      // console.log("CCStartDate", currCohortStartDate)
      currCohortEndDate = new Date(cohortState[i].endDate);

      //TEST TO SEE IF new Date can be compared
      // if (currDate > currCohortEndDate) {
      //   console.log("OVER" + currDate + " is bigger than "+ currCohortEndDate);
      // } else if (currDate <= currCohortEndDate) {
      //   console.log("NOT OVER");
      // } else {
      //   console.log("ERROR");
      // }

      // Check whether currentDate falls between startDate and endDate,
      //If yes, cell should display the current class/cohort
      //(i.e if cell matches correct Day the cohort is present at class)

      if (currCohortStartDate <= currDate && currCohortEndDate >= currDate) {
        switch (dayHeaderRow[j]) {
          case "Mon":
            if (
              //if cell === Monday (matching day) and currently empty (no conflict with other classes), cell = cohort/class
              cohortState[i].daysOnCampus.monday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].daysOnCampus.monday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" + occupiedBy[cohortState[i].classRoom - 1][j] + "/";
              cohortState[i].courseCode;
            }
            break;
          //if cell === Tuesday (matching day) and currently empty (no conflict with other classes), cell = cohort/class
          case "Tue":
            if (
              cohortState[i].daysOnCampus.tuesday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].daysOnCampus.tuesday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" + occupiedBy[cohortState[i].classRoom - 1][j] + "/";
              cohortState[i].courseCode;
            }
            break;

          case "Wed":
            if (
              cohortState[i].daysOnCampus.wednesday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].daysOnCampus.wednesday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" +
                occupiedBy[cohortState[i].classRoom - 1][j] +
                "/" +
                cohortState[i].courseCode;
            }
            break;

          case "Thu":
            if (
              cohortState[i].daysOnCampus.thursday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].daysOnCampus.thursday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" +
                occupiedBy[cohortState[i].classRoom - 1][j] +
                "/" +
                cohortState[i].courseCode;
            }
            break;

          case "Fri":
            if (
              cohortState[i].daysOnCampus.friday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].daysOnCampus.friday === true &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" +
                occupiedBy[cohortState[i].classRoom - 1][j] +
                "/" +
                cohortState[i].courseCode;
            }
            break;

          case "Sat":
            //======================
            // Saturday's Overall Logic
            // (cases: Saturdays === "none","odd","even","all")
            //=====================
            //Function for finding all the Saturdays for the current Cohort/Class, and pushing into Sat array (does not take into account odd/even/Sat)
            //e.g. saturdayArray = ["24-Dec(Sat)","31-Dec(Sat)",...,"28-Feb(Sat)"]
            const findSaturdays = (startingDate, endingDate) => {
              startingDate = new Date(startingDate);
              let currentDate = new Date(startingDate);
              endingDate = new Date(endingDate);
              while (currentDate <= endingDate) {
                if (currentDate.getDay() === 6) {
                  saturdays.push(new Date(currentDate));
                }
                currentDate.setDate(currentDate.getDate() + 1);
              }
            };
            findSaturdays(cohortState[i].startDate, cohortState[i].endDate);
            console.log("SATs", saturdays);
            //Pushing all Saturdays of current class/cohort into 2 arrays, evenSaturdays & oddSaturdays
            for (let n = 0; n < saturdays.length; n++) {
              if ((n + 1) % 2 === 0) {
                evenSaturdays.push(saturdays[n].getDate());
              } else {
                oddSaturdays.push(saturdays[n].getDate());
              }
            }
            //generating an array with just the day integer, e.h. [21,22,23,24,25,26,27]
            let weekDateCompareArray = [];
            for (let d = 0; d < dateHeaderRow.length; d++) {
              weekDateCompareArray.push(new Date(dateHeaderRow[d]).getDate());
            }
            //=====================
            //IF statements to determine whether the current Saturday needs to display class/cohort
            if (
              //If odd saturdays and current date display range has intersect with oddSaturday array, display class/cohort
              cohortState[i].altSaturdays === "odd" &&
              weekDateCompareArray.filter((value) =>
                oddSaturdays.includes(value)
              ).length !== 0 &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].altSaturdays === "odd" &&
              weekDateCompareArray.filter((value) =>
                oddSaturdays.includes(value)
              ).length !== 0 &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" +
                occupiedBy[cohortState[i].classRoom - 1][j] +
                "/" +
                cohortState[i].courseCode;
            }

            if (
              //If even saturdays and current date display range has intersect with evenSaturday array, display class/cohort
              cohortState[i].altSaturdays === "even" &&
              weekDateCompareArray.filter((value) =>
                evenSaturdays.includes(value)
              ).length !== 0 &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].altSaturdays === "even" &&
              weekDateCompareArray.filter((value) =>
                evenSaturdays.includes(value)
              ).length !== 0 &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" +
                occupiedBy[cohortState[i].classRoom - 1][j] +
                "/" +
                cohortState[i].courseCode;
            }

            if (
              //If all saturdays, and classroom currently empty, display class/cohort
              cohortState[i].altSaturdays === "all" &&
              occupiedBy[cohortState[i].classRoom - 1][j] === ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                cohortState[i].courseCode;
            } else if (
              cohortState[i].altSaturdays === "all" &&
              occupiedBy[cohortState[i].classRoom - 1][j] !== ""
            ) {
              occupiedBy[cohortState[i].classRoom - 1][j] =
                "*" +
                occupiedBy[cohortState[i].classRoom - 1][j] +
                "/" +
                cohortState[i].courseCode;
            }
            break;
        }
      }
    }
  }
  //Logic for Sundays highest priority apart from Holidays)
  for (let m = 0; m < numberOfClassrooms; m++) {
    for (let p = 0; p < dayHeaderRow.length; p++) {
      if (dayHeaderRow[p] === "Sun") {
        occupiedBy[m][p] = "SUN";
      }
    }
  }

  console.log("OCCBy", occupiedBy);
  return cohortState;
};
export default calendarDisplayLogic;
