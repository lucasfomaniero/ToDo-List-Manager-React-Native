import React, {Component} from "react";
import Routes from "./src/Routes/Routes";
import NavigationService from "./src/services/NavigationService";

export default class App extends Component<Props> {
  render() {
      return <Routes ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
      }}/>;
  }
}
