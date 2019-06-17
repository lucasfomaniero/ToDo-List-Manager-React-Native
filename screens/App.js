import React from "react";

import {NavigationActions, StackActions} from "react-navigation";
import styled from "styled-components";
import {currentFirebaseUser} from "../src/services/Firebase";

export default class App extends React.Component {
    static navigationOptinos = {
        header: null
    };

    render() {
        return (
            <Container>
                <ActivityIndicator
                    hidesWhenStopped={true}
                    animating={true}
                    size={"large"}
                    color={"#878787"}
                />
            </Container>
        );
    }

    async componentDidMount() {
        let resetNavigation = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "pageLogin"})]
        });

        try {
            const user = await currentFirebaseUser();
            if (user) {
                resetNavigation = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: "pageTaskList"})]
                });
            }
            this.props.navigation.dispatch(resetNavigation);
        } catch (e) {
            this.props.navigation.dispatch(resetNavigation);
        }
    }
}
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ActivityIndicator = styled.ActivityIndicator``;
