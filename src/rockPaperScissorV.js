inquirer = require("inquirer")
const Table = require("cli-table/lib");
const STable = require('./table.js');
let RulesLogic = require('./RulesLogic.js');
const HMACGenerator = require('./crypto.js');

let manualChoices = process.argv.slice(2);

module.exports = class RockPaperScissor{
  
    constructor(){
        this.prompt = inquirer.createPromptModule();
        this.moves = manualChoices;
    }
    
    async newGame() {
		  await this.parametersTest();

		  this.compete();
	  }

    async parametersTest(){		
		  let movesLength = manualChoices.length;
			  if (movesLength % 2 == 0) {
		    console.log(`You have ${movesLength} parameters. Please input an odd number.`)
		    process.exit();
		  } else if (movesLength < 3) {
		    console.log("Not enought parameters. Please input more than 3.");
		    process.exit();
		  } else if ( new Set(manualChoices).size !== movesLength) {
        console.log('Do not repeat parameters.');
        process.exit();
      }
	  }	

    async compete(){ 
        STable.createTableData(this.moves); 
        let randomNum = Math.floor(Math.random() * manualChoices.length);  
        let computerMove = manualChoices[randomNum];
        let playerTwo = manualChoices.indexOf(computerMove); 
        HMACGenerator.generateComputerHMAC(computerMove);
        console.log("HMAC:",HMACGenerator.getHMAC())

        // To check computer moves before answer:
        //console.log(computerMove, playerTwo );

        let playerOneIndex = await this.getUserMove();
        let playerOne = manualChoices[playerOneIndex];
        let result = '';
      
        let hmacKey = HMACGenerator.pKey;
        let winner = await this.getWinner(playerOneIndex, playerTwo, computerMove)
        this.printResult(winner,playerOne, computerMove, hmacKey);
        RulesLogic.setMoves(this.moves);    
        
    }   
        
    getWinner(playerOneIndex, playerTwo) {
            let winner = "";
            let size = process.argv.slice(2).length;          
            let resultDistance = (size + playerOneIndex - playerTwo) % size;          
            let LosingRange = Math.floor(size / 2);
              if (playerOneIndex === playerTwo) {
                  winner = 'Draw!';
              } else if (
                  resultDistance <= LosingRange
                  ) {
                winner = 'Computer wins!';
              } else {
              winner = 'You won!';}
         

        return new Promise((resolve, reject) => {
            resolve(winner);
            }); 
    }

    printResult(winner,playerOneIndex,computerMove, hmacKey){
        console.log(`Winner: ${winner}.\nYou (${playerOneIndex}) vs Computer(${computerMove})\n`, hmacKey);
    }
   
  

    async getUserMove() {
        let answerInput = process.argv.slice(2);
        answerInput.push('exit');
        let choicesArray = answerInput.slice();
        choicesArray.push('help')
        let answer = await inquirer.prompt([
          {
            type: 'rawlist',
            name: "move",
            message: "Available moves",
            choices: choicesArray
          }
        ]);
        if (answer.move === 'help') {
          STable.showTable();
          answer = await inquirer.prompt([
            {
              type: 'rawlist',
              name: "move",
              message: "Available moves",
              choices: answerInput
            }
          ]);
          
        } else if (answer.move === 'exit') {
          process.exit();
        }
        return process.argv.slice(2).indexOf(answer.move);
      }

     

}


