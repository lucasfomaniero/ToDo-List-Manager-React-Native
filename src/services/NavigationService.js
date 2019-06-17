import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    const resetNavigation = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName,
                params,
            })
        ]
    });

    _navigator.dispatch(
        resetNavigation
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
};