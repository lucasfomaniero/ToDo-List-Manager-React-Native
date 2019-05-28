import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

export default class ToDoTasks extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Done',
        tabBarIcon: ({tintColor}) => <Icon name="ios-checkmark-circle" size={26} color={tintColor}/>

    };

    render() {
        return (
            <Container>

            </Container>
        );
    }
}

const Container = styled.View`
   padding: 0 10px;
`;


