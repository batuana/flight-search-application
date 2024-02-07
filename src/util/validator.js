import { toast } from "react-toastify";

export function validateAllInputs(toastId, inputs, setInputs) {
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

export function validateDestination(
  inputIdentifier,
  destinations,
  setInputs,
  value
) {
  setInputs((curInputs) => ({
    ...curInputs,
    [inputIdentifier]: {
      ...curInputs[inputIdentifier],
      isValid: destinations.includes(value) ? true : false,
    },
  }));
}
