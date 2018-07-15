import HomeScreen from './HomeScreen';
import SideMenu from "./SideMenu/SideMenu";
import { createDrawerNavigator } from 'react-navigation';

export default createDrawerNavigator({
    HomeScreen: { screen: HomeScreen }
}, {
    contentComponent: SideMenu,
    drawerWidth: 300
});