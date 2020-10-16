import { createStackNavigator } from "react-navigation-stack"; 
import { createAppContainer } from "react-navigation";
import home from "../screens/home";
import signIn from "../screens/signIn";

const LinkNavigation = createStackNavigator(
    {
      // กำหนด RouteConfigs (Slide 14)
      signIn: signIn,
      home: home,
    },
  );
  
  export default createAppContainer(LinkNavigation);