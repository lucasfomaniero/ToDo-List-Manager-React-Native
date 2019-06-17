import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import React from "react";
import {Button} from "react-native";
import {App, DoneTasks, Login, Register, Task, ToDoTasks} from "../../screens/Screens";
import HeaderGradient from "../Components/HeaderGradient";
import {logoutFromFirebaseAsync} from "../services/Firebase";

const tabNavigator = createBottomTabNavigator({
    pageTodoTasks: {
        screen: ToDoTasks,
        title: "To Do Tasks"
    },
    pageDoneTasks: {screen: DoneTasks, title: "Done Tasks"}
});

tabNavigator.navigationOptions = ({navigation}) => {
    const {routes, index} = navigation.state;
    const navigationOptions = {};

    switch (routes[index].routeName) {
        case "pageTodoTasks":
            navigationOptions.title = "Tasks To Do";
            break;
        case "pageDoneTasks":
            navigationOptions.title = "Done Tasks";
            break;
        default:
            navigationOptions.title = undefined;
    }

    navigationOptions.headerRight = (
        <Button
            onPress={() => logoutFromFirebaseAsync()}
            title="Log Out"
            color={"white"}
        />
    );

    return navigationOptions;
};

export default (Routes = createAppContainer(
    createStackNavigator(
        {
            pageApp: {screen: App},
            pageTaskList: tabNavigator,
            pageLogin: {screen: Login},
            pageRegister: {screen: Register},
            pageTask: {screen: Task}
        },
        {
            defaultNavigationOptions: {
                headerBackground: <HeaderGradient/>,
                headerTintColor: "white"
            }
        }
    )
));
