const app = {

// PROPERTIES
    robotSequence : [],
    userSequence : [],
    availableColors : ["red", "green", "blue","yellow"],
    playerMessage1 : document.querySelector(".player-message"),
    startButton : document.querySelector(".start-game"),
    levelUpButton : document.querySelector(".level-up"),
    level: document.querySelector(".level"),
    currentLevel:1,
    maxColors : 4,
    
    // METHODS
    init () {
        console.log("init ok");
        // app.createUserSequence();
        // app.clearSequences() 
        app.startGame();
        
    },
    
    startGame (){
        app.clearSequences();
        app.startButton.addEventListener("click", app.createRobotSequence)
        app.level.innerHTML = "Niveau 1"
    },
    createRobotSequence() {
        
        app.playerMessage1.innerHTML="Concentrez vous et retenez l'odre d'apparition des couleurs...";
        app.playerMessage1.style.display = "block"
        app.startButton.style.display = "none";
        app.levelUpButton.style.display = "none";
        
        // chooses random colors and puts it into an array
        for (let i = 0; i < app.maxColors; i++) {
            let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)];
            app.robotSequence.push(randomColor);
        }
        console.log(app.robotSequence);
        
        let currentIndex = 0;
        
        let activateClass = setInterval(
            () => {
                if (currentIndex < app.maxColors) {
                    document.querySelector("." + app.robotSequence[currentIndex]).classList.add(app.robotSequence[currentIndex] + ("--active"));
                }
                if (currentIndex > app.maxColors-1) {
                    clearInterval(activateClass);
                }
            }
            , 1000
        );
            
        let deactivateClass = setInterval(
            function() {
                if (currentIndex < app.maxColors) {
                    document.querySelector("." + app.robotSequence[currentIndex]).classList.toggle(app.robotSequence[currentIndex] + "--active");
                    currentIndex++;
                }
                if (currentIndex > app.maxColors-1) {
                    document.querySelectorAll(".trigger").forEach(trigger => {
                    trigger.addEventListener("mousedown", app.createUserSequence)                        
                    });
                    // document.addEventListener("mousedown",app.createUserSequence)
                    app.playerMessage1.innerHTML = "C'est à votre tour ! Reproduisez la séquence de couleurs"
                    clearInterval(deactivateClass);
                }
            }
            , 1100
        );
                
    },
            
    createUserSequence(event){
        let currentTrigger = event.target;
        console.log("longueur: " + app.userSequence.length);
        console.log("max colors " + app.maxColors);
        
        if (app.userSequence.length < app.maxColors ) {
            if (currentTrigger.classList[1] !== undefined) {
                console.log("length inférieur à max colors et classlist existe");
                app.userSequence.push(currentTrigger.classList[1])
            }
        }
        if(app.userSequence.length == app.maxColors){
            console.log("length supérieur à max colors");
            app.checkIfRight();
        }
        console.log("usersequence " + app.userSequence);
    },
    checkIfRight() {
        let robotString = app.robotSequence.toString();
        let userString = app.userSequence.toString();
        
        if(robotString == userString ) {
            app.playerMessage1.innerHTML = "Bravo vous avez gagné !";
            app.levelUpButton.style.display = "block";
            app.levelUpButton.onclick = app.levelUp;
        } 
        if(robotString != userString){
            app.playerMessage1.innerHTML = "C'est perdu !";
            app.startButton.style.display = "block";
            app.startButton.onclick = app.startGame;
        }
    },
    levelUp (){
        app.maxColors ++;
        app.currentLevel++;
        app.level.innerHTML = "Niveau " + app.currentLevel;
        console.log("max colors " + app.maxColors);
        app.clearSequences();
        app.createRobotSequence();
    },
    clearSequences() {
        app.robotSequence = [];
        app.userSequence = [];
    }
};

document.addEventListener('DOMContentLoaded', app.init);
