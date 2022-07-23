export const getModeValue = (tempObject) => {
  const valuesArray = Object.values(tempObject).map((value) => Math.round(value));
  const frequency = {};
  let mostFrequent = valuesArray[0];
  valuesArray.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > frequency[mostFrequent]) {
      mostFrequent = value;
    }
  });
  return mostFrequent;
};
