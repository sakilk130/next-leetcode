export const areEqual = (prev: unknown, next: unknown): boolean => {
  return JSON.stringify(prev) === JSON.stringify(next);
};
