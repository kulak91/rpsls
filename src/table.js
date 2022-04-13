const { table } = require('table');
let RulesLogic = require('./RulesLogic.js');


class STable{
  tableData = [];
  
  createTableData(manualChoices){
    this.createHead(manualChoices);  
    for(let i = 0; i < manualChoices.length; i++){
        let buf = manualChoices.map(item => RulesLogic.calculateResult(i, manualChoices.indexOf(item)));
        buf.unshift(manualChoices[i]);
        this.tableData[i+1] = buf.slice();
    }     
  }

  createHead(manualChoices) {
    manualChoices.unshift('  ');
    this.tableData[0] = manualChoices.slice();
    manualChoices.shift();
  }

  showTable(){
    console.log(table(this.tableData));
  }

}

module.exports = new STable();