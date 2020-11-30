const app = {

// PROPERTIES
    robotSequence : [],
    userSequence : [],
    availableColors : ["red", "green", "blue","yellow"],

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
    createUserSequence(event){
       let currentTrigger = event.target;
       console.log(currentTrigger.classList[1])
       app.robotSequence.push(currentTrigger.classList[1])
       console.log(app.robotSequence);
        // if(app.robotSequence.length > 3)
        // app.robotSequence = [];
        // }
    },
    createRobotSequence(){
        for (let i = 0; i < 4; i++) {
            let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)]
            app.robotSequence.push(randomColor)
            console.log(app.robotSequence);
        }
    }
};

document.addEventListener('DOMContentLoaded', app.init);
