export const getMatches = () => {
  const strMatches = localStorage.getItem("matches");
  return JSON.parse(strMatches) || [];
};
export const setMathches = matches => {
  localStorage.setItem("matches", JSON.stringify(matches));
};