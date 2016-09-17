import MonteCarlo from '../app/MonteCarlo.js';

describe('MonteCarlo', () => {
  describe("#workingDays", () => {
    it('returns working dayes between 2 dates', () => {
      let monteCarlo = new MonteCarlo([]);
      let date1 = new Date("Fri Jan 01 2016");
      let date2 = new Date("Fri Jan 08 2016");
      let days = monteCarlo.workingDaysBetween(date1, date2);
      expect(days).toBe(6);
    });
    it('returns 1 when started on weekend', () => {
      let monteCarlo = new MonteCarlo([]);
      let date1 = new Date("Sat Jan 02 2016");
      let date2 = new Date("Sat Jan 02 2016");
      let days = monteCarlo.workingDaysBetween(date1, date2);
      expect(days).toBe(1);
    });
    it('returns 1 when started on Sat and ended Sun', () => {
      let monteCarlo = new MonteCarlo([]);
      let date1 = new Date("Sat Jan 02 2016");
      let date2 = new Date("Sun Jan 03 2016");
      let days = monteCarlo.workingDaysBetween(date1, date2);
      expect(days).toBe(1);
    });
  });
  describe("#calculateFrequencies", () => {
    it('returns hash with values equal to number of occurencies of key in hash', () => {
      let monteCarlo = new MonteCarlo([]);
      let freqs = monteCarlo.calculateFrequencies([1,1,2,3,1])
      expect(freqs).toEqual({'1': 3, '2': 1, '3': 1});
    });
  });
});
