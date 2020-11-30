const app = {

// PROPERTIES
    robotSequence : [],
    userSequence : [],

// METHODS
    init () {
        console.log("Youpi");
        document.querySelectorAll(".trigger").forEach(
            function(e){
            e.addEventListener("click", app.createRobotSequence)
            }
        )
       
    },
    createRobotSequence(event){
       let currentTrigger = event.target;
       console.log(currentTrigger.classList[1])
       
    }
  
       
};

document.addEventListener('DOMContentLoaded', app.init);
