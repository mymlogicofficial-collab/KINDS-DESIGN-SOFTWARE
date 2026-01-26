// SE CUSTOMS - SENSOR CALIBRATION & DEBOUNCING
const SensorCalibration = {
    settings: {
        tapWindow: 350,      // Max time (ms) between taps to count as a double-tap
        minSignalTime: 50,   // Ignores static/noise shorter than 50ms
        sensitivity: 0.8,    // 0.0 to 1.0 (Higher = more sensitive)
        lockoutTime: 1000    // 1s pause after success to prevent accidental unlocking
    },

    lastTapTime: 0,
    isLockedOut: false,

    validateTap: function(signalStrength) {
        const now = Date.now();

        // 1. Check Lockout (Safety)
        if (this.isLockedOut) return false;

        // 2. Check Sensitivity Threshold
        if (signalStrength < (1 - this.settings.sensitivity)) return false;

        // 3. Detect Double Tap
        const timeSinceLast = now - this.lastTapTime;
        if (timeSinceLast < this.settings.tapWindow && timeSinceLast > this.settings.minSignalTime) {
            this.triggerLockout();
            return "VALID_DOUBLE_TAP";
        }

        this.lastTapTime = now;
        return "SINGLE_TAP_DETECTED";
    },

    triggerLockout: function() {
        this.isLockedOut = true;
        setTimeout(() => { this.isLockedOut = false; }, this.settings.lockoutTime);
    }
};

export default SensorCalibration;

