export const useObjectIsEmpty = (obj: object) => {
  return Object.values(obj).length === 0;
};
