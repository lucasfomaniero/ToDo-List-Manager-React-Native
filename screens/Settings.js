import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components";

export default class Settings extends React.Component {
    static navigationOptions = {
        title: "Settings",
        tabBarLabel: "Settings",
        tabBarIcon: ({tintColor}) => (
            <Icon name="ios-settings" size={26} color={tintColor}/>
        )
    };

    render() {
        return <Container/>;
    }
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;
