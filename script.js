var timer = 60;
var hitrn = 0;
var score = 0;
var playerName = '';
var leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

function makeBubble(){
    var bub = "";
    for(var i = 1; i <= 199; i++){
        var random = Math.floor(Math.random() * 10);
        bub += `<div class="bubble">${random}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = bub;
}

function runTimer(){
    var timerint = setInterval(function(){
        if(timer > 0){
            timer--;
            document.querySelector("#timerVal").textContent = timer;
        } else {
            clearInterval(timerint);
            document.querySelector("#pbtm").innerHTML = `<h1>Game Over. Refresh page to play again.</h1>`;
            updateLeaderboard(playerName, score);
            document.querySelector("#leaderboard").style.display = 'block';
        }
    }, 1000);
}

function getHit(){
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

function incScore(){
    score += 10;
    document.querySelector("#incScore").textContent = score;
}

function updateLeaderboard(name, score) {
    leaderboard.push({ name: name, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    var leaderboardContent = document.querySelector("#leaderboardContent");
    leaderboardContent.innerHTML = '';
    leaderboard.forEach(entry => {
        var entryDiv = document.createElement("div");
        entryDiv.className = "leaderboard-entry";
        entryDiv.textContent = `${entry.name}: ${entry.score} points`;
        leaderboardContent.appendChild(entryDiv);
    });
}

function resetLeaderboard() {
    leaderboard = [];
    localStorage.removeItem('leaderboard');
    displayLeaderboard();
}

document.querySelector("#startGame").addEventListener("click", function() {
    playerName = document.querySelector("#username").value;
    if (playerName.trim() !== '') {
        document.querySelector("#userInput").style.display = "none";
        document.querySelector("#ptop").style.display = "flex";
        document.querySelector("#pbtm").style.display = "flex";
        document.querySelector("#leaderboard").style.display = "none"; // Hide leaderboard during the game
        incScore();
        runTimer();
        makeBubble();
        getHit();
    } else {
        alert("Please enter your name");
    }
});

document.querySelector("#pbtm").addEventListener("click", function(dets){
    var clickedNum = Number(dets.target.textContent);
    if(clickedNum == hitrn){
        incScore();
        makeBubble();
        getHit();
    }
});

document.querySelector("#resetLeaderboard").addEventListener("click", resetLeaderboard);

displayLeaderboard();