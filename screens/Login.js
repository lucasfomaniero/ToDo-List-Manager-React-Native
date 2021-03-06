import React, {Component} from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";
import {signInOnFirebaseAsync} from "../src/services/Firebase";

// TODO: get image resource
const img = require("../assets/logo.png");

export default class Login extends Component {
  state = {
    email: this.props.email,
    password: ""
  };

  static navigationOptions = {
    header: null,
    headerBackTitle: "Back"
  };

  render() {
    return (
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.topView}>
              <Image style={styles.img} source={img}/>
            </View>
            <View style={styles.bottomView}>
              <TextInput
                  style={styles.input}
                  value={this.state.email}
                  placeholder="E-mail"
                  keyboardType={"email-address"}
                  onChangeText={text => this.setState({email: text})}
                  autoCapitalize="none"
              />
              <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({password: text})}
                  placeholder="Password"
                  secureTextEntry={true}
              />
              <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => this._signInAsync()}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <View>
                <Text text={this.state.email}/>
                <Text
                    style={styles.textRegister}
                    onPress={() => {
                      const {navigate} = this.props.navigation;
                      navigate("pageRegister");
                    }}
                >
                  Not a member? Let's Register
                </Text>
                <Text/>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }

  async _signInAsync() {
    try {
      const user = await signInOnFirebaseAsync(
          this.state.email,
          this.state.password
      );
      const resetNavigation = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "pageTaskList"
          })
        ]
      });
      this.props.navigation.dispatch(resetNavigation);
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },

  topView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50
  },
  img: {
    width: 200,
    height: 200
  },
  bottomView: {
    flexDirection: "column",
    paddingRight: 20,
    paddingLeft: 20
  },
  input: {
    marginBottom: 20,
    fontSize: 14
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
  textRegister: {
    fontWeight: "bold",
    textAlign: "center"
  },
  loginButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#48a7f2",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 16,
    width: "30%"
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF"
  }
});
