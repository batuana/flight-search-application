import CIcon from "@coreui/icons-react";
import { cilFlightTakeoff } from "@coreui/icons";

import PaperAirplaneImage from "../../assets/paper-airplane.jpg";

import { reformatMinutes } from "../../util/date";

export default function Flight({ flightData }) {
  return (
    <div className="ticket">
      <header className="ticket-header">
        <CIcon icon={cilFlightTakeoff} className="ticket-header-icon" />
        <h3 className="ticket-header-text">AIR FLIGHT</h3>
      </header>
      <main className="ticket-body">
        <p className="airline">{flightData.airline}</p>
        <div className="destinations">
          <span className="destination">
            {flightData["departure_airport"].split(" ")[1]}
          </span>
          <img
            className="destination-image"
            src={PaperAirplaneImage}
            alt="Paper airplane going to its destination"
          />
          <span className="destination">
            {flightData["arrival_airport"].split(" ").at(-1)}
          </span>
        </div>
      </main>
      <footer className="ticket-information">
        <div className="information-column">
          <h3>DEPARTURE</h3>
          <div className="information-subcontainer">
            <span>{flightData["departure_time"]}</span>
            <span>{flightData["departure_date"]}</span>
          </div>
        </div>
        <div className="information-column">
          <h3>FROM</h3>
          <span>{flightData["departure_airport"]}</span>
        </div>
        <div className="information-column">
          <h3>TO</h3>
          <span>{flightData["arrival_airport"]}</span>
        </div>
        <div className="information-column">
          <h3>ARRIVAL</h3>
          <div className="information-subcontainer">
            <span>{flightData["arrival_time"]}</span>
            <span>({reformatMinutes(flightData.duration)})</span>
          </div>
        </div>
        <div className="price-container">
          <span>${flightData.price}</span>
        </div>
      </footer>
    </div>
  );
}
