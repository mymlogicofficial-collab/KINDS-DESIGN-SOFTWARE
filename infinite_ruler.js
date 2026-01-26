// SE CUSTOMS - INFINITE RULER & PIVOT LOGIC
const InfiniteRuler = {
    holdTimer: null,
    isCompassMode: false,
    pivotPoint: { x: 0, y: 0 },

    // Starts timing the hold when the user presses down
    startHold: (x, y) => {
        InfiniteRuler.pivotPoint = { x, y };
        
        // The 2.1s specific requirement
        InfiniteRuler.holdTimer = setTimeout(() => {
            InfiniteRuler.activateCompass();
        }, 2100); 
    },

    cancelHold: () => {
        clearTimeout(InfiniteRuler.holdTimer);
        if (!InfiniteRuler.isCompassMode) {
            console.log("Standard Line Mode");
        }
    },

    activateCompass: () => {
        InfiniteRuler.isCompassMode = true;
        
        // Visual: Light grey circle appears at the pivot
        const overlay = document.getElementById('pivot-overlay');
        overlay.style.left = `${InfiniteRuler.pivotPoint.x}px`;
        overlay.style.top = `${InfiniteRuler.pivotPoint.y}px`;
        overlay.style.display = 'block';

        console.log("COMPASS ACTIVE: Rotate tool 0-359 degrees.");
        // Trigger Abb to acknowledge tool shift
    }
};

export default InfiniteRuler;

