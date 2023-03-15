import React, { Component } from 'react';

class Member extends Component {
    componentDidMount() {
        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }
    }

    handleKeyDownEvents = key => {
        const {
            history,
            match
        } = this.props;

        const version = match.params.version;

        switch(key) {
            case 'Escape':
                history.replace('/');
                break;

            case 'KeyQ':
                history.replace(`/${version}/start`);
                break;

            case 'KeyB':
                switch(version) {
                    case 'a':
                    case 'b':
                        // Skip the loading screen
                        history.replace(`/${version}/confirm`);
                        break;
                    case 'c':
                        // Skip the loading screen
                        history.replace(`/${version}/onramp/people`);
                        break;
                    default:
                        history.goBack();
                }
                break;

            default:
                console.log('handleKeyDownEvents', key);
        }
    }

    render() {
        return (
            <div id="member-container" className="container">
                <img src="../assets/images/member.jpg" alt="default member image" height="1080px" width="1920px" />
            </div>
          )
    }
}

export default Member;
