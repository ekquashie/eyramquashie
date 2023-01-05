export const unCapitalizeFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const removeSpace = (string) => {
  return string.replace(/\s+/g, '');
}