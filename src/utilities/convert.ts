export function epochDateToStringDate(date: number): string {
  let fullDate = new Date(date);
  return (fullDate.getMonth()+1) + '/' + fullDate.getDate() + '/' + fullDate.getFullYear();
}

export function stringDateToEpochDate(date: string): number {
  return new Date(date).getTime();
}