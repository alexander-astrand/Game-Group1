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
let enemySpeed3 = -25;
let enemySpeed4 = -15;
let heroRotation = 0;
var heroTop = hero.offsetTop;

hero.style.display = "none";


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

  
let arr = JSON.parse(localStorage.getItem("Highscore"));
highScore.innerHTML = "Highscore: " + largest(arr);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

document.addEventListener("keydown", (e) => {

    switch (e.key) {
        case "w":
        case "ArrowUp":
            if (beeBottom + hero.offsetHeight < screenHeight) {
                // If not, update the hero's position
                beeBottom += 50;
                hero.style.bottom = beeBottom + "px";
              }
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
            if (beeBottom + 50 - hero.offsetHeight > 0) {
                // If not, update the hero's position
                beeBottom -= 50;
                hero.style.bottom = beeBottom + "px";
              }
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
            if (beeLeft + hero.offsetWidth < screenWidth) {
                // If not, update the hero's position
                beeLeft += 50;
                hero.style.left = beeLeft + "px";
              }
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
            if (beeLeft + 30 - hero.offsetWidth > 0) {
                // If not, update the hero's position
                beeLeft -= 50;
                hero.style.left = beeLeft + "px";
              }
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
})

let enemyId = 0;
let enemyId2 = 0;
let enemyId3 = 0;
let enemyId4 = 0;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function collision (){
    hero.remove();
    gameOver.innerHTML = "GAME OVER <br/>";
    playerAlive = false;
    let newGameBtn = document.createElement("button");
    newGameBtn.innerHTML = "NEW GAME";
    newGameBtn.id = "newGameBtn";
    gameOver.appendChild(newGameBtn);
    revertSlideshow();
    //Save time
    let highScore = JSON.parse(localStorage.getItem("Highscore"));
    highScore.push(timer.innerHTML);
    localStorage.setItem("Highscore", JSON.stringify(highScore));

    let arr = JSON.parse(localStorage.getItem("Highscore"));
    document.getElementById("highScore").innerHTML = "Highscore: " + largest(arr);
    totalSeconds = 0;

        newGameBtn.onclick = function() {
            location.reload();
        }
    }
  

function createEnemy() {

  /*   if (randNum > 0) {
        createEnemy((randNum - 1))
    };
 */
    let delay = rand(40,60);
    enemyId++;
    let enemy = document.createElement("img");
    enemy.classList = "enemy";
    let enemyBottom = document.documentElement.clientHeight;
    let enemyLeft = Math.floor(Math.random() * document.documentElement.clientWidth / 10) * 9.5;

    enemy.src = "spider.png"
    enemy.style.left = enemyLeft + "px";
    enemy.style.bottom = enemyBottom + "px";

    let run = setInterval(() => {

        enemyBottom += enemySpeed;
        enemy.style.bottom = enemyBottom + "px";

        let direction = rand(-50,40);
        enemyLeft += direction;
        if (enemyLeft < 0) enemyLeft = 0;
        enemy.style.left = enemyLeft + "px";

        if (Math.abs(enemyBottom - beeBottom) < 50 && Math.abs(enemyLeft - beeLeft) < 50) {
            collision();
            clearInterval(run);
            enemy.remove();
            
        }

        if (enemyBottom <= -100) {
            clearInterval(run)
            enemy.remove();
            
            if (playerAlive) {
                createEnemy();
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
                }
            }
        }

    }, delay);
    game.appendChild(enemy);
}

function createEnemyRight() {

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

    let run = setInterval(() => {

        enemyLeft2 += enemySpeed2;
        enemy2.style.left = enemyLeft2 + "px";

        if (Math.abs(enemy2.offsetTop - hero.offsetTop) < 150 && Math.abs(enemyBottom2 - beeBottom) < 150 && Math.abs(enemy2.offsetLeft - hero.offsetLeft) < 75) {
            collision();
            clearInterval(run);
            enemy2.remove();
        }
        if (enemyLeft2 <= -250) {
            clearInterval(run)
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

function createEnemyLeft() {

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

    let run = setInterval(() => {
        enemyRight3 += enemySpeed3;
        enemy3.style.right = enemyRight3 + "px";

        if (Math.abs(enemy3.offsetTop - hero.offsetTop) < 50 && Math.abs(enemy3.offsetLeft - beeLeft) < 50) {
            collision();
            clearInterval(run);
            enemy3.remove();
        }
        if (enemyRight3 <= -100) {
            clearInterval(run)
            enemy3.remove();
            if (playerAlive) {
                createEnemyLeft();
                }
            }

    }, delay);
    game.appendChild(enemy3);
}


function createEnemyTop() {
    let delay = rand(40,60);
    enemyId4++;
    let enemy4 = document.createElement("img");
    enemy4.classList = "enemy4";
    let enemyLeft4 = Math.floor(Math.random() * document.documentElement.clientWidth / 10) * 9;
    let enemyTop4 = 1000;

    enemy4.src = "spiderUp.png"
    enemy4.style.left = enemyLeft4 + "px";
    enemy4.style.top = enemyTop4 + "px";
    enemy4.id = enemyId4;

    let run = setInterval(() => {
        enemyTop4 += enemySpeed4;
        enemy4.style.top = enemyTop4 + "px";

        if (Math.abs(enemyTop4 - hero.offsetTop) < 50 && Math.abs(enemyLeft4 - beeLeft) < 50) {
            collision();
            clearInterval(run);
        }
        if (enemyTop4 <= -100) {
            clearInterval(run)
            enemy4.remove();
            if (playerAlive) {
                createEnemyTop();
                }
                if((totalSeconds > 90)) {
                    enemySpeed4 = -30;
                      }
            }

    }, delay);
    game.appendChild(enemy4);
}


var totalSeconds = 0;


const { beginSlideshow, revertSlideshow } = (() => {
    let interval = 0;
    function beginSlideshow() {
        interval = setInterval(function () {
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
        }, 1000);
    }

    function revertSlideshow() {
        clearInterval(interval);
        interval = 0;
    }

    return { beginSlideshow, revertSlideshow };
})();


function timerEnemies () {

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

      setTimeout(() => {
        createEnemy();
      }, "35000")
      
      setTimeout(() => {
          createEnemyRight();
        }, "40000")
  
        setTimeout(() => {
          createEnemyLeft();
        }, "50000")
  
        setTimeout(() => {
          createEnemyTop();
        }, "60000")

        setTimeout(() => {
            createEnemy();
          }, "70000")
        setTimeout(() => {
            createEnemyRight();
          }, "70000")
    
          setTimeout(() => {
            createEnemyLeft();
          }, "80000")
    
          setTimeout(() => {
            createEnemyTop();
          }, "90000")
        }

startButton.addEventListener("click", () => {  
        hero.style.display = "block";
        gameOver.innerHTML = "";
        beginSlideshow();
        timerEnemies();
        startButton.remove();
        })


        requestAnimationFrame()

