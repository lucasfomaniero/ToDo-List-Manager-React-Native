import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';
import TaskListView from "../src/Components/TaskListView";
import {readTasksFromFirebaseAsync} from "../src/services/Firebase";

export default class ToDoTasks extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Done',
        tabBarIcon: ({tintColor}) => <Icon name="ios-checkmark-circle" size={26} color={tintColor}/>

    };

    state = {
        tasks: []
    };

    render() {
        return (
            <Container>
                <TaskListView tasks={this.state.tasks} navigation={this.props.navigation}/>
            </Container>
        );
    }

    componentDidMount(): void {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(task => task.isDone);
        this.setState({tasks: tasksToDo});
    }
}

const Container = styled.View`
   padding: 0 10px;
`;


