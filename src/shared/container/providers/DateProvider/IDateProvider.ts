interface IDateProvider {
  compareInHours(star_date: Date, end_date: Date): number;
  dateNow(): Date;
  compareInDays(star_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };