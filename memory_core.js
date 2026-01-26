// SE CUSTOMS - ABB MEMORY & GROWTH LOGIC
const MemoryCore = {
    cabinetRegistry: [],

    // Logic for Abb to "see" and store personal touches
    logNewCurio: (itemID, itemName) => {
        const timestamp = new Date().toISOString();
        this.cabinetRegistry.push({ id: itemID, name: itemName, date: timestamp });
        
        // Triggers Abb's growth/recognition response
        return `Abb now remembers: ${itemName}`;
    },

    getHistory: () => {
        return this.cabinetRegistry;
    }
};

export default MemoryCore;

