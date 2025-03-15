let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';

let player1="";
let player2="";

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6] 
    ];
        
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== ' ' && board[a] === board[b] && board[b] === board[c]) {
            return true; 
        }
    }
    return false;
}



function isBoardFull() {
    return board.every(cell => cell !== ' '); 
}


function draw(index, button) {
    let message=document.getElementById("message");

    if (board[index] === ' ' && !checkWin()) {
        board[index] = currentPlayer;
        button.innerText = currentPlayer; 

        if (checkWin()) {
            if (player1 && player2){
                currentPlayer === 'X' ? message.innerHTML = ` ${player1} wins!` : message.innerHTML = ` ${player2} wins!`;
            }
            else{
              message.innerHTML = `Player ${currentPlayer} wins!`;
            }
            return; 
        }



        if (isBoardFull()) {
            message.innerHTML = "No Player Wins, Play Again";
            return; 
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
       
    } else {
       message.innerHTML ='Spot taken';
    }
}

const buttons = document.querySelectorAll(".playboard");

buttons.forEach((button, index) => {
    button.addEventListener("click", function() {
        draw(index, this);
    });
});


const reset = document.getElementById("reset");

reset.addEventListener("click",function(){
     board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
     currentPlayer = 'X';
     document.getElementById("message").innerHTML =" ";

     document.querySelectorAll(".playboard").forEach(button => {
        button.innerText = " ";    });

        document.querySelector("form").style.display = "block"; 
})



document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    this.style.display = "none"; 
    
    
  player1= document.getElementById("player1").value;
  player2= document.getElementById("player2").value;


});