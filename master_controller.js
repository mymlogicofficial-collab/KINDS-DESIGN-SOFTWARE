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
import SensorCalibration from '../hardware/logic/sensor_calibration.js';

// Inside your handleCanvasTap function:
handleCanvasTap: (signalStrength) => {
    const result = SensorCalibration.validateTap(signalStrength);
    
    if (result === "VALID_DOUBLE_TAP") {
        MagneticController.processTap(2);
        // Visual feedback on screen
        console.log("Canvas Locked: Magnet Engaged");
    }
}
// Inside MasterController.init:
import BootSequence from './logic/boot_sequence.js';

init: () => {
    // ... previous init code ...
    BootSequence.run();
}
// SE CUSTOMS - K.I.N.D.S. MASTER CONTROL v2.0
import { Identity } from './config/identity_branding.js';
import BootSequence from './logic/boot_sequence.js';
import InfiniteRuler from './logic/infinite_ruler.js';
import SRuler from './logic/s_ruler_logic.js';
import MagneticController from '../hardware/drivers/magnetic_controller.js';
import SensorCalibration from '../hardware/logic/sensor_calibration.js';

const MasterController = {
    state: {
        isSystemReady: false,
        activeTool: 'standard', // 'standard', 'compass', 's-ruler'
        isLocked: false
    },

    init: async () => {
        console.log(`${Identity.fullName} initialization starting...`);
        
        // 1. Run the visual/hardware handshake
        await BootSequence.run();
        
        // 2. Set system state
        MasterController.state.isSystemReady = true;
        console.log(Identity.getGreeting());
    },

    // 1. KINETIC INPUT: Handle 2x Tap (Magnet) and 2.1s Hold (Compass)
    handleInteraction: (type, data) => {
        if (!MasterController.state.isSystemReady) return;

        switch(type) {
            case 'TOUCH_START':
                // Begin 2.1s timer for Infinite Ruler / Compass
                InfiniteRuler.startHold(data.x, data.y);
                break;

            case 'TOUCH_END':
                // Cancel hold timer if lifted before 2.1s
                InfiniteRuler.cancelHold();
                break;

            case 'PHYSICAL_TAP':
                // Signal from tap sensors (GPIO 14/15)
                const valid = SensorCalibration.validateTap(data.strength);
                if (valid === "VALID_DOUBLE_TAP") {
                    MagneticController.processTap(2);
                    MasterController.state.isLocked = true;
                }
                break;
        }
    },

    // 2. INTELLECTUAL INPUT: Geometry Constraints
    applyGeometry: (toolType, points) => {
        if (toolType === 'S_RULER') {
            return SRuler.calculateCurve(points.p0, points.p1, points.p2, points.p3);
        }
        // Additional tool math logic here
    }
};

// Bind to window for global access (Buttons, HTML, Terminal)
window.MasterController = MasterController;
MasterController.init();
