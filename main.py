from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import StringProperty, NumericProperty, BooleanProperty, ListProperty

class KindsRoot(BoxLayout):
    active_tool_name = StringProperty("3H")
    last_tool_name = StringProperty("None")
    eraser_active = BooleanProperty(False)
    
    # Drawer States
    drawer_e_open = BooleanProperty(False)
    drawer_f_open = BooleanProperty(False)
    drawer_g_open = BooleanProperty(False)
    
    # Dual Color Properties for Drawer G
    color_1_hue = NumericProperty(0)
    color_1_light = NumericProperty(50)
    color_2_hue = NumericProperty(180) # Opposite side of wheel
    color_2_light = NumericProperty(50)

    def toggle_eraser(self):
        self.eraser_active = not self.eraser_active

    def toggle_drawer(self, drawer):
        # Only one drawer open at a time to save space
        self.drawer_e_open = (drawer == 'E' and not self.drawer_e_open)
        self.drawer_f_open = (drawer == 'F' and not self.drawer_f_open)
        self.drawer_g_open = (drawer == 'G' and not self.drawer_g_open)

class KindsApp(App):
    def build(self):
        return KindsRoot()

if __name__ == '__main__':
    KindsApp().run()
    
