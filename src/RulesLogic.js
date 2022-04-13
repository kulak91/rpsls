class RulesLogic{
    
    constructor(moves){
        this.moves = moves;
    }
    setMoves(moves){
        this.moves = moves;
    }
    getResult(){
        return this.result;
    }
  calculateResult(playerOneIndex, playerTwo){
        if(playerOneIndex === playerTwo) return 'Draw';
        if(playerOneIndex > playerTwo) return playerOneIndex - playerTwo > Math.floor(this.moves.length/2) ? 'Win' : 'Lose';
        else return playerTwo - playerOneIndex > Math.floor(this.moves.length/2) ? 'Lose' : 'Win';           
        
  }
}

module.exports = new RulesLogic(process.argv.slice(2));
