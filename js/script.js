const app = {

// PROPERTIES
    robotSequence : [],
    userSequence : [],
    availableColors : ["red", "green", "blue","yellow"],
    playerMessage1 : document.querySelector(".player-message"),
    playerMessage2 : document.querySelector(".player-message-2"),
    startButton : document.querySelector(".start-game"),
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
    },
    createRobotSequence() {
        
        app.playerMessage1.innerHTML="Concentrez vous et retenez l'odre d'apparition des couleurs...";
        app.playerMessage1.style.display = "block"
        app.startButton.style.display = "none";
        
        // chooses random colors and puts it into an array
        
        for (let i = 0; i < 4; i++) {
            let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)];
            app.robotSequence.push(randomColor);
        }
        
        console.log("tableau du robot (robot sequence) " + app.robotSequence);
        
        let currentIndex = 0;
        
        setInterval(
            function () {
                if (currentIndex < app.maxColors) {
                    document.querySelector("." + app.robotSequence[currentIndex]).classList.add(app.robotSequence[currentIndex] + ("--active"));
                }
            }, 1000
            );
            
            let deactivateClass = setInterval(
                function() {
                    if (currentIndex < app.maxColors) {
                        document.querySelector("." + app.robotSequence[currentIndex]).classList.toggle(app.robotSequence[currentIndex] + "--active");
                        currentIndex++
                    }
                    if (currentIndex > app.maxColors-1) {
                        document.addEventListener("mousedown",app.createUserSequence)
                        app.playerMessage1.innerHTML = "C'est à votre tour ! Reproduisez la séquence de couleurs"
                        clearInterval(deactivateClass)
                    }
                }
                , 1100
                );
                
            },
            
            createUserSequence(event){
                let currentTrigger = event.target;
                console.log("longueur: " + app.userSequence.length);
                console.log("max colors " + app.maxColors)
                
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
        
    },
    checkIfRight() {
        let robotString = app.robotSequence.toString();
        let userString = app.userSequence.toString();
        
        if(robotString == userString ) {
            app.playerMessage1.innerHTML = "Bravo vous avez gagné !"
        } 
        if(robotString != userString){
            app.playerMessage1.innerHTML = "C'est perdu !";
            app.startButton.style.display = "block";
            
        }
        app.startButton.onclick = app.startGame();
    },
    clearSequences() {
        app.robotSequence = []
        app.userSequence = []
        // this.startButton.innerHTML = "Commencer la partie"
    }
};

document.addEventListener('DOMContentLoaded', app.init);
