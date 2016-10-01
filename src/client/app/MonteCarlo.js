/*jshint esversion: 6 */
export function workingDaysBetween(from, to){
  var fromCopy = new Date(from.getTime());
  var n=1;
  while(fromCopy<to){
    if( fromCopy.getDay() >0 && fromCopy.getDay() <6) n++;
    fromCopy.setDate(fromCopy.getDate()+1) ;
  }
  return n;
}

class MonteCarlo{
  calculateFrequencies(data){
    var counts = {};

    for(var i = 0; i< data.length; i++) {
      var num = data[i];
      counts[num] = counts[num] ? counts[num]+1 : 1;
    }
    return counts;
  }

  runSimulation(){
    var simulationResults =  this.monteCarlo(this.storiesToEstimate, this.workingDays);
    return {
      frequencies: this.calculateFrequencies(simulationResults),
        the90thPercentile: simulationResults.sort()[Math.round(simulationResults.length * 95/100)]};
  }

  constructor(data, storiesToEstimate){
    this.mtIterations = 100000;
    this.storiesToEstimate = storiesToEstimate;
    this.workingDays = data.map(arr => workingDaysBetween(...arr));
  }

  monteCarlo(stories, leadTimes){
    var results = [];
    for(var i=0; i< this.mtIterations; i++){
      var storiesToDo = stories;
      var totalDays = 0;
      while(storiesToDo > 0){
        var randomLeadTime = leadTimes[Math.floor(Math.random()*leadTimes.length)];
        totalDays = totalDays + randomLeadTime;
        storiesToDo -= 1;
      }
      results.push(totalDays);
    }
    return results;
  }

}
export default MonteCarlo;
