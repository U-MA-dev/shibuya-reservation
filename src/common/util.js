export const dateFormater_YYMMDD = ({ date }) => {
  const strDate =
    date.getFullYear().toString() +
    ("0" + date.getMonth() + 1).slice(-2) +
    ("0" + date.getDate()).slice(-2);

  return strDate;
};

export const dateFormater_display = ({ date }) => {
  const strDate =
    date.getFullYear().toString() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getDate();

  return strDate;
};
