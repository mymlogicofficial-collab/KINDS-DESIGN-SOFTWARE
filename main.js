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
            // CABINET ITEM: BLUETOOTH SPEAKER
const SpeakerLogic = {
    patterns: [
        { color: 'cyan', speed: 'slow', symbol: '♪' },
        { color: 'magenta', speed: 'float', symbol: '♫' },
        { color: 'gold', speed: 'fast', symbol: '♯' }
    ],

    onTap: function() {
        // Pick a random visual melody
        const mood = this.patterns[Math.floor(Math.random() * this.patterns.length)];
        
        ui.spawnMusicalBubbles({
            icon: mood.symbol,
            tint: mood.color,
            movement: mood.speed
        });

        // Abb chimes in with a vibe check
        const feedback = ["Catchy.", "I like the rhythm.", "Good choice."];
        abb.speak(feedback[Math.floor(Math.random() * feedback.length)]);
        // 1. SPEAKER TAP (Drawer F/G Logic)
function handleSpeakerTap() {
    const patterns = [
        { color: 'cyan', symbol: '♪' },
        { color: 'magenta', symbol: '♫' },
        { color: 'gold', symbol: '♯' }
    ];
    
    // Set Random Surprise
    const mood = patterns[Math.floor(Math.random() * patterns.length)];
    
    // Trigger Visuals & Abb's vibe check
    ui.spawnMusicalBubbles(mood.symbol, mood.color);
    AbbAssist.acknowledgePersonalTouch('speaker'); // Abb chimes in
}

// 2. THE GROWTH WATCHER (1 Hour Cycle)
function startEnvironmentTimer() {
    let stage = 0;
    setInterval(() => {
        stage = (stage + 1) % 4; // Cycles 0, 1, 2, 3 (Stem to Bloom)
        updatePlanterVisuals(stage);
    }, 900000); // 15 minutes in milliseconds
    // main.js - The Workspace Manager
import AbbAssist from './abb_logic.js';
import CreationStation from './creation_station.js';

const CreativeKInDS = {
    // 1. CURIOSITY TRIGGER (Drawer F/G)
    // Listens for long-hold or repeated taps on the curio shelf
    onCurioAreaInteract: function(areaID) {
        console.log("Morphing toolbox to Decoration Drawers...");
        const drawerToOpen = (areaID === 'living_space') ? 'G' : 'F';
        CreationStation.storage.loadWorkspace('Pro', drawerToOpen); 
    },

    // 2. THE ABB "EXIT" PULSE
    // If they get stuck in a drawer, Abb points to the bench
    handleStuckUser: function() {
        AbbAssist.showGuidance('bench_area'); // Show the hovering hand
        // Trigger the green pulse at Abb's fingertip
        ui.pulse('green', 'bench_area'); 
        // SYSTEM CHECK: PLANTER GROWTH CYCLE
const GrowthTest = {
    testCycle: function() {
        console.log("--- Starting Planter Growth Test ---");
        let stages = ['Small Stem', '4 Leaves', 'Full Bush', 'Random Bloom'];
        
        stages.forEach((stage, index) => {
            setTimeout(() => {
                console.log(`Milestone ${index + 1}: ${stage}`);
                
                if(stage === 'Random Bloom') {
                    // Triggers your "Set Random" color logic
                    const colors = ['Red', 'Blue', 'Purple'];
                    const chosen = colors[Math.floor(Math.random() * colors.length)];
                    console.log(`SUCCESS: Plant bloomed ${chosen}!`);
                    AbbAssist.acknowledgePersonalTouch('plant'); // Abb chimes in
                }
            }, index * 2000); // Fast-forwards to 2-second intervals for the test
        });
    }
};

// Run the test
GrowthTest.testCycle();
        
        
        
        };
    
        
      SE_Customs_App.init();

