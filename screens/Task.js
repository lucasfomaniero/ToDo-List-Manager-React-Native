import React from "react";
import styled from "styled-components";
import {Alert} from "react-native";
import {deleteTaskOnFireBaseAsync, writeTaskOnFirebaseAsync} from "../src/services/Firebase";
import Icon from "react-native-vector-icons/Ionicons";

export default class Task extends React.Component {
  state = {
    key: "",
    title: "",
    resume: "",
    priority: true,
    isDone: false,
    isEditing: false
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
        isDone: task.isDone,
        isEditing: true
      };
    } catch (e) {
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title:
          navigation.state.params === undefined
              ? "New Task"
              : navigation.state.params.title
    };
  };

  render() {
    return (
        <Container>
          <Input
              placeholder={"Task Title"}
              value={this.state.title}
              onChangeText={value => this._titleHasChanged(value)}
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
          <SaveButton onPress={() => this._saveTaskAsync()}>
            <ButtonText>Save</ButtonText>
          </SaveButton>
          {this._displayDeleteButton()}
        </Container>
    );
  }

  _titleHasChanged(value) {
    this.setState({title: value});

    if (this.state.title === '') {
      this.props.navigation.setParams({title: "New Task"})
    } else {
      this.props.navigation.setParams({title: value});
    }

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

  async _deleteTaskAsync() {
    let task = this.state;
    try {
      await deleteTaskOnFireBaseAsync(task);
      this.props.navigation.goBack();
    } catch (e) {
      Alert.alert("Error deleting  the task", e.message);
    }
  }

  _displayDeleteButton() {
    if (this.state.isEditing) {
      return (
          <DeleteButton onPress={() => this._deleteTaskAsync()}>
            <Icon
                name="ios-trash"
                size={32}
                color={"#fff"}
                style={{marginRight: 16}}
            />
            <ButtonText>Delete Task</ButtonText>
          </DeleteButton>
      );
    }
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 10px 20px;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: "gray",
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

const SaveButton = styled.TouchableOpacity`
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

const DeleteButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  height: 40px;
  background-color: #ff3b30;
  border-radius: 8px;
`;
