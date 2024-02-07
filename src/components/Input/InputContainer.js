import { useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchInput from "./SearchInput";
import ImageButton from "../UI/ImageButton";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import TextButton from "../UI/TextButton";

import { getAllFlights } from "../../util/http";
import { getFormattedDate } from "../../util/date";
import { calculateArrivalTime } from "../../util/date";
import { formatTime } from "../../util/date";
import { validateAllInputs } from "../../util/validator";
import { validateDestination } from "../../util/validator";

import TransferImage from "../../assets/transfer.png";

let allFlights = [];

export default function InputContainer({
  destinations,
  setIsLoading,
  setInfoMessage,
  setResultingFlights,
}) {
  const [inputs, setInputs] = useState({
    departureAirport: {
      value: "",
      isValid: true,
    },
    arrivalAirport: {
      value: "",
      isValid: true,
    },
    departureDate: {
      value: new Date(),
      isValid: true,
    },
    arrivalDate: {
      value: new Date(),
      isValid: true,
    },
    flightType: "round-trip",
  });
  const toastId = useRef(null);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]:
        inputIdentifier === "flightType"
          ? enteredValue
          : {
              ...curInputs[inputIdentifier],
              value: enteredValue,
            },
    }));
  }

  function transferDestinations() {
    setInputs((curInputs) => ({
      ...curInputs,
      departureAirport: {
        ...curInputs.arrivalAirport,
      },
      arrivalAirport: {
        ...curInputs.departureAirport,
      },
    }));
  }

  async function getFlights() {
    setInfoMessage("");
    const inputsAreValid = validateAllInputs(toastId, inputs, setInputs);
    if (inputsAreValid && !allFlights.length) {
      setIsLoading(true);
      allFlights = await getAllFlights();
      allFlights = allFlights.map((flight) => ({
        ...flight,
        departure_time: formatTime(flight["departure_time"]),
        arrival_time: calculateArrivalTime(
          flight["departure_time"],
          flight["duration"]
        ),
      }));
    }
    if (inputsAreValid && allFlights.length) {
      let resultingData = allFlights.filter(
        (flight) =>
          flight["departure_airport"] === inputs.departureAirport.value &&
          flight["arrival_airport"] === inputs.arrivalAirport.value &&
          flight["departure_date"] ===
            getFormattedDate(inputs.departureDate.value)
      );

      if (resultingData.length === 0) {
        resultingData = allFlights.filter(
          (flight) =>
            flight["departure_airport"] === inputs.departureAirport.value &&
            flight["arrival_airport"] === inputs.arrivalAirport.value
        );
        setInfoMessage("No flights found, showing similar results...");
      }

      setResultingFlights(resultingData);
    }
    setIsLoading(false);
  }

  return (
    <div className="form">
      <div>
        <div className="form-row">
          <RadioInput
            name="flight-type"
            id="round-trip"
            label="ROUND TRIP"
            value={inputs.flightType}
            setValue={inputChangedHandler.bind(this, "flightType")}
          />
          <RadioInput
            name="flight-type"
            id="one-way"
            label="ONE WAY"
            value={inputs.flightType}
            setValue={inputChangedHandler.bind(this, "flightType")}
          />
        </div>
        <div className="form-row">
          <SearchInput
            label="From"
            data={destinations}
            value={inputs.departureAirport.value}
            setValue={inputChangedHandler.bind(this, "departureAirport")}
            isValid={inputs.departureAirport.isValid}
            validate={validateDestination.bind(
              this,
              "departureAirport",
              destinations,
              setInputs
            )}
          />
          <ImageButton
            style={{ marginLeft: "5px", marginRight: "5px" }}
            img={TransferImage}
            altText="Transfer button icon"
            handleOnClick={transferDestinations}
          />
          <SearchInput
            style={{ marginRight: "25px" }}
            label="To"
            data={destinations}
            value={inputs.arrivalAirport.value}
            setValue={inputChangedHandler.bind(this, "arrivalAirport")}
            isValid={inputs.arrivalAirport.isValid}
            validate={validateDestination.bind(
              this,
              "arrivalAirport",
              destinations,
              setInputs
            )}
          />
          <DateInput
            style={{ marginRight: "25px" }}
            label="Departing"
            value={inputs.departureDate.value}
            setValue={inputChangedHandler.bind(this, "departureDate")}
            isValid={inputs.departureDate.isValid}
          />
          <DateInput
            style={{ marginRight: "25px" }}
            label="Returning"
            value={inputs.arrivalDate.value}
            setValue={inputChangedHandler.bind(this, "arrivalDate")}
            enabled={inputs.flightType === "round-trip" ? true : false}
            isValid={inputs.arrivalDate.isValid}
          />
          <TextButton text="SEARCH" handleOnClick={getFlights} />
        </div>
      </div>
      <ToastContainer limit={5} />
    </div>
  );
}
