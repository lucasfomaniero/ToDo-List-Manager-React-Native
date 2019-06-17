import React from "react";
import styled from "styled-components";
import {Alert} from "react-native";
import {writeTaskOnFirebaseAsync} from "../src/services/Firebase";

export default class Task extends React.Component {
    state = {
        key: "",
        title: "",
        resume: "",
        priority: true,
        isDone: false
    };

    constructor(props) {
        super(props);
        try {
            const task = this.props.navigation.state.params;
            this.state = {
                key: task.key,
                title: task.title,
                resume: task.resume,
                priority: task.priority,
                isDone: task.isDone
            };

        } catch (e) {

        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params === undefined ? "New Task" : navigation.state.params.title
        }
    };


    render() {
        return (
            <Container>
                <Input
                    placeholder={"Task Title"}
                    value={this.state.title}
                    onChangeText={value => this.setState({title: value})}
                />
                <Input
                    placeholder={"Resume"}
                    value={this.state.resume}
                    style={{height: 100}}
                    onChangeText={value => this.setState({resume: value})}
                />
                <SwitchContainer>
                    <Switch
                        value={this.state.priority}
                        onValueChange={value => this.setState({priority: value})}
                    />
                    <SwitchText>High Priority?</SwitchText>
                </SwitchContainer>
                <SwitchContainer>
                    <Switch
                        value={this.state.isDone}
                        onValueChange={value => this.setState({isDone: value})}
                    />
                    <SwitchText>Is Done?</SwitchText>
                </SwitchContainer>
                <Button onPress={() => this._saveTaskAsync()}>
                    <ButtonText>Save</ButtonText>
                </Button>
            </Container>
        );
    }

    async _saveTaskAsync() {
        const {key, title, resume, priority, isDone} = this.state;

        let task = {key, title, resume, priority, isDone};

        try {
            await writeTaskOnFirebaseAsync(task);
            this.props.navigation.goBack();
        } catch (e) {
            Alert.alert("Error while saving the task", e.message);
        }
    }
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 10px 20px;
`;

const Input = styled.TextInput.attrs({
    placeholderTextColor: "black",
    fontSize: 16
})`
  background-color: #fefefe;
  border-color: lightgray;
  border-radius: 4px;
  border-width: 1px;
  height: 40px;
  margin-bottom: 20px;
  padding: 8px;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
`;

const SwitchText = styled.Text`
  margin: 20px 0;
  font-size: 18;
`;

const Switch = styled.Switch`
  margin: 8px;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #157efb;
  border-radius: 8px;
`;

const ButtonText = styled.TextInput`
  font-size: 18;
  font-weight: bold;
  color: white;
`;
