import React from "react";
import styled from "styled-components";
import {SectionList} from "react-native";

export default class TaskListView extends React.Component {

    _onClickTask(task) {
        const {navigate} = this.props.navigation;
        navigate("pageTask", task);
    }

    _renderItem(item) {
        return (
            <ItemContainer
                onPress={() => this._onClickTask(item)}
            >
                <ItemTextTitle>{item.title}</ItemTextTitle>
                <ItemText>{item.resume}</ItemText>
            </ItemContainer>
        );
    }

    _renderSectionHeader(data) {
        return (
            <HeaderContainer>
                <HeaderTagContainer>
                    <HeaderTagText>{data.title.substr(0, 1)}</HeaderTagText>
                </HeaderTagContainer>
                <HeaderText>{data.title}</HeaderText>
            </HeaderContainer>
        );
    }

    render() {
        return (
            <SectionList
                sections={[
                    {
                        data: this.props.tasks.filter(task => task.priority),
                        key: "highPriority",
                        title: "High Priority"
                    },
                    {
                        data: this.props.tasks.filter(task => !task.priority),
                        key: "lowPriority",
                        title: "Low Priority"
                    }
                ]}
                renderItem={({item}) => this._renderItem(item)}

                renderSectionHeader={({section}) => this._renderSectionHeader(section)}
            />

        );
    }
}

const Container = styled.View`
  flex: 1;
  padding: 0 10px;
`;

const HeaderContainer = styled.View`
  align-items: center;
  background-color: silver;
  border-radius: 25px;
  flex-direction: row;
  height: 35px;
  margin-top: 10px;
`;

const HeaderTagContainer = styled.View`
  align-items: center;
  background-color: gray;
  border-radius: 25px;
  height: 35px;
  justify-content: center;
  width: 35px;
`;

const HeaderTagText = styled.Text`
  color: #fff;
  font-size: 22;
`;
const HeaderText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const ItemContainer = styled.TouchableOpacity`
  background-color: #f3f2f0;
  height: 75px;
  margin-top: 5px;
  padding: 10px;
`;

const ItemTextTitle = styled.Text`
  font-size: 22;
`;
const ItemText = styled.Text``;
