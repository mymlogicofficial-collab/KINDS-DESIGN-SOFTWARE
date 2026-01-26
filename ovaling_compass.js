// SE CUSTOMS - OVALING COMPASS LOGIC
// Mechanism: 2 Fixed Points (Foci) and 1 Adjustable Point (Radius/Eccentricity)
const OvalingCompass = {
    calculateEllipse: (center, radiusX, radiusY, rotation) => {
        const points = [];
        // Math for drawing the elliptical path
        for (let i = 0; i <= 360; i += 1) {
            const angle = i * Math.PI / 180;
            const x = center.x + radiusX * Math.cos(angle) * Math.cos(rotation) - radiusY * Math.sin(angle) * Math.sin(rotation);
            const y = center.y + radiusX * Math.cos(angle) * Math.sin(rotation) + radiusY * Math.sin(angle) * Math.cos(rotation);
            points.push({ x, y });
        }
        return points;
    },

    // Fixed // Adjustable // Fixed logic
    updateFromTool: (anchorA, slider, anchorB) => {
        // The distance between the two fixed anchors sets the eccentricity
        const dx = anchorB.x - anchorA.x;
        const dy = anchorB.y - anchorA.y;
        const center = { x: (anchorA.x + anchorB.x) / 2, y: (anchorA.y + anchorB.y) / 2 };
        
        // The 'Slider' determines the height/width ratio
        const radiusX = Math.sqrt(dx*dx + dy*dy) / 2;
        const radiusY = Math.sqrt(Math.pow(slider.x - center.x, 2) + Math.pow(slider.y - center.y, 2));

        return { center, radiusX, radiusY, rotation: Math.atan2(dy, dx) };
    }
};

export default OvalingCompass;

