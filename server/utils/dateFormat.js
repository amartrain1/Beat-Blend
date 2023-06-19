// const addDateSuffix = (date) => {
//   let dateStr = date.toString();

//   // get last char of date string
//   const lastChar = dateStr.charAt(dateStr.length - 1);

//   if (lastChar === "1" && dateStr !== "11") {
//     dateStr = `${dateStr}st`;
//   } else if (lastChar === "2" && dateStr !== "12") {
//     dateStr = `${dateStr}nd`;
//   } else if (lastChar === "3" && dateStr !== "13") {
//     dateStr = `${dateStr}rd`;
//   } else {
//     dateStr = `${dateStr}th`;
//   }

//   return dateStr;
// };

// function to format a timestamp, accepts the timestamp and an `options` object as parameters
module.exports = (
  timestamp,
  { dateSuffix = false } = {}
) => {
  // create month object
  const months = {
    0: "1",
    1: "2",
    2: "3",
    3: "4",
    4: "5",
    5: "6",
    6: "7",
    7: "8",
    8: "9",
    9: "10",
    10: "11",
    11: "12",
  };

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear().toString().slice(2)
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();

  // set `am` or `pm`
  const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";

  const formattedTimeStamp = `${formattedMonth}/${dayOfMonth}/${year} · ${hour}:${minutes}${periodOfDay}`;
  // 0/0/00 00:00pm
  return formattedTimeStamp;
};
