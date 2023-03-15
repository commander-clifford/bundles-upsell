import React, { Component } from 'react';

let autoTimeout = null,
    autoDelay = 2000;

class LoadingMember extends Component {

    componentDidMount() {
        autoTimeout = window.setTimeout(this.autoProgress, autoDelay, false);

        // Remove key bindings: no clicking
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }
    }

    componentWillUnmount() {
        // Remove timeouts
        window.clearTimeout(autoTimeout);
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
                history.goBack();
                break;

            default:
                console.log('handleKeyDownEvents', key);
        }
    }

    autoProgress = () => {
        const {
            match,
            history
        } = this.props;

        // Take action
        const version = match.params.version;
        history.push('/' + version + '/member');
    }

    render() {

        return (
            <div id="loading-container" className="container">
                <div id="loader"></div>
            </div>
        )
    }
}

export default LoadingMember;
