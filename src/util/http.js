import axios from "axios";
import { toast } from "react-toastify";

const API_KEY = "3db75d70";
const BACKEND_URL = `https://my.api.mockaroo.com/flights.json?key=${API_KEY}`;

export async function getAllFlights() {
  try {
    const response = await axios.get(BACKEND_URL);
    if (response.status >= 400) {
      const toastId = toast.error("Couldn't get data.", {
        style: {
          fontSize: "1.5rem",
        },
      });
      throw new Error("server error");
    }
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
}
