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

