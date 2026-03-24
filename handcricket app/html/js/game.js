// --- INITIAL SETUP ---
let userRole = localStorage.getItem("userRole") ;
let firstInningsScore = localStorage.getItem("firstInningsScore");
let target = firstInningsScore ? Number(firstInningsScore) + 1 : null;

let currentScore = 0;
let isGameOver = false;

// UI Elements
const roleDisplay = document.getElementById("role-display");
const scoreVal = document.getElementById("score-val");
const targetBox = document.getElementById("target-box");
const targetVal = document.getElementById("target-val");
const outedDisplay = document.getElementById("outed");

// Setup Page based on Innings
if (target === null) {
    roleDisplay.innerText = userRole === "batting" ? "1st Innings: You are Batting" : "1st Innings: You are Bowling";
} else {
    targetBox.style.visibility = "visible";
    targetVal.innerText = target;
    roleDisplay.innerText = userRole === "batting" ? "2nd Innings: You are Batting" : "2nd Innings: You are Bowling";
}

// --- START GAME ---
document.getElementById("start-game").addEventListener("click", function() {
    this.style.display = "none";
    const container = document.getElementById("buttons");
    for (let i = 1; i <= 10; i++) {
        container.innerHTML += `<button class="num-btn" onclick="playTurn(${i})">${i}</button>`;
    }
});

// --- CORE LOGIC ---
function playTurn(userNum) {
    if (isGameOver) return;

    const cpuNum = Math.floor(Math.random() * 10) + 1;
    document.getElementById("useresult").innerText = `You: ${userNum}`;
    document.getElementById("cpuresult").innerText = `CPU: ${cpuNum}`;

    if (userNum === cpuNum) {
        // MATCH! -> OUT
        handleOut();
    } else {
        // DIFFERENT -> ADD RUNS
        const runs = (userRole === "batting") ? userNum : cpuNum;
        currentScore += runs;
        scoreVal.innerText = currentScore;

        // Check if target is chased in 2nd innings
        if (target !== null && currentScore >= target) {
            isGameOver = true;
            finishMatch(userRole === "batting" ? "YOU WON!" : "CPU WON!");
        }
    }
}

function handleOut() {
    isGameOver = true;
    outedDisplay.innerHTML = `<h2 style="color:red">OUT!</h2>`;
    
    if (target === null) {
        // End of 1st Innings
        localStorage.setItem("firstInningsScore", currentScore);
        // Switch roles for 2nd Innings
        const nextRole = (userRole === "batting") ? "bowling" : "batting";
        localStorage.setItem("userRole", nextRole);
        
        document.getElementById("buttons").innerHTML = `
            <button class="btn" onclick="location.reload()">Start 2nd Innings</button>
        `;
    } else {
        // End of 2nd Innings
        const winner = (userRole === "batting") ? "CPU WON!" : "YOU WON!";
        finishMatch(winner);
    }
}

function finishMatch(msg) {
    outedDisplay.innerHTML = `<h2 style="color:gold">${msg}</h2>`;
    document.getElementById("buttons").innerHTML = `
        <button class="btn" onclick="resetGame()">Play Again</button>
    `;
}

function resetGame() {
    localStorage.clear();
    window.location.href = "toss.html"; 
}

localStorage.clear(); // Clear any previous game data on page load