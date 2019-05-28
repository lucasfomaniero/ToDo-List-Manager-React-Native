import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default class HeaderGradient extends React.Component {
    render() {
        return (
            <LinearGradient
                colors={["#667eea", "#764ba2"]}
                style={{flex: 1}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            />
        );
    }
}