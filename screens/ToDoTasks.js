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
        this._renderListView()
    );
  }

  _goToTask() {
    this.props.navigation.navigate("pageTask");
  }

  _renderListView() {
    if (this.state.tasks.length === 0) {
      return (
          <Container style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <DoneImage source={require("../assets/completed-task.png")}/>
            <Text>Você não tem nenhuma tarefa.{"\n"} Toque no + abaixo para criar uma.</Text>
            <Button onPress={() => this._goToTask()}>
              <Icon name="ios-add-circle" size={48} color={"#157EFB"}/>
            </Button>
          </Container>
      );
    } else {
      return (
          <Container>
            <TaskListView tasks={this.state.tasks} navigation={this.props.navigation}/>
            <Button onPress={() => this._goToTask()}>
              <Icon name="ios-add-circle" size={48} color={"#157EFB"}/>
            </Button>
          </Container>
      );
    }
  }

}

const Container = styled.View`
  flex: 1;
  padding: 0 10px;
`;

const Text = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #aaaaaa;
`;
const Button = styled.TouchableOpacity`
  
  position: absolute;
  right: 16px;
  bottom: 16px;
  box-shadow: 2px 2px 3.5px rgba(0, 0, 0, 0.2);
  shadow-radius: 3.5;
`;

const DoneImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: 16px;
`;