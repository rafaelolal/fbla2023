import axios from "axios";

export async function isAdmin(id: string) {
  const result = axios
    .get(`http://127.0.0.1:8000/api/admin/${id}/`)
    .then((response) => {
      return Boolean(response.data.pk);
    })
    .catch((error) => {
      if (error.request.status == 404) {
        return false;
      }
      throw error;
    });

  return result;
}

export function toFormattedDate(date: string) {
  return new Date(date).toLocaleString(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  });
}

export function toFormattedTime(datetime: string) {
  return new Date(datetime).toLocaleString(undefined, {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
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

export function formatStartAndFinish(startsOn: string, finishesOn: string) {
  return `${toFormattedDatetime(startsOn)} - ${toFormattedTime(finishesOn)}`;
}
export const questions = [
  {
    question: "Table common fight computer everybody",
    answer:
      "Ground attorney after daughter road risk artist. Environment speak idea. Drug reduce lot social dog as.",
    points: 0,
  },
  {
    question: "Particular speak step very without",
    answer:
      "Write sense could lose capital. Policy important west. Language affect place black investment she use.",
    points: 0,
  },
  {
    question: "Lay hour fear mission leave black common",
    answer:
      "Kid responsibility artist son view. At major bit imagine lead office reveal cost. Summer serious our local population politics he.",
    points: 0,
  },
  {
    question: "Probably street standard population record whether network",
    answer:
      "Benefit people usually and environment. Same life study appear stand financial week. Policy it by approach man.",
    points: 0,
  },
  {
    question: "Full role new part and try",
    answer:
      "Participant painting trouble safe. Fish boy stand send. Seem too hit compare and.",
    points: 0,
  },
  {
    question: "Son loss need manager agree player experience",
    answer:
      "Try smile capital they focus evidence continue especially. Kind already final animal fight. Lawyer mother possible do.",
    points: 0,
  },
  {
    question: "Room same there",
    answer:
      "Least central accept day such entire manager. Congress all capital building else identify. Get window popular.",
    points: 0,
  },
  {
    question: "Home happy bad",
    answer:
      "Learn still right laugh edge. Thank behavior hit order word activity. Certainly interview try single kitchen collection.",
    points: 0,
  },
  {
    question: "Bag TV avoid decision share main home",
    answer:
      "Really fall rather coach. Threat seek worry picture should take. Fine poor which office.",
    points: 0,
  },
  {
    question: "Organization recent institution beyond shake finally animal",
    answer:
      "More will appear that agent. Around point peace once cultural first second. Forward expect anyone hear north power.",
    points: 0,
  },
];
