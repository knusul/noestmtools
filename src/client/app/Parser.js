import Papa from 'papaparse'
class Parser {
  constructor(text){
    this.data = Papa.parse(text, {
      delimiter: ',',
      skipEmptyLines: true
    }).data
  }

  errors(data){
    var errors = []
      console.log(data);
      data.forEach((dataTouple) => {
        if(isNaN(Date.parse(dataTouple[0])) || isNaN(Date.parse(dataTouple[1]))) {
          errors.push(["Can not parse", dataTouple.join(", ")])
        }
      });
    return errors;
  }

  parse(){
    if(this.errors(this.data).length == 0){
      return {status: 'ok', content:  this.data.map((data) => [new Date(data[0]), new Date(data[1] ) ]) };
    }else{
      return {status: 'error', content: this.errors(this.data).pop() };
    }
  }
}
export default Parser;
