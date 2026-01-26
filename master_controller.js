// SE CUSTOMS - MASTER INTEGRATION HUB
import AbbAppearance from './assets/scripts/abb_core.js';
import CreationStation from './hardware/logic/creation_station.js';
import TaskInterface from './hardware/logic/task_interface.js';
import MagneticController from './hardware/drivers/magnetic_controller.js';
import MemoryCore from './src/logic/memory_core.js';
import { ColorAssist } from './src/logic/color_assist.js';

const MasterController = {
    state: {
        activeTask: null,
        magnetsEngaged: false,
        lastInteraction: Date.now()
    },

    init: () => {
        console.log("SE CUSTOMS: Systems Online.");
        // Initialize Abb's visual profile (5% softened/glassy)
        MasterController.updateAbbProfile(AbbAppearance);
    },

    // 1. HARDWARE BRIDGE: 2x Tap Canvas Logic
    handleCanvasTap: (tapCount) => {
        if (tapCount === 2) {
            const status = MagneticController.processTap(2);
            this.state.magnetsEngaged = true;
            console.log(`Hardware: ${status}`);
        }
    },

    // 2. TASK SELECTOR BRIDGE: Drawer & Assist Scaling
    onTaskSelect: (version) => {
        this.state.activeTask = version;
        
        // Unlocks drawers (1-2 for V1, 1-6 for V3)
        TaskInterface.setActiveTask(version);
        
        // Updates the Color Assist sensitivity based on age/version
        ColorAssist.triggerWowEffect(); 
        
        console.log(`Project Loaded: ${version}`);
    },

    // 3. ABB PERSONALITY BRIDGE: Curios Cabinet
    onNewTrophyAdded: (id, name) => {
        MemoryCore.logNewCurio(id, name);
        // Visual cue for Abb to acknowledge the growth
    },

    updateAbbProfile: (config) => {
        // Appends the pearlescent glassy CSS to the interface
        document.body.style.setProperty('--abb-glow', config.vortexBase.color);
    }
};

// Global access for the HTML buttons
window.MasterController = MasterController;
MasterController.init();
// ADD TO THE TOP with other imports
import { ColorAssist } from './logic/color_assist.js';

// ADD THIS inside the MasterController object
const MasterController = {
    // ... previous code ...

    // The Bridge: Screen Touch -> Color Assist logic
    handleCanvasTouch: (event) => {
        const canvas = document.getElementById('drawingCanvas');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Trigger the "wow" assist
        const color = "#00ffff"; // Default SE Customs Teal
        ColorAssist.applyFloodFill(canvas, x, y, color);
        
        // Let Abb react to the "wow" moment
        ColorAssist.triggerWowEffect();
    }
};

// Initialize the listener
document.getElementById('drawingCanvas').addEventListener('click', MasterController.handleCanvasTouch);
