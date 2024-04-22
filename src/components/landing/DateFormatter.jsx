import React from "react";
const DateFormatter = ({ originalDate }) => {
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  };

  const formattedDate = formatDate(originalDate);

  return <p>{formattedDate}</p>;
};

export default DateFormatter;
