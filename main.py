from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import StringProperty

class KindsRoot(BoxLayout):
    active_lead = StringProperty("3H")
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.h_leads = ["3H", "4H", "5H"]
        self.h_index = 0

    def cycle_h_lead(self):
        # Cycles through 3H, 4H, 5H
        self.h_index = (self.h_index + 1) % len(self.h_leads)
        self.active_lead = self.h_leads[self.h_index]

    def toggle_drawer(self, drawer_name):
        # This is where we will trigger the drawer animations
        print(f"Opening Drawer {drawer_name}")

class KindsApp(App):
    def build(self):
        return KindsRoot()

if __name__ == '__main__':
    KindsApp().run()
    
