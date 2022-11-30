let hero = document.getElementById("hero");
let game = document.getElementById("game");
let highScore = document.getElementById("highScore");
let messageElement = document.getElementById("message");
let scoreValue = 0;

let playerAlive = true;
let bottom = 500;
let left = 500;

let enemySpeed = -20;
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
    
    // Initialize maximum element 
    let max = arr[0]; 

    // Traverse array elements  
    // from second and compare 
    // every element with current max  
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
            bottom += 20;
            hero.style.bottom = bottom + "px"
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
            bottom -= 20;
            hero.style.bottom = bottom + "px";
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
            left += 20;
            hero.style.left = left + "px"
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
            left -= 20;
            hero.style.left = left + "px";
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
        enemyLeft +- enemySpeed;
        enemy.style.left = enemyLeft + "px";

        //Collision detector
        //if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
        if (Math.abs(enemyBottom - bottom) < 25 && Math.abs(enemyLeft - left) < 25) {
            console.log("HERO HIT");
            hero.remove();
            messageElement.innerHTML = "Game over <br/>";
            //clearInterval(move)
            clearInterval(move)
            playerAlive = false;
            enemy.remove();
            let newGameBtn = document.createElement("button");
            newGameBtn.innerHTML = "New game";
            messageElement.appendChild(newGameBtn);
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
                
                /* if (randNum > 0) {
                    createEnemy((randNum - 1))
                    } */
                
                if((totalSeconds > 10 && totalSeconds < 20) || (totalSeconds > 40 && totalSeconds < 45)) {
              createEnemy();
              createEnemy();
                      }
                      
                      
            
                }
            }

    }, 60);
    game.appendChild(enemy);
}

createEnemy();
