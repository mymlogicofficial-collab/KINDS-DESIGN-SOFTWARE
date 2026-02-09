import GeometryEngine from './geometry_eng.js';
import CreationStation from './creation_station.js';
import AbbAssist from './abb_logic.js';

// THE WORKSPACE CORE
const SE_Customs_App = {
    init: function() {
        console.log("Creative KInDS - Workspace Active.");
        this.setupListeners();
    },

    // 1. MAGNETIC LOCK & ROADMAP
    // Listens for the Double Tap and the 2.1s Idle Timer
    handleInteraction: function(type, target) {
        if (type === 'double_tap') {
            CreationStation.magnets.action(); // Locks the canvas
        }
        
        // Start Abb's Timer
        setTimeout(() => {
            AbbAssist.triggerNextMove(target); // Shows the Green Flash
        }, AbbAssist.flashTimer);
    },

    // 2. CURIOS CABINET SYNC
    // When a personal item is added, Abb memorizes it
    addPersonalTouch: function(item) {
        CreationStation.onNewItemAdded(item); // Adds to shelf
        const response = AbbAssist.memorizeEnvironment(item); // Abb speaks
        console.log(response);
        // PLANTER GROWTH LOGIC (1 Hour Cycle)
const PlanterLogic = {
    currentStage: 0,
    growthInterval: 15 * 60 * 1000, // 15 minutes in milliseconds

    startGrowth: function() {
        setInterval(() => {
            this.currentStage++;
            if (this.currentStage > 3) {
                this.currentStage = 0; // Reset or hold at bloom
            }
            this.updateCabinetDisplay();
        }, this.growthInterval);
    },

    updateCabinetDisplay: function() {
        const stages = ['stem', 'four_leaves', 'bush', 'bloom'];
        const currentVisual = stages[this.currentStage];
        console.log(`Planter has grown to: ${currentVisual}`);
        
        // If it blooms, Abb Assist chimes in
        if (currentVisual === 'bloom') {
            AbbAssist.acknowledgePersonalTouch('plant'); 
        }
            // Handles the "Soon" placeholder from your drawing
    renderEmptySlot: function(side) {
        return {
            background: "curtain_red", // or blue
            barrier: "gold_rope",
            label: "COMING SOON",
            status: "locked"
        };
    }
        
      SE_Customs_App.init();

