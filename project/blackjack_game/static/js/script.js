// Challenge 1: Your Age in Days

function ageInDays(){
    var birthYear = prompt('What year were you born.. Good friend?');
    var ageInDays = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');

    var textAnswer = document.createTextNode('You are '+ ageInDays + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset(){
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Laptop Generator
function generatelap(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-lap-gen');
    image.src = "static/images/back.jpg";
    div.appendChild(image);
}

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    result = decideWinner(humanChoice, botChoice);  //[0, 1] human lost | bot won
    message = finalMessage(result);   //{'message': 'You WOn!', 'color': 'green'}
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'rock': 0, 'scissors': 0.5}
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerscore = rpsDatabase[computerChoice][yourChoice];

    return[yourScore, computerscore];
}

function finalMessage([yourScore, computerscore]){
    if(yourScore==0){
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore==0.5){
        return {'message': 'Tied!', 'color': 'yellow'};
    }
    else{
        return {"message": 'You Won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanChoice, botChoice, finalMessage){
    
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    humanDiv.innerHTML = "<img src = 'static/images/"+humanChoice+".jpg' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);"+ "'>"
    botDiv.innerHTML = "<img src = 'static/images/"+botChoice+".jpg' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 233, 1); "+ "'>"
    messageDiv.innerHTML = "<h1 style='color: "+ finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message']
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}
function buttonColorChange(buttonThingy) {
    if(buttonThingy.value == 'red'){
        buttonsRed();
    } else if(buttonThingy.value == 'green'){
        buttonsGreen();
    } else if(buttonThingy.value == 'reset'){
        buttonColorReset();
    } else if(buttonThingy.value == 'random'){
        randomColors();
    }
}
function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    } 
    
}

function buttonsGreen(){
    
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
   
}

function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random() * 4)]);
    }
}


// Challenge 5: Blackjack
let blackjackGame = {
    'you': {'scorespan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scorespan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'card': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const CARD = blackjackGame['card']
const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#balckjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit(){
    if(blackjackGame['isStand'] == false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']); 
    }
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = 'static/images/'+card+'.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver']==true){
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for(i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackjackGame['turnsOver'] = false;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['card'][randomIndex];
}

function updateScore(card, activePlayer){
    if(card == 'A'){
        // If adding 11 keeps me below 21, and 11. Otherwise, add 1
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }

}

function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    }else{
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;
    if(blackjackGame['turnsOver']==false){
        while(DEALER['score']< 15 && blackjackGame['isStand']==true){
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            await sleep(1000);
        }
    } 
    
    if(blackjackGame['turnsOver']==false){
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
    }
    
}


// compute winner and return  who just won
//update the wins, draws and losses
function computeWinner(){
    let winner;

    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or  when dealer busts but you're 21 or under
        if(YOU['score'] > DEALER['score'] || (DEALER['score']> 21)){
            blackjackGame['wins']++;
            winner = YOU;
        } else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        } else if(YOU['score'] == DEALER['score']){
            blackjackGame['draws']++;

        }
    //condition: when user bust but dealer doesn't
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    // Condition: when you AND the dealer busts
    } else if(YOU['score'] >21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message, messageColor;
    if(blackjackGame['turnsOver'] ==true){
        if(winner == YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        } else if(winner == DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        } else{
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}

