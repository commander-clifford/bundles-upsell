import React, { Component } from 'react';

let autoTimeout = null;
let autoDelay = 3000;

class Welcome extends Component {
    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation,
            match
        } = this.props;

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        const version = match.params.version;
        if(version === 'c') {
            let autoTimeout = window.setTimeout(this.autoProgress, autoDelay, false);
        }
    }

    componentWillUnmount() {

        // Remove key bindings: this breaks the next route as prev/next overlap during transition
        // document.onkeydown = null;

        const { match } = this.props;
        const version = match.params.version;
        if(version === 'c') {
            window.clearTimeout(autoTimeout);
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
        history.push('/' + version + '/onramp/shows');
    }

    render() {
        const version = this.props.match.params.version;

        return (
            <div id="welcome-container" className="container streams">
                <div>
                    <h1 className="art__stagger-in art__stagger-out">Welcome to Netflix</h1>
                    {version === 'c' &&
                        <h2 className="art__stagger-in art__stagger-out">Let's personalize your account</h2>
                    }
                </div>
                <div className="art__stagger-in art__stagger-out">
                    <div id="loader"></div>
                </div>
            </div>
        )
    }
}

export default Welcome;
