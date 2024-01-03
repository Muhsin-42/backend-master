export const getUniqueSuffix = () => {
  return Date.now() + "-" + Math.round(Math.random() * 1e9);
};
