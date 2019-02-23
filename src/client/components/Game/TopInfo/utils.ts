export const getSpectreArray = (spectre: number[]) =>
  [...Array(20)].map((_, row) =>
    [...Array(10)].map((__, col) => (spectre[col] !== null && spectre[col] <= row ? 1 : null))
  );
