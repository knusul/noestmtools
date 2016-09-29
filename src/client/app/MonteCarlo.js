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

  getData(){
    var workingDays = this.data.map(arr => workingDaysBetween(...arr));
    var results = this.monteCarlo(this.storiesToEstimate, workingDays);
    return this.calculateFrequencies(results);
  }

  constructor(data){
    this.mtIterations = 1000000;
    this.storiesToEstimate = 10;
    this.data = data;
  }

  monteCarlo(stories, leadTimes){
    var results = [];
    [...Array(this.mtIterations).keys()].map((i) =>{
      var storiesToDo = stories;
      var totalDays = 0;
      while(storiesToDo > 0){
        var randomLeadTime = leadTimes[Math.floor(Math.random()*leadTimes.length)]
        totalDays = totalDays + randomLeadTime;
        storiesToDo -= 1;
      }
      results.push(totalDays);
    });
    return results
  }

}
export default MonteCarlo;
