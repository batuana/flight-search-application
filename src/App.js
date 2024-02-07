import { useState } from "react";

import { ThreeDots } from "react-loader-spinner";

import InputContainer from "./components/Input/InputContainer";
import FlightsList from "./components/FlightsOutput/FlightsList";

const allDestinations = [
  "Istanbul (IST)",
  "New York (JFK)",
  "Los Angeles (LAX)",
  "Chicago (ORD)",
  "Atlanta (ATL)",
  "Dallas (DFW)",
  "San Francisco (SFO)",
  "Las Vegas (LAS)",
  "Miami (MIA)",
  "Boston (BOS)",
  "Phoenix (PHX)",
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resultingFlights, setResultingFlights] = useState([]);

  return (
    <>
      <InputContainer
        destinations={allDestinations}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        setResultingFlights={setResultingFlights}
      />
      {isLoading ? (
        <div className="loader">
          <ThreeDots visible={true} height="250" width="250" color="#05a1fc" />
        </div>
      ) : (
        <FlightsList data={resultingFlights} errorMsg={errorMessage} />
      )}
    </>
  );
}
