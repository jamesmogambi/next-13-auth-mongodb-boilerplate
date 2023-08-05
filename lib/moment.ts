import moment from "moment";

export function formatDate(date: any, format: any, time = false) {
  // Date string in any valid format
  //   const dateString = "2023-07-29T15:30:00Z";

  // Convert the date string to Moment.js object
  const dateMoment = moment(date);

  // Format the date as '/date/month/year' with month in short form (MMM)
  const formattedDate = dateMoment.format(format);

  if (time) {
    // Format the time in 12-hour clock system (hh:mm A)
    const formattedTime = dateMoment.format("hh:mm A");

    // Combine the formatted date and time
    const finalFormattedDateTime = formattedDate + ", " + formattedTime;
    return finalFormattedDateTime;
  }

  //   console.log(finalFormattedDateTime);
  return formattedDate;
}
