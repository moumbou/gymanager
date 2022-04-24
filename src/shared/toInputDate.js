const toInputDate = function (currentDate) {
  if (!currentDate) return "";
  let date = new Date(currentDate);
  let local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export default toInputDate;
