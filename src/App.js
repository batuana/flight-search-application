import { useState } from "react";

import { ThreeDots } from "react-loader-spinner";

import InputContainer from "./components/Input/InputContainer";
import FlightsList from "./components/FlightsOutput/FlightsList";

import { ALL_DESTINATIONS } from "./data/destinations";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [resultingFlights, setResultingFlights] = useState([]);

  return (
    <>
      <InputContainer
        destinations={ALL_DESTINATIONS}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setInfoMessage={setInfoMessage}
        setResultingFlights={setResultingFlights}
      />
      {isLoading ? (
        <div className="loader">
          <ThreeDots visible={true} height="250" width="250" color="#05a1fc" />
        </div>
      ) : (
        <FlightsList flightsData={resultingFlights} infoMessage={infoMessage} />
      )}
    </>
  );
}
