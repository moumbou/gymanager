const toCurrency = (number) => {
  if (!number) return "0,00";
  return number.toLocaleString();
};

export default toCurrency;
