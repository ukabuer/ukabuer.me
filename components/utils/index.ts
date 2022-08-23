/**
 * format Date to date string
 * @param {Date} time
 */
export function formatDate(time: Date): string {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  return `${year}-${month}-${date}`;
}

export const API = process.env.API || "";
