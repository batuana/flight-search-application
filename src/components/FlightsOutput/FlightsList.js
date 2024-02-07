import { useState } from "react";
import Flight from "./Flight";

import { reformatDate } from "../../util/date";

function sortCallback(identifier, a, b) {
  switch (identifier) {
    case "departure_date":
      return reformatDate(a[identifier]) - reformatDate(b[identifier]);

    case "departure_time":
      return a[identifier] > b[identifier] ? 1 : -1;

    case "arrival_time":
      return a[identifier] > b[identifier] ? 1 : -1;

    case "duration":
      return a[identifier] - b[identifier];

    case "price":
      return a[identifier] - b[identifier];
  }
}

export default function FlightsList({ data, errorMsg }) {
  const [orderBy, setOrderBy] = useState("departure_date");

  console.log("Here is incoming data");
  console.log(data);

  return (
    <>
      {data.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="flights-error">{errorMsg}</p>
          <div className="select-container">
            <label htmlFor="orderBy">Sort by</label>
            <select
              id="orderBy"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="departure_date" key="departure_date">
                Departure Date
              </option>
              <option value="departure_time" key="departure_time">
                Departure Time
              </option>
              <option value="arrival_time" key="arrival_time">
                Arrival Time
              </option>
              <option value="duration" key="duration">
                Duration
              </option>
              <option value="price" key="price">
                Price
              </option>
            </select>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="tickets-list">
          {data
            .slice()
            .sort((a, b) => sortCallback(orderBy, a, b))
            .map((flight) => (
              <Flight key={flight.id} flightData={flight} />
            ))}
        </div>
      )}
    </>
  );
}
