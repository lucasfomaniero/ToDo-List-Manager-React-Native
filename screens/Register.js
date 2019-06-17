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
import {createUserOnFirebaseAsync} from "../src/services/Firebase";

const img = require("../assets/logo.png");

export default class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  static navigationOptions = {
    title: "Register",
    headerBackTitle: "Back",
    headerTintColor: "white"
  };

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.topView}>
              <Image style={styles.img} source={img}/>
              <View>
                <Text style={styles.title}>Registering new user</Text>
              </View>
            </View>
            <View style={styles.bottomView}>
              <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType={"email-address"}
                  autoCapitalize="none"
                  onChangeText={email => this.setState({email})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({password})}
              />

              <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => this._createUserAsync()}
              >
                <Text style={styles.loginText}>Register User</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }

  async _createUserAsync() {
    try {
      const user = await createUserOnFirebaseAsync(
          this.state.email,
          this.state.password
      );
      Alert.alert(
          `User Created!`,
          `The user with e-mail ${this.state.email} was successfully created.`,
          [
            {
              text: "Ok",
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ]
      );
    } catch (error) {
      Alert.alert(`Failed to create user. Error: ${error.message}`);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },

  topView: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    padding: 25
  },

  img: {
    width: 50,
    height: 50
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20
  },

  bottomView: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 20,
    paddingLeft: 20
  },

  input: {
    marginBottom: 20
  },
  loginButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#48a7f2",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 16,
    marginTop: 20,
    width: "60%"
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF",
    paddingLeft: 8,
    paddingRight: 8
  }
});
