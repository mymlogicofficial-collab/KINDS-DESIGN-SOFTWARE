from kivy.properties import NumericProperty, BooleanProperty

class KindsRoot(BoxLayout):
    active_lead = StringProperty("3H")
    active_soft = StringProperty("2B")
    
    # Drawer F Properties
    drawer_f_open = BooleanProperty(False)
    tip_size = NumericProperty(10)
    tip_opacity = NumericProperty(100)
    tip_gression = NumericProperty(50)
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.h_leads = ["3H", "4H", "5H"]
        self.b_leads = ["2B", "4B", "8B"]
        self.h_index = 0
        self.b_index = 0

    def cycle_h_lead(self):
        self.h_index = (self.h_index + 1) % len(self.h_leads)
        self.active_lead = self.h_leads[self.h_index]

    def cycle_b_lead(self):
        self.b_index = (self.b_index + 1) % len(self.b_leads)
        self.active_soft = self.b_leads[self.b_index]

    def toggle_drawer_f(self):
        # Tapping F opens/closes the sliders
        self.drawer_f_open = not self.drawer_f_open
        
