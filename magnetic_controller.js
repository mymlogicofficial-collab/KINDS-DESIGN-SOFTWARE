// SE CUSTOMS - MAGNETIC SENSOR DRIVER
const MagneticController = {
    pins: { sensor_L: "GPIO_14", sensor_R: "GPIO_15", electromagnet: "GPIO_18" },
    
    // Logic for the 2x tap on the workbench canvas
    processTap: (tapCount) => {
        if (tapCount === 2) {
            hardware.digitalWrite(this.pins.electromagnet, 'HIGH');
            return "CANVAS_LOCKED";
        }
    },

    release: () => {
        hardware.digitalWrite(this.pins.electromagnet, 'LOW');
        return "CANVAS_RELEASED";
    }
};

export default MagneticController;

