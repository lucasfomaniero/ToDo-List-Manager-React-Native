import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

export default class ToDoTasks extends React.Component {
    static navigationOptions = {
        title: 'To Do Tasks',
        tabBarLabel: 'To Do',
        tabBarIcon: ({tintColor}) => <Icon name="ios-list-box" size={26} color={tintColor}/>

    };

    render() {
        return (
            <Container>
                <Text>Estou na tela de TODO</Text>
            </Container>
        );
    }
}

const Container = styled.View`
   padding: 0 10px;
   background-color: aqua;
`;

const Text = styled.Text`
    font-size: 18px;
    
`;
