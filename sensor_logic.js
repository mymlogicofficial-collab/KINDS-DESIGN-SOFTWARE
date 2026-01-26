// SE CUSTOMS - SENSOR INPUT PROCESSING
const SensorLogic = {
    tapTimeout: 300, // Time window for double tap
    lastTap: 0,

    // Location: Map to GPIO 14/15 interrupts
    handleSensorInput: function() {
        const currentTime = Date.now();
        if ((currentTime - this.lastTap) < this.tapTimeout) {
            // Double tap detected
            MasterController.onCanvasTap(2);
        }
        this.lastTap = currentTime;
    }
};

export default SensorLogic;

