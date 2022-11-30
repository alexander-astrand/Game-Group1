let hero = document.getElementById("hero");
let game = document.getElementById("game");
let highScore = document.getElementById("highScore");
let gameOver = document.getElementById("message");
let startButton = document.getElementById("startButton")
let scoreValue = 0;

let playerAlive = true;
let beeBottom = 500;
let beeLeft = 500;

let enemySpeed = -15;
let enemySpeed2 = -15;
let enemySpeed3 = -15;
let enemySpeed4 = -15;
let heroRotation = 0;
var heroTop = hero.offsetTop;


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
            beeBottom += 25;
            hero.style.bottom = beeBottom + "px"
            console.log(heroTop)
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
            beeBottom -= 25;
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
            beeLeft += 25;
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
            beeLeft -= 25;
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
let enemyId3 = 0;
let enemyId4 = 0;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function createEnemy(randNum) {

    if (randNum > 0) {
        createEnemy((randNum - 1))
    };

    let delay = rand(40,60);
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

        let direction = rand(-50,40);
        enemyLeft += direction;
        if (enemyLeft < 0) enemyLeft = 0;
        enemy.style.left = enemyLeft + "px";

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
                    if((totalSeconds > 30)) {
                        enemySpeed = -20;
                          }
                          if((totalSeconds > 60)) {
                            enemySpeed = -25;
                            if((totalSeconds > 90)) {
                                enemySpeed = -30;
                                  }
                              }
                    if((totalSeconds > 60)) {
                        createEnemy();
                          }
               /*  if((totalSeconds > 10 && totalSeconds < 20) || (totalSeconds > 40 && totalSeconds < 45)) {
                    createEnemy();
                      } */
                }
            }

    }, delay);
    game.appendChild(enemy);
}




function createEnemyRight(randNum) {

    if (randNum > 0) {
        createEnemy((randNum - 1))
    }

    let delay = rand(40,60);
    enemyId2++;
    let enemy2 = document.createElement("img");
    enemy2.classList = "enemy2";
    let enemyLeft2 = document.documentElement.clientWidth;
    let enemyBottom2 = Math.floor(Math.random() * document.documentElement.clientHeight / 10) * 8;

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
        if (Math.abs(enemy2.offsetTop - hero.offsetTop) < 150 && Math.abs(enemyBottom2 - beeBottom) < 150 && Math.abs(enemy2.offsetLeft - hero.offsetLeft) < 75) {
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
                if((totalSeconds > 60)) {
                    enemySpeed2 = -20;
                      }
            }

    }, delay);
    game.appendChild(enemy2);
}






function createEnemyLeft(randNum) {

    if (randNum > 0) {
        createEnemy((randNum - 1))
    }

    let delay = rand(40,60);
    enemyId3++;
    let enemy3 = document.createElement("img");
    enemy3.classList = "enemy3";
    let enemyRight3 = 2000;
    let enemyBottom3 = Math.floor(Math.random() * document.documentElement.clientHeight / 10) * 9.5;

    enemy3.src = "spiderRight.png"
    enemy3.style.right = enemyRight3 + "px";
    enemy3.style.bottom = enemyBottom3 + "px";
    enemy3.id = enemyId3;

    //stänger intervallen
    let move = setInterval(() => {
        //Hastighet
        enemyRight3 += enemySpeed3;
        enemy3.style.right = enemyRight3 + "px";

        //Collision detector
        //if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
        if (Math.abs(enemy3.offsetTop - hero.offsetTop) < 50 && Math.abs(enemy3.offsetLeft - beeLeft) < 50) {
            console.log("HERO HIT");
            hero.remove();
            gameOver.innerHTML = "Game over <br/>";
            //clearInterval(move)
            clearInterval(move)
            playerAlive = false;
            enemy3.remove();
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
        if (enemyRight3 <= -100) {
            clearInterval(move)
            enemy3.remove();
            if (playerAlive) {
                createEnemyLeft();
                }
                
            }

    }, delay);
    game.appendChild(enemy3);
}


function createEnemyTop() {

  /*   if (randNum > 0) {
        createEnemy((randNum - 1))
    }
 */
    let delay = rand(40,60);
    enemyId4++;
    let enemy4 = document.createElement("img");
    enemy4.classList = "enemy4";
    let enemyLeft4 = Math.floor(Math.random() * document.documentElement.clientWidth / 10) * 9.5;
    let enemyTop4 = 1000;

    enemy4.src = "spiderUp.png"
    enemy4.style.left = enemyLeft4 + "px";
    enemy4.style.top = enemyTop4 + "px";
    let enemyBottom4 = enemy4.style.bottom
    enemy4.id = enemyId4;

    //stänger intervallen
    let move = setInterval(() => {
        //Hastighet
        enemyTop4 += enemySpeed4;
        enemy4.style.top = enemyTop4 + "px";

        //Collision detector
        //if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
        if (Math.abs(enemyTop4 - hero.offsetTop) < 50 && Math.abs(enemyLeft4 - beeLeft) < 50) {
            console.log("HERO HIT");
            hero.remove();
            gameOver.innerHTML = "Game over <br/>";
            //clearInterval(move)
            clearInterval(move)
            playerAlive = false;
            enemy4.remove();
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
        if (enemyTop4 <= -100) {
            clearInterval(move)
            enemy4.remove();
            if (playerAlive) {
                createEnemyTop();
                }
                if((totalSeconds > 90)) {
                    createEnemyTop();
                    createEnemyTop();
                      }
            }

    }, delay);
    game.appendChild(enemy4);
}


    createEnemy();
    setTimeout(() => {
        createEnemyRight();
      }, "10000")

      setTimeout(() => {
        createEnemyLeft();
      }, "20000")

      setTimeout(() => {
        createEnemyTop();
      }, "30000")

      createEnemy();
      setTimeout(() => {
          createEnemyRight();
        }, "40000")
  
        setTimeout(() => {
          createEnemyLeft();
        }, "50000")
  
        setTimeout(() => {
          createEnemyTop();
        }, "60000")
      
    

