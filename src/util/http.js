import axios from "axios";
import { toast } from "react-toastify";

const API_KEY = "3db75d70";
const BACKEND_URL = `https://my.api.mockaroo.com/flights.json?key=${API_KEY}`;

const toasterStyle = {
  fontSize: "1.5rem",
};

export async function getAllFlights() {
  try {
    const response = await axios.get(BACKEND_URL);
    if (response.status >= 400) {
      toast.error("Couldn't get data.", {
        style: toasterStyle,
      });
      throw new Error("server error");
    } else if (response.data.length === 0) {
      toast.error("No data found", {
        style: toasterStyle,
      });
      throw new Error("No data found.");
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
}
