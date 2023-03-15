import React, { Component } from 'react';

let autoTimeout = null,
    autoDelay = 3000;

class NotNice extends Component {

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

        this.props.history.push('/' + version + '/loading-member');

        // if(version === 'c'){
        //     history.push('/' + version + '/upgrade');
        // } else {
        //     history.push('/' + version + '/plans');
        // }

    }

    render() {

        const version = this.props.match.params.version;

        return (
            <div id="nice-container" className="container vlv-blur with-red">
                <div className="wrapper">
                    <i className="red-check-mark art__stagger-in art__stagger-out"></i>
                    <h1 className="art__stagger-in art__stagger-out">Nice!</h1>

                        <h2 className="art__stagger-in art__stagger-out">We’re setting things up for you.</h2>

                </div>
            </div>
        )
    }
}

export default NotNice;

/**/
