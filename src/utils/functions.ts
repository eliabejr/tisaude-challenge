export const caseInsensitiveSort = (rowA: any, rowB: any) => {
  const a = rowA.title;
  const b = rowB.title;

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
}