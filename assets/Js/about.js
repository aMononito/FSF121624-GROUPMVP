const container = document.querySelector('.container');

container.addEventListener('click', function (event) {
  const element = event.target;

  if (element.matches('.infoBox')) {
    const state = element.getAttribute('data-state');

    
    if (state === 'hidden') {
      
      element.textContent = element.dataset.info;
    
      element.dataset.state = 'visible';
    } else {
     
      element.textContent = 'Please click here:';
   
      element.setAttribute('data-state', 'hidden');
    }
  }
});


const game = () => {
    let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
    let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
    let moves = 0;


    const playGame = () => {
        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorBtn = document.querySelector('.scissor');
        const playerOptions = [rockBtn, paperBtn, scissorBtn];
        const computerOptions = ['rock', 'paper', 'scissors']

        document.querySelector('.p-count').textContent = playerScore;
        document.querySelector('.c-count').textContent = computerScore;

        playerOptions.forEach(option => {
            option.addEventListener('click', function () {

                const movesLeft = document.querySelector('.movesleft');
                moves++;
                movesLeft.innerText = `Moves Left: ${10 - moves}`;


                const choiceNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[choiceNumber];

                winner(this.innerText, computerChoice)
                if (moves == 10) {
                    gameOver(playerOptions, movesLeft);
                }
            })
        })

    }

 
    const winner = (player, computer) => {
        const result = document.querySelector('.result');
        const playerScoreBoard = document.querySelector('.p-count');
        const computerScoreBoard = document.querySelector('.c-count');
        player = player.toLowerCase();
        computer = computer.toLowerCase();

        console.log(`Player chose: ${player}`);
        console.log(`Computer chose: ${computer}`);

        if (player === "rock" && computer === "scissors" ||
            player === "scissors" && computer === "paper" ||
            player === "paper" && computer === "rock" ){
                result.textContent = 'Player Won';
                playerScore++;
                playerScoreBoard.textContent = playerScore;
                
        
        }else if (player === computer){
            result.textContent = 'Tie'
            
        }else {
            result.textContent = 'Computer Won';
            computerScore++;
            computerScoreBoard.textContent = computerScore;
            
        }
    }

    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
    
    const gameOver = (playerOptions, movesLeft) => {

        const chooseMove = document.querySelector('.move');
        const result = document.querySelector('.result');
        const reloadBtn = document.querySelector('.reload');

        playerOptions.forEach(option => {
            option.style.display = 'none';
        })


        chooseMove.innerText = 'Game Over!!'
        movesLeft.style.display = 'none';

        if (playerScore > computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'You won this round! 🎉'
            result.style.color = '#308D46';
        }
        else if (playerScore < computerScore) {
            result.style.fontSize = '2rem';
            result.innerText = 'Computer won this round! 😞';
            result.style.color = 'red';
        }
        else {
            result.style.fontSize = '2rem';
            result.innerText = 'It\'s a tie! 🫣';
            result.style.color = 'grey'
        }
        reloadBtn.innerText = 'Restart';
        reloadBtn.style.display = 'flex'
        reloadBtn.addEventListener('click', () => {
            console.log('Restarting the game');
            window.location.reload();
        })
    }
    playGame();
    console.log('Game started');
}
game();

// ...........................................................................

// function generateRandom() {
//     const originalArray = Array.from({ length: 52 }, (_, index) => index); 
//     const usedIn = [];
//     const result = [];

//     while (usedIn.length < 52) {
        
//         const available = originalArray.filter(index => !usedIn.includes(index));
//         const firstIndex = available[Math.floor(Math.random() * available.length)];
//         usedIn.push(firstIndex);

       
//         const updatedAvailable = available.filter(index => index !== firstIndex);
//         const secondIndex = updatedAvailable[Math.floor(Math.random() * updatedAvailable.length)];
//         usedIn.push(secondIndex);

//         result.push([firstIndex, secondIndex]);
//     }

//     return result;
// }

// const randomPairs = generateRandom();
// console.log(randomPairs);