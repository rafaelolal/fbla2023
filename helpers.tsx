import axios from "axios";
import { toast } from "react-toastify";

export async function isAdmin(id: string) {
  const result = await axios
    .get(`http://127.0.0.1:8000/api/admin/${id}/`)
    .then((response) => {
      return Boolean(response.data.pk);
    })
    .catch((error) => {
      return false;
    });

  return result;
}

export function toFormattedDatetime(datetime: string) {
  return new Date(datetime).toLocaleString(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toFormattedTime(datetime: string) {
  return new Date(datetime).toLocaleString(undefined, {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatStartAndFinish(startsOn: string, finishesOn: string) {
  return `${toFormattedDatetime(startsOn)} - ${toFormattedTime(finishesOn)}`;
}
