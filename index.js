/**
 * @format
 */

import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";
import "./src/config/StatusBarConfig";

import {initializeFirebaseAPI} from "./src/services/Firebase";

AppRegistry.registerComponent(appName, () => {
    initializeFirebaseAPI();
    return App;
});
