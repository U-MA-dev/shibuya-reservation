export const dateFormater_YYMMDD = ({ date }) => {
  const strYear = date.getFullYear().toString();
  const strMonth = ("0" + (date.getMonth() + 1)).slice(-2);
  const strDay = ("0" + date.getDate()).slice(-2);
  const strDate = strYear + strMonth + strDay;

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
