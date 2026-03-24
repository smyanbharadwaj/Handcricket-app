let userTossSide = ""; 

function handleTossChoice(side) {
    userTossSide = side;
    document.getElementById("toss-choice").classList.add("hidden");
    document.getElementById("number-input").classList.remove("hidden");
    document.getElementById("instruction-text").innerHTML = 
        `You chose <strong>${side.toUpperCase()}</strong>. Pick a number (1-10):`;
    generateNumberButtons();
}

function generateNumberButtons() {
    const grid = document.getElementById("num-btns");
    grid.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.className = "num-btn";
        btn.onclick = () => runTossLogic(i);
        grid.appendChild(btn);
    }
}

function runTossLogic(userNum) {
    const cpuNum = Math.floor(Math.random() * 10) + 1;
    const sum = userNum + cpuNum;
    const result = (sum % 2 === 0) ? "even" : "odd";
    
    document.getElementById("number-input").classList.add("hidden");
    document.getElementById("toss-result").classList.remove("hidden");
    
    const resultMsg = document.getElementById("result-message");
    const decisionBtns = document.getElementById("decision-btns");
    
    let baseText = `You played ${userNum}, CPU played ${cpuNum}. <br> Total: <strong>${sum}</strong> (${result.toUpperCase()}).<br><br>`;

    // Save "Who won the toss" to storage
    if (userTossSide === result) {
        localStorage.setItem("tossWinner", "User");
        resultMsg.innerHTML = baseText + "🏆 You won the toss!";
        decisionBtns.innerHTML = `
            <button class="btn" onclick="saveMatchInfo('batting')">Bat</button>
            <button class="btn" onclick="saveMatchInfo('bowling')">Bowl</button>
        `;
    } else {
        localStorage.setItem("tossWinner", "CPU");
        const cpuDecision = Math.random() > 0.5 ? "batting" : "bowling";
        
        // If CPU bats, User bowls. If CPU bowls, User bats.
        const userRole = (cpuDecision === "batting") ? "bowling" : "batting";
        
        resultMsg.innerHTML = baseText + `CPU won and chose to <strong>${cpuDecision}</strong>.`;
        decisionBtns.innerHTML = `
            <button class="btn" onclick="saveMatchInfo('${userRole}')">Start Match</button>
        `;
    }
}

/**
 * Saves all info to localStorage and moves to the game page
 */
function saveMatchInfo(userRole) {
    const cpuRole = (userRole === "batting") ? "bowling" : "batting";
    
    // Save the roles
    localStorage.setItem("userRole", userRole); // Who is the user?
    localStorage.setItem("cpuRole", cpuRole);   // Who is the CPU?
    
    // Move to the next page
    window.location.href = "game.html";
}

