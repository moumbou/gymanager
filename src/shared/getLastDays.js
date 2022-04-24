const getLastDays = (dateEnd) => {
  const date = new Date().setHours(0, 0, 0, 0);
  const diff = dateEnd - date;
  const days = diff / (1000 * 60 * 60 * 24);
  return Math.floor(days);
};

export default getLastDays;
