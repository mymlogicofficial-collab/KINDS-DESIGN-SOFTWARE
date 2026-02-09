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
    // This is for the creator's space: Fish bowls, plants, personal items.
    onNewItemAdded: (itemType) => {
        userProfile.personalWorkspace.push(itemType); // Moved from 'achievements'
        abb.memorize(itemType); // Abb acknowledges the new desk mate
    },

    // 2. TOOLBOX & CURIOS CABINET
    storage: {
        toolbox: "slides_out", 
        curiosCabinet: "stationary_display", // This stays fixed as the home base
        
        loadWorkspace: function(ageGroup) {
            // "B1_Young" gets the easy layout, Pro gets the full bench.
            const drawerAccess = ageGroup === "B1_Young" ? 2 : 6;
            return `Setting up ${drawerAccess} drawers around your Cabinet items.`;
        }
    }
        
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
            // CURIOS CABINET - PERSONAL TOUCH LIBRARY
const cabinetItems = {
    planters: {
        types: ['orange_clay', 'terricotta', 'black_plastic', 'wooden_barrel'],
        stages: ['stem', 'bush', 'blooms'],
        bloomPatterns: [
            ['blue', 'red', 'purple', 'none'],
            ['blue', 'purple', 'none', 'red'],
            ['purple', 'none', 'blue', 'red']
        ]
    },
    aquarium: {
        fish: ['goldfish', 'clown_fish', 'angel_fish'],
        tanks: ['round', 'square']
    },
    sports: ['baseball_mit', 'mini_helmet', 'foam_finger', 'shoe_on_stand'],
    trophies: ['cup', 'car', 'record', 'mic'], // Records/CDs are much cooler than trophies
    curtains: { 
        colors: ['red', 'blue'], 
        status: 'roped_off', 
        sign: 'SOON' 
    
            
        }
    }
};

export default CreationStation;
