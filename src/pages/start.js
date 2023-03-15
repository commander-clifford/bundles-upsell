import React, { Component } from 'react';

let startButtonFocusTimeout = null,
    startButtonFocusDelay = 1480;

const copy = {
    "a": {
        "heading": "Netflix is included in your cable bundle",
        "subHeading": "Get ready to watch the movies and TV shows everyone's talking about.",
        "cta": "Quick Setup"
    },
    "b": {
        "heading": "Netflix Basic is included in your cable bundle",
        "subHeading": "Let's check out your plan and activate your account.",
        "cta": "Quick Setup"
    },
    "c": {
        "heading": "Netflix is included with your cable subscription",
        "subHeading": "Get ready to watch the movies and TV shows everyone's talking about.",
        "cta": "Quick Setup"
    }
}

class Start extends Component {

    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('start-container', { orientation: 'horizontal' });
        navigation.register('start-button', { parent: 'start-container', orientation: 'horizontal', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        // Set initial focus
        startButtonFocusTimeout = window.setTimeout(function(){navigation.focus('start-button')}, startButtonFocusDelay, false);

    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('start-container');

        // Remove key bindings: this breaks the next route as prev/next overlap during transition
        // document.onkeydown = null;

        // Remove timeouts
        window.clearTimeout(startButtonFocusTimeout);

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
                //history.goBack();
                history.replace(`/${version}/launch`);
                break;

            default:
                console.log('handleKeyDownEvents', key);
        }
    }

    onFocus = node => {
        const el = document.getElementById(node.id);
        el && el.classList.add('focused');
    };

    onBlur = node => {
        const el = document.getElementById(node.id);
        el && el.classList.remove('focused');
    };

    onSelect = node => {
      const { id } = node;

      // Select new element
      const el = document.getElementById(id);
      el && el.classList.add('selected');

      // Take action
      const version = this.props.match.params.version;
      if(version === 'b') {
        this.props.history.push('/' + version + '/video');
      } else {
        this.props.history.push('/' + version + '/account');
      }

    };

    render() {
        const version = this.props.match.params.version;

        return (
            <div id="start-container" className="container vlv">
                <div className="content-container">
                    <div className="logo-container art__stagger-in art__stagger-out">
                        <i className="xfinity-logo"></i>
                        <i className="logo-separator"></i>
                        <i className="netflix-logo logo-red"></i>
                    </div>
                    <div>
                        <h1 className="art__stagger-in art__stagger-out">{copy[version].heading}</h1>
                        <h2 className="art__stagger-in art__stagger-out">{copy[version].subHeading}</h2>
                    </div>
                    <div className="art__stagger-in art__stagger-out">
                        <span id="start-button" className="button"><span className="arrow-container"><i className="arrow"></i></span> {copy[version].cta}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Start;
