import MonteCarlo from '../app/MonteCarlo.js';
import { workingDaysBetween } from '../app/MonteCarlo.js';

describe('MonteCarlo', () => {
  describe("#workingDays", () => {
    it('returns working dayes between 2 dates', () => {
      let date1 = new Date("Fri Jan 01 2016");
      let date2 = new Date("Fri Jan 08 2016");
      let days = workingDaysBetween(date1, date2);
      expect(days).toBe(6);
    });
    it('returns 1 when started on weekend', () => {
      let date1 = new Date("Sat Jan 02 2016");
      let date2 = new Date("Sat Jan 02 2016");
      let days = workingDaysBetween(date1, date2);
      expect(days).toBe(1);
    });
    it('returns 1 when started on Sat and ended Sun', () => {
      let date1 = new Date("Sat Jan 02 2016");
      let date2 = new Date("Sun Jan 03 2016");
      let days = workingDaysBetween(date1, date2);
      expect(days).toBe(1);
    });
    it('Does not mutate original date', () => {
      let date1 = new Date("Sat Jan 02 2016");
      let date2 = new Date("Sun Jan 03 2016");
      let days = workingDaysBetween(date1, date2);
      expect(date1).toEqual(new Date('Sat Jan 02 2016'))
      expect(date2).toEqual(new Date('Sun Jan 03 2016'))
    });
  });
  describe("#calculateFrequencies", () => {
    it('returns hash with values equal to number of occurencies of key in hash', () => {
      let monteCarlo = new MonteCarlo([]);
      let freqs = monteCarlo.calculateFrequencies([1,1,2,3,1])
      expect(freqs).toEqual({'1': 3, '2': 1, '3': 1});
    });
  });
  describe("#get90thPercentile", () => {
    it('90th percentile', () => {
      let monteCarlo = new MonteCarlo([[new Date("2016-12-12"), new Date("2016-12-14")]], 1000);
      let percentile = monteCarlo.get90thPercentile()
      expect(percentile).toEqual(9);
    });
  });
});
