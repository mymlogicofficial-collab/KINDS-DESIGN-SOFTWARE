# K.I.N.D.S. INTERFACE CONTROLLER
# Logic for Tool Optimizing & M2C Beacons

def tool_interaction(selected_tool):
    if selected_tool == "5H_PENCIL":
        # M2C Beacon triggers because there are 2+ options (Pencils 1-6)
        trigger_beacon(color="GREEN", mode="BLINK") 
        if user_viewed_all_options == True:
            stop_beacon() # Stop once the "More Options Below" task is met
            
    elif selected_tool == "PENCIL_7":
        # No blink on #7 (Single adaptive tool)
        stop_beacon() 
        # But Drawer F blinks to show the 4-quadrant sub-options (Triangle/Flat/Taper)
        drawer_F.trigger_beacon(color="GREEN", mode="GLOW")

    elif selected_tool == "PEN_BREAK":
        # Smooth vs Ink Brushes logic
        apply_texture(type="INK_BREAK", smoothness=0.2)
      
# K.I.N.D.S. Beacon Logic
If tool_selected == "5H_Pencil":
    trigger_beacon("GREEN_BLINK") # Alerts for 2+ pencil options
    on_view_complete:
        stop_beacon()

elif tool_selected == "Pencil_7":
    stop_beacon() # No blink on #7 itself
    link_drawer("Drawer_F", "GREEN_GLOW") # Alert for adaptive sub-options
