import {createAppContainer, createBottomTabNavigator, createStackNavigator} from "react-navigation";
import React from "react";
import {DoneTasks, Login, Register, ToDoTasks} from "../../screens/Screens";

const tabNavigator = createBottomTabNavigator({
    pageTodoTasks: {screen: ToDoTasks, title: "To Do"},
    pageDoneTasks: {screen: DoneTasks, title: "Done"}
});

const tabNavigatorConfig = {
    screen: tabNavigator,
    navigationOptions: {
        title: "Task List"
    }
};

export default (Routes = createAppContainer(
    createStackNavigator({
        pageLogin: {screen: Login},
        pageRegister: {screen: Register},
        pageTaskList: tabNavigatorConfig
    })
));
