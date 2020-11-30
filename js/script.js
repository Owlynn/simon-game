const app = {

// PROPERTIES
    robotSequence : [],
    userSequence : [],
    availableColors : ["red", "green", "blue","yellow"],
    playerMessage : document.querySelector(".player-message"),

// METHODS
    init () {
        console.log("Youpi");
        app.activateTriggers();
        
    },
    
    activateTriggers () {
        document.querySelectorAll(".trigger").forEach(
            function(e){
            e.addEventListener("click", app.createRobotSequence)
            }
        )
    },
    createRobotSequence(){
        app.playerMessage.innerHTML="Concentrez vous et retenez l'odre d'apparition des couleurs...";
        // app.playerMessage.visibility="visible";
        for (let i = 0; i < 4; i++) {
            let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)]
            app.robotSequence.push(randomColor)
        }
        console.log(app.robotSequence);
        // app.startGame();
    },
    createUserSequence(event){
       let currentTrigger = event.target;
       app.robotSequence.push(currentTrigger.classList[1])
       console.log(app.robotSequence);
    },
    startGame (){
        let startButton = document.querySelector(".start-game");
        startButton.onclick = app.createRobotSequence();
    },
    clearSequences() {
        app.robotSequence = []
        app.userSequence = []
    }
};

document.addEventListener('DOMContentLoaded', app.init);
