class MonteCarlo{
  toDays(miliseconds){
    return miliseconds / 1000 / 60 / 60 / 24
  }
  calculateWorkInProgress(data){
    var wipByDate = {}
    data.forEach(range =>{
      var startDate = range[0];
      while(startDate < range[1])
      {
        if(wipByDate[startDate] === undefined){
          wipByDate[startDate] = 1;
        }else{
          wipByDate[startDate] = wipByDate[startDate] + 1;
        }
        var newDate = startDate.setDate(startDate.getDate() + 1);
        startDate = new Date(newDate);
      }
      
    })
    
    var keys = Object.keys(wipByDate);
    var values = keys.map(function(v) { return wipByDate[v]; });
    return values.reduce((a, b) => a+b) / values.length;
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
    var storiesToEstimate = 40;
    var results = this.monteCarlo(storiesToEstimate, this.data.map(arr => this.toDays(arr[1]-arr[0])));
    return this.calculateFrequencies(results);
  }

  constructor(data){
    this.data = data;
    this.workInProgress = this.calculateWorkInProgress(data);
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
    return results;
  }

}
export default MonteCarlo;
