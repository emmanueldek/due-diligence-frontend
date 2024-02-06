export const formatDateString = (inputDate: string) => {
  const dateObject = new Date(inputDate);
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const year = dateObject.getFullYear();
  return `${month}/${day}/${year}`;
};

export const formatDateDifference = (isoDate: string): string => {
  const now = new Date();
  const date = new Date(isoDate);

  const timeDifference = now.getTime() - date.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} ${secondsDifference === 1 ? "second" : "seconds"} ago`;
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    const days = Math.floor(secondsDifference / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};
