import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchInput from "./SearchInput";
import ImageButton from "../UI/ImageButton";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import TextButton from "../UI/TextButton";

import TransferImage from "../../assets/transfer.png";
import { getAllFlights } from "../../util/http";
import { getFormattedDate } from "../../util/date";
import { calculateArrivalTime } from "../../util/date";
import { formatTime } from "../../util/date";

let allFlights = [];

export default function InputContainer({
  destinations,
  setIsLoading,
  setErrorMessage,
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

  function validateAllInputs() {
    console.log("Here");
    let textInputsAreValid = true;
    let dateInputsAreValid = true;

    if (!toastId.current) toast.dismiss(toastId.current);

    if (!inputs.departureAirport.isValid || !inputs.arrivalAirport.isValid)
      textInputsAreValid = false;

    if (inputs.departureAirport.value === "") {
      setInputs((curInputs) => ({
        ...curInputs,
        departureAirport: {
          ...curInputs.departureAirport,
          isValid: false,
        },
      }));
      textInputsAreValid = false;
    }

    if (inputs.arrivalAirport.value === "") {
      setInputs((curInputs) => ({
        ...curInputs,
        arrivalAirport: {
          ...curInputs.arrivalAirport,
          isValid: false,
        },
      }));
      textInputsAreValid = false;
    }

    if (inputs.flightType !== "one-way") {
      if (
        inputs.departureDate.value.toDateString() ===
        inputs.arrivalDate.value.toDateString()
      ) {
        setInputs((curInputs) => ({
          ...curInputs,
          departureDate: {
            ...curInputs.departureDate,
            isValid: false,
          },
          arrivalDate: {
            ...curInputs.arrivalDate,
            isValid: false,
          },
        }));
        console.log("Here");

        const toastId = toast.error("Date fields can not be the same.", {
          style: {
            fontSize: "1.5rem",
          },
        });

        dateInputsAreValid = false;
      }

      if (inputs.departureDate.value > inputs.arrivalDate.value) {
        setInputs((curInputs) => ({
          ...curInputs,
          departureDate: {
            ...curInputs.departureDate,
            isValid: false,
          },
          arrivalDate: {
            ...curInputs.arrivalDate,
            isValid: false,
          },
        }));

        const toastId = toast.error(
          "Departure date can't be earlier than arrival date.",
          {
            style: {
              fontSize: "1.5rem",
            },
          }
        );

        dateInputsAreValid = false;
      }
    }

    if (dateInputsAreValid) {
      setInputs((curInputs) => ({
        ...curInputs,
        departureDate: {
          ...curInputs.departureDate,
          isValid: true,
        },
        arrivalDate: {
          ...curInputs.arrivalDate,
          isValid: true,
        },
      }));
    }

    return textInputsAreValid && dateInputsAreValid;
  }

  function validateDestination(inputIdentifier, value) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: {
        ...curInputs[inputIdentifier],
        isValid: destinations.includes(value) ? true : false,
      },
    }));
  }

  async function getFlights() {
    setErrorMessage("");
    const inputsAreValid = validateAllInputs();
    if (inputsAreValid && !allFlights.length) {
      setIsLoading(true);
      allFlights = await getAllFlights();

      console.log(allFlights);

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
      console.log("calculating resulting data");
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
        setErrorMessage("No flights found, showing similar results...");
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
            validate={validateDestination.bind(this, "departureAirport")}
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
            validate={validateDestination.bind(this, "arrivalAirport")}
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
