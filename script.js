let hero = document.getElementById("hero");
let game = document.getElementById("game");
let highScore = document.getElementById("highScore");
let gameOver = document.getElementById("message");
let scoreValue = 0;

let playerAlive = true;
let beeBottom = 500;
let beeLeft = 500;

let enemySpeed = -20;
let enemySpeed2 = -30;
let heroRotation = 0;

var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;

if (localStorage.getItem("Highscore")) {
} else {
    let highScore = [];

localStorage.setItem("Highscore", JSON.stringify(highScore));
}


function largest(arr) { 
    let i; 
    let max = arr[0]; 
    for (i = 1; i < arr.length; i++) {
        if (arr[i] > max) 
            max = arr[i]; 
    } 
      
  return max; 
} 
  
// Driver code 
let arr = JSON.parse(localStorage.getItem("Highscore"));
highScore.innerHTML = "Highscore: " + largest(arr);


function countTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600);
           var minute = Math.floor((totalSeconds - hour*3600)/60);
           var seconds = totalSeconds - (hour*3600 + minute*60);
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
            document.getElementById("timer").innerHTML = minute + ":" + seconds;
        }

document.addEventListener("keydown", (e) => {
    console.log("e", e.key);

    switch (e.key) {
        case "w":
        case "ArrowUp":
            beeBottom += 20;
            hero.style.bottom = beeBottom + "px"
            if(heroRotation = -90) {
                heroRotation += 90
                hero.style.rotate = heroRotation + "deg";
                }
            if(heroRotation = 90) {
                heroRotation += -90
                hero.style.rotate = heroRotation + "deg";
            }
            break;
        case "s":
        case "ArrowDown":
            beeBottom -= 20;
            hero.style.bottom = beeBottom + "px";
            if(heroRotation = -90) {
                heroRotation += -90
                hero.style.rotate = heroRotation + "deg";
                }
            if(heroRotation = 90) {
                heroRotation += 90
                hero.style.rotate = heroRotation + "deg";
            }
            break;
        case "d":
        case "ArrowRight":
            beeLeft += 20;
            hero.style.left = beeLeft + "px"
            if(heroRotation != 90) {
            heroRotation += 90
            hero.style.rotate = heroRotation + "deg";
            }
            if(heroRotation = 180) {
                heroRotation -= 90
                hero.style.rotate = heroRotation + "deg";
                }
            break;
        case "a":
        case "ArrowLeft":
            beeLeft -= 20;
            hero.style.left = beeLeft + "px";
            if(heroRotation != -90) {
                heroRotation -= 90
                hero.style.rotate = heroRotation + "deg";
                }
            if(heroRotation = 180) {
                heroRotation -= -90
                hero.style.rotate = heroRotation + "deg";
                }
            
            break;
    }
    console.log(heroRotation)
})

let enemyId = 0;
let enemyId2 = 0;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function createEnemy(randNum) {

    if (randNum > 0) {
        createEnemy((randNum - 1))
        }

    enemyId++;
    let enemy = document.createElement("img");
    enemy.classList = "enemy";
    let enemyBottom = document.documentElement.clientHeight;
    let enemyLeft = Math.floor(Math.random() * document.documentElement.clientWidth / 10) * 9.5;

    console.log("enemy", enemyBottom);

    enemy.src = "spider.png"
    enemy.style.left = enemyLeft + "px";
    enemy.style.bottom = enemyBottom + "px";
    enemy.id = enemyId;

    //stänger intervallen
    let move = setInterval(() => {
        //Hastighet
        enemyBottom += enemySpeed;
        enemy.style.bottom = enemyBottom + "px";

        //Collision detector
        //if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
        if (Math.abs(enemyBottom - beeBottom) < 50 && Math.abs(enemyLeft - beeLeft) < 50) {
            console.log("HERO HIT");
            hero.remove();
            gameOver.innerHTML = "Game over <br/>";
            //clearInterval(move)
            clearInterval(move)
            playerAlive = false;
            enemy.remove();
            let newGameBtn = document.createElement("button");
            newGameBtn.innerHTML = "New game";
            gameOver.appendChild(newGameBtn);
            clearInterval(timerVar);
            //Save time
            let highScore = JSON.parse(localStorage.getItem("Highscore"));
            highScore.push(timer.innerHTML);
            localStorage.setItem("Highscore", JSON.stringify(highScore));

            let arr = JSON.parse(localStorage.getItem("Highscore"));
            document.getElementById("highScore").innerHTML = "Highscore: " + largest(arr);
            

            newGameBtn.onclick = function() {
                location.reload();
            }
            //enemy.remove();
        }
        //Math.abs(enemyBottom - bottom) < 25
        if (enemyBottom <= -100) {
            clearInterval(move)
            enemy.remove();
            //setTimeout(createEnemy(color), 5000);
            if (playerAlive) {
                createEnemy();
                /* let randomNumber = Math.ceil(Math.random() * 10); */
                
                if (randNum > 0) {
                    createEnemy((randNum - 1))
                    }
                
                if((totalSeconds > 10 && totalSeconds < 20) || (totalSeconds > 40 && totalSeconds < 45)) {
                    createEnemy();
                      }
                }
            }

    }, 60);
    game.appendChild(enemy);
}

createEnemy();


function createEnemyRight() {

    /* if (randNum > 0) {
        createEnemy((randNum - 1))
        } */

    enemyId2++;
    let enemy2 = document.createElement("img");
    enemy2.classList = "enemy2";
    let enemyLeft2 = document.documentElement.clientWidth;
    let enemyBottom2 = Math.floor(Math.random() * document.documentElement.clientHeight / 10) * 9.5;

    enemy2.src = "spiderLeft.png"
    enemy2.style.left = enemyLeft2 + "px";
    enemy2.style.bottom = enemyBottom2 + "px";
    enemy2.id = enemyId2;

    //stänger intervallen
    let move = setInterval(() => {
        //Hastighet
        enemyLeft2 += enemySpeed2;
        enemy2.style.left = enemyLeft2 + "px";

        //Collision detector
        //if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
        if (Math.abs(enemyBottom2 - beeBottom) < 175 && Math.abs(enemyLeft2 - beeLeft) < 25) {
            console.log("HERO HIT");
            hero.remove();
            gameOver.innerHTML = "Game over <br/>";
            //clearInterval(move)
            clearInterval(move)
            playerAlive = false;
            enemy2.remove();
            let newGameBtn = document.createElement("button");
            newGameBtn.innerHTML = "New game";
            gameOver.appendChild(newGameBtn);
            clearInterval(timerVar);
            //Save time
            let highScore = JSON.parse(localStorage.getItem("Highscore"));
            highScore.push(timer.innerHTML);
            localStorage.setItem("Highscore", JSON.stringify(highScore));

            let arr = JSON.parse(localStorage.getItem("Highscore"));
            document.getElementById("highScore").innerHTML = "Highscore: " + largest(arr);
            

            newGameBtn.onclick = function() {
                location.reload();
            }
        }
        if (enemyLeft2 <= -100) {
            clearInterval(move)
            enemy2.remove();
            if (playerAlive) {
                createEnemyRight();
                }
            }

    }, 60);
    game.appendChild(enemy2);
}


createEnemyRight();