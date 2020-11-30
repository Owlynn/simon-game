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
        app.clearSequences() 
    },
    
    activateTriggers () {
        document.querySelector(".start-game").addEventListener("click", app.createRobotSequence);
    },
    startGame (){
        let startButton = document.querySelector(".start-game");
        startButton.onclick = app.createRobotSequence();
    },
    createRobotSequence(){
        app.playerMessage.innerHTML="Concentrez vous et retenez l'odre d'apparition des couleurs...";
        app.playerMessage.style.visibility="visible";
            for (let i = 0; i < 4; i++) {
                let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)]
                app.robotSequence.push(randomColor)
            }
        console.log(app.robotSequence);
        // app.createUserSequence();
    },
    // createUserSequence(event){
    //    app.playerMessage.innerHTML="C'est à votre tour !";
    //    let currentTrigger = event.target;
    //    app.userSequence.push(currentTrigger.classList[1])
    //    console.log(app.robotSequence);
    // },
    clearSequences() {
        app.robotSequence = []
        app.userSequence = []
        app.playerMessage.style.visibility="hidden";
    }
};

document.addEventListener('DOMContentLoaded', app.init);
