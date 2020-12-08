const app = {

// PROPERTIES
    robotSequence : [],
    userSequence : [],
    availableColors : ["red", "green", "blue","yellow"],
    playerMessage : document.querySelector(".player-message"),
    maxColors : 4,

// METHODS
    init () {
        console.log("init ok");
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
    createRobotSequence() {
        app.playerMessage.innerHTML="Concentrez vous et retenez l'odre d'apparition des couleurs...";
        app.playerMessage.style.visibility="visible";
    
        // chooses 4 random colors and puts it into an array
    
            for (let i = 0; i < 4; i++) {
                let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)];
                app.robotSequence.push(randomColor);
            }

    
            console.log("tableau de random " + app.robotSequence);
    
            // app.robotSequence.forEach( (currentColor) => {
            //     document.querySelector("." + currentColor).classList.add(currentColor + ("--active"));
            
            //     setTimeout(
                //         function() {
                    //             document.querySelector("." + currentColor).classList.remove(currentColor + "--active");
                    //         }
                    //         ,3000
                    //     );
                    // });

        let currentIndex = 0;
        // let currentColor = app.robotSequence[currentIndex];
        console.log({currentIndex});
        console.log("couleur en cours : "+app.robotSequence[currentIndex]);
        
        setInterval(() => {
                document.querySelector("." + app.robotSequence[currentIndex]).classList.add(app.robotSequence[currentIndex] + ("--active"));
                console.log("j'active la couleur : " + app.robotSequence[currentIndex]);
            }, 3000
            );
            
            setInterval(
                function() {
                    document.querySelector("." + app.robotSequence[currentIndex]).classList.remove(app.robotSequence[currentIndex] + "--active");
                    console.log("je désactive la couleur : " + app.robotSequence[currentIndex]);
                    currentIndex++
                }
                ,4000
                );       
                
    },

    clearSequences() {
        app.robotSequence = []
        app.userSequence = []
        app.playerMessage.style.visibility="hidden";
    }
};

document.addEventListener('DOMContentLoaded', app.init);

// createUserSequence(event){
//    app.playerMessage.innerHTML="C'est à votre tour !";
//    let currentTrigger = event.target;
//    app.userSequence.push(currentTrigger.classList[1])
//    console.log(app.robotSequence);
// },