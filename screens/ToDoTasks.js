import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components";
import TaskListView from "../src/Components/TaskListView";
import {readTasksFromFirebaseAsync} from "../src/services/Firebase";

export default class ToDoTasks extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'To Do',
    tabBarIcon: ({tintColor}) => (
        <Icon name="ios-list-box" size={26} color={tintColor}/>
    )
  };

  state = {
    tasks: []
  };

  componentDidMount(): void {
    readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
  }

  _fetchTasks(tasks) {
    const tasksToDo = tasks.filter(task => !task.isDone);
    this.setState({tasks: tasksToDo});
  }

  render() {
    return (
        <Container>
          <TaskListView tasks={this.state.tasks} navigation={this.props.navigation}/>
          <Button onPress={() => this._goToTask()}>
            <Icon name="ios-add-circle" size={48} color={"#157EFB"}/>
          </Button>
        </Container>
    );
  }

  _goToTask() {
    this.props.navigation.navigate("pageTask");
  }


}

const Container = styled.View`
  flex: 1;
  padding: 0 10px;
`;

const Text = styled.Text`
  font-size: 18px;
`;
const Button = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  bottom: 16px;
  box-shadow: 2px 2px 3.5px rgba(0, 0, 0, 0.2);
  shadow-radius: 3.5;
`;
