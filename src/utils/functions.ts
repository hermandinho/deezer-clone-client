export const formatTime = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;

  return `${minutes}:${remainingSeconds}`;
}

export const convertToKFormat = (number: number): string => {
  if (number >= 1000) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    const abbreviatedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);
    return abbreviatedNumber + suffixes[suffixIndex];
  }
  return number.toString();
}
