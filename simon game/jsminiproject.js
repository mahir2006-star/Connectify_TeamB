let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");
let gameseq = [];
let userseq = [];
let level = 0;
let started = false;
let btns = ["yellow", "red", "purple", "green"];
document.addEventListener("keypress", () => {
    if (started == false) {
        started = true;
        h3.innerText = `Level = ${level}`;
        levelUp();
    }
});
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 400);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300);
}
function levelUp() {
    userseq = [];
    level++;
    h3.innerText = `Level = ${level}`;
    let randInx = Math.floor(Math.random() * 4);
    let randColor = btns[randInx];
    gameseq.push(randColor);
    let randbtn = document.querySelector(`.${randColor}`);
    gameFlash(randbtn);
}
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("correct");
    } else {
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        
        h3.innerHTML = `Game Over ! Your score was <b>${level}</b><br> Press any key to start again`;
        reset();
    }
}
function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = this.classList[1];
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}
let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
    h3.innerText = "Press any key to start";
}
