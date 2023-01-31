import { useState, useEffect } from "react";
import axios from "axios";

const calendarDisplayLogic = () => {
  const [cohortState, setCohortState] = useState([]);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_BASE_URL}/api/cohorts`)
  //     .then((response) => response.json())
  //     .then((data) => setCohortState(data));
  // }, []);


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

  return cohortState;
};

export default calendarDisplayLogic;
// 