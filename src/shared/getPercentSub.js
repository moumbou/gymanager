const getPercentSub = (sub) => {
  if (!sub) return 0;
  const { debutSub, endSub, seances, officielSeance } = sub;

  const dateDebut = new Date(debutSub);
  const dateFin = new Date(endSub);
  const date = new Date().setHours(0, 0, 0, 0);
  const dateDiff_X = dateFin - dateDebut;
  const dateDiff_Y = dateFin - date;

  if (dateDiff_Y <= 1) return 1;
  if (seances <= 1) return 1;

  const datePercent = (dateDiff_Y * 100) / dateDiff_X;
  const seacnesPercent = (seances * 100) / officielSeance;
  let result = (datePercent + seacnesPercent) / 2;
  result = Math.floor(result);

  if (result > 80) return 3;
  if (result <= 80 && result > 20) return 2;
  if (result <= 20) return 1;
};

export default getPercentSub;
