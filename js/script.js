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
    currentIndex:0,
    activateClass: null,
    deactivateClass: null,
    audioContext: null,
    colorFrequencies: {
        red: 261.63,    // Do
        green: 329.63,  // Mi
        blue: 392.00,   // Sol
        yellow: 523.25  // Do aigu
    },
    
    // METHODS
    init () {
        // Initialiser le contexte audio
        app.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        app.startGame();
    },
    playSound(color) {
        if (!app.audioContext) {
            app.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const frequency = app.colorFrequencies[color];
        if (!frequency) return;
        
        const oscillator = app.audioContext.createOscillator();
        const gainNode = app.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(app.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, app.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, app.audioContext.currentTime + 0.25);
        
        oscillator.start(app.audioContext.currentTime);
        oscillator.stop(app.audioContext.currentTime + 0.25);
    },
    startGame (){
        app.startButton.addEventListener("click", app.createRobotSequence);
        app.level.innerHTML = "Niveau 1";
    },
    createRobotSequence() {
        
        // chooses random colors and puts it into an array
        for (let i = 0; i < app.maxColors; i++) {
            let randomColor = app.availableColors[Math.floor(Math.random() * app.availableColors.length)];
            app.robotSequence.push(randomColor);
        }
        console.log(app.robotSequence);
        app.displayRobotSequence();
        
    },
    displayRobotSequence() {
        app.updateDOM("Concentrez vous et retenez l'odre d'apparition des couleurs...", "block","none","none");
        
        app.currentIndex = 0;
        
        app.activateClass = setInterval(
            () => {
                if (app.currentIndex < app.maxColors) {
                    const currentColor = app.robotSequence[app.currentIndex];
                    document.querySelector("." + currentColor).classList.add(currentColor + ("--active"));
                    app.playSound(currentColor);
                }
            }
            , 1000
        );
        
        app.deactivateClass = setInterval(
            () => {
                if (app.currentIndex < app.maxColors) {
                    document.querySelector("." + app.robotSequence[app.currentIndex]).classList.toggle(app.robotSequence[app.currentIndex] + "--active");
                    app.currentIndex++;
                }
                if (app.currentIndex > app.maxColors-1) {
                    app.finishSequence();
                }
            }
            , 1100
            );
        },
    finishSequence(){
        app.updateDOM("C'est à votre tour ! Reproduisez la séquence de couleurs");
        app.allTriggers.forEach((colorTrigger) => {
            colorTrigger.addEventListener("mousedown", app.createUserSequence);  
            colorTrigger.addEventListener("mouseleave", app.handleMouseleave);                      
            colorTrigger.addEventListener("mouseover", app.handleMouseover);   
        });
        clearInterval(app.activateClass);
        clearInterval(app.deactivateClass);
    },
    updateDOM(playerMessage, messageDisplay, buttonDisplay,levelDisplay){
        app.playerMessage.innerHTML = playerMessage;
        app.playerMessage.style.display = messageDisplay;
        app.startButton.style.display = buttonDisplay;
        app.levelUpButton.style.display = levelDisplay;
    },
    createUserSequence(event){
        let currentTrigger = event.target;
        app.playSound(currentTrigger.dataset.color);
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
            colorTrigger.removeEventListener("mousedown", app.createUserSequence);  
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
            app.updateDOM("Bravo, vous avez gagné !","block","none","block");
            app.levelUpButton.onclick = app.levelUp;
        } 
        if(robotString != userString){
            app.clearSequences();
            app.updateDOM("Pas de chance, vous avez perdu !", "block", "block","none");
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