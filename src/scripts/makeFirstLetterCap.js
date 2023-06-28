export default function makeFirstLetterCap(str) {
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}
