// SE CUSTOMS - WORKSPACE FUNCTIONAL GLUE
const creationStation = {
    // 1. MAGNETIC CANVAS (2X TAP)
    canvasLock: (input) => {
        if (input.type === 'double_tap') {
            system.toggleMagnets();
            abb.speak("Locked and loaded.");
        }
    },

    // 2. TOOLBOX SCALING
    loadTask: (taskID, age) => {
        const drawerMapping = {
            'B1_Young': [1, 2],
            'Pro': [1, 2, 3, 4, 5, 6]
        };
        hardware.openDrawers(drawerMapping[age]);
    },

    // 3. CURIOS CABINET (PERSONAL MEMORY)
    onNewItemAdded: (itemType) => {
        userProfile.achievements.push(itemType);
        abb.memorize(itemType); 
    }
};

// SE CUSTOMS - CREATION STATION FUNCTIONAL LOGIC
const CreationStation = {
    // MAGNETIC CANVAS SYSTEM
    magnets: {
        state: "OFF",
        trigger: "double_tap",
        action: function() {
            this.state = this.state === "OFF" ? "ON" : "OFF";
            console.log(`Canvas Magnets: ${this.state}`);
            return `Magnets ${this.state}`;
        }
    },

    // TOOLBOX & CURIOS CABINET
    storage: {
        toolbox: "slides_out", // Tool storage area
        curiosCabinet: "stationary_display", // Personal touches/trophies
        
        loadTask: function(ageGroup, version) {
            // Adjusts tools based on Task Selector (B1 Young v1/v2/v3)
            const drawerAccess = ageGroup === "B1_Young" ? 2 : 6;
            return `Opening ${drawerAccess} drawers for Version ${version}`;
        }
    }
};

export default CreationStation;
