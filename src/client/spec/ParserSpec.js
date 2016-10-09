/*jshint esversion: 6 */
import Parser from '../app/Parser.js';

describe('Parser', () => {
  describe("#workingDays", () => {
    it('parses csv file to dates', () => {
      var parser = new Parser("2015-12-12,2015-12-11")
      expect(parser.parse().content).toEqual([[new Date("2015-12-12"), new Date("2015-12-11")]]);
    });
  });
});

