class MonteCarlo{
  toDays(miliseconds){
    return miliseconds / 1000 / 60 / 60 / 24
  }
  calculateFrequencies(data){
    var counts = {};

    for(var i = 0; i< data.length; i++) {
      var num = data[i];
      counts[num] = counts[num] ? counts[num]+1 : 1;
    }
    return counts;
  }

  getData(){
    var storiesToEstimate = 10;
    var results = this.monteCarlo(storiesToEstimate, this.data.map(arr => this.toDays(arr[1]-arr[0])+1));
    return this.calculateFrequencies(results);
  }

  constructor(data){
    this.data = data;
  }
  monteCarlo(stories, leadTimes){
    var results = [];
    [...Array(100000).keys()].map((i) =>{
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
