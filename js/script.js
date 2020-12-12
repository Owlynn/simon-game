const app = {

// PROPERTIES
    robotSequence : [],
    userSequence : [],
    availableColors : ["red", "green", "blue","yellow"],
    playerMessage : document.querySelector(".player-message"),
    startButton : document.querySelector(".start-game"),
    levelUpButton : document.querySelector(".level-up"),
    level: document.querySelector(".level"),
    currentLevel:1,
    maxColors : 4,
    allTriggers: document.querySelectorAll(".trigger"),
    
    // METHODS
    init () {
        app.startGame();
    },
    startGame (){
        app.startButton.addEventListener("click", app.createRobotSequence);
        app.level.innerHTML = "Niveau 1";
    },
    createRobotSequence() {
        app.updateDOM("Concentrez vous et retenez l'odre d'apparition des couleurs...", "block","none","none");

        // chooses random colors and puts it into an array
        for (let i = 0; i < app.maxColors; i++) {
            let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)];
            app.robotSequence.push(randomColor);
        }
        console.log(app.robotSequence);
        app.displayRobotSequence();
        
    },
    displayRobotSequence() {
    // changes the colors of the triggers at specified intervals.
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
                app.allTriggers.forEach((colorTrigger) => {
                    colorTrigger.addEventListener("mousedown", app.createUserSequence);  
                    colorTrigger.addEventListener("mouseleave", app.handleMouseleave);                      
                    colorTrigger.addEventListener("mouseover", app.handleMouseover);   
                });
                app.updateDOM("C'est à votre tour ! Reproduisez la séquence de couleurs");
                clearInterval(deactivateClass);
            }
        }
        , 1100
        );
    },
    updateDOM(playerMessage, messageDisplay, buttonDisplay,levelDisplay){
        app.playerMessage.innerHTML = playerMessage;
        app.playerMessage.style.display = messageDisplay;
        app.startButton.style.display = buttonDisplay;
        app.levelUpButton.style.display = levelDisplay;
    },
    createUserSequence(event){
        let currentTrigger = event.target; 
        if (app.userSequence.length < app.maxColors ) {
                app.userSequence.push(currentTrigger.dataset.color);
        }
        if(app.userSequence.length == app.maxColors){
            app.checkIfRight();
        }
    },
    removeListeners(){
        console.log("remove listeners");
        app.allTriggers.forEach((colorTrigger) => {
            console.log("remove listeners foreach");
            colorTrigger.removeEventListener("mouseover", app.handleMouseover);                    
            colorTrigger.removeEventListener("mouseleave", app.handleMouseleave);
            colorTrigger.className = "trigger " + colorTrigger.dataset.color;                       
        });
    },
    handleMouseover (event) {
        event.target.classList.add(event.target.dataset.color + "--active");
    },
    handleMouseleave (event) {
        event.target.classList.remove(event.target.classList[2]);
    },
    checkIfRight() { 
        console.log("check if right");
        app.removeListeners();
        
        let robotString = app.robotSequence.toString();
        let userString = app.userSequence.toString();
        
        if(robotString == userString ) {
            app.updateDOM("Bravo, vous avez gagné","block","none","block");
            // app.levelUpButton.style.display = "block";
            app.levelUpButton.onclick = app.levelUp;
        } 
        if(robotString != userString){
            app.clearSequences();
            // updateDOM(playerMessage, messageDisplay, buttonDisplay,levelDisplay)
            app.updateDOM("Pas de chance, vous vez perdu !", "block", "block","none");
            // app.startButton.style.display = "block";
            app.startButton.onclick = app.startGame;
            app.startButton.innerHTML = "Recommencer une partie";
            app.maxColors = 4;
            app.currentLevel = 1;
        }
    },
    levelUp (){
        console.log("levelup");
        app.maxColors ++;
        app.currentLevel++;
        app.level.innerHTML = "Niveau " + app.currentLevel;
        app.clearSequences();
        app.createRobotSequence();
    },
    clearSequences() {
        app.robotSequence = [];
        app.userSequence = [];
    }
};

document.addEventListener('DOMContentLoaded', app.init);