import React, { Component } from 'react';
import Header from '../components/header';

const copy = {
    "a": {
        "heading": "Let’s create your Netflix login",
        "subHeading": "Is this a good email for you? You’ll use it to sign in to Netflix on all your devices.",
        "ctaYes": "Yes, use this email",
        "ctaNo": "No, use a different email"
    },
    "b": {
        "heading": "Let’s create your Netflix login",
        "subHeading": "Is this a good email for you? You’ll use it to sign in to Netflix on all your devices.",
        "ctaYes": "Yes, use this email",
        "ctaNo": "No, use a different email"
    },
    "c": {
        "heading": "Let's set up your account",
        "subHeading": "If everything looks right, you can start your membership in a click.",
        "ctaYes": "Complete Setup",
        "ctaNo": "Change Info"
    }
}

class Account extends Component {
    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('account-container', { orientation: 'horizontal' });
        navigation.register('yes-button', { parent: 'account-container', orientation: 'horizontal', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });
        navigation.register('no-button', { parent: 'account-container', orientation: 'horizontal', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        // Set inital focus
        navigation.focus('yes-button');

        // Special circumstances
        const version = this.props.match.params.version;
        if(version === 'c') {
            document.getElementById('text-container').classList.add('show-top')
        }
    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('account-container');

        // Remove key bindings: this breaks the next route as prev/next overlap during transition
        // document.onkeydown = null;
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
      //const el = document.getElementById(id);
      //el && el.classList.remove('focused');
      //el && el.classList.add('selected');

      // Take action
      const version = this.props.match.params.version;
      if( id === "yes-button" ) {
        switch(version) {
            case 'a':
              // Go to nice and then plans
              this.props.history.push('/' + version + '/nice');
              break;

            case 'b':
              // Go to confirm
              this.props.history.push('/' + version + '/confirm');
              break;

            case 'c':
              // Go to welcome page
              this.props.history.push('/' + version + '/welcome');
              break;

            default:
              console.log('version', version);
        }
      } else {

      }
    };

    render() {
        const version = this.props.match.params.version;

        return (
            <div id="account-container" className="container vlv-blur">
                <Header account={true} version={version} />

                    <div className="content-container art__stagger-in art__stagger-out">
                        <div id="text-container">
                            <h1>{copy[version].heading}</h1>
                            <h2>{copy[version].subHeading}</h2>
                            {version === 'c' &&
                                <ul id="confirm-order-list">
                                    <li><strong>Your Netflix login:</strong> youremail@example.com</li>
                                    <li id="order-list-plan"><strong>Standard Plan,</strong> watch on 2 devices in HD</li>
                                    <li id="order-list-price"><strong>No extra charge,</strong> included with your Xfinity bundle</li>
                                </ul>
                            }
                        </div>
                        {version !== 'c' &&
                            <div id="email-container">
                                <h3>Provided by Xfinity</h3>
                                <p id="provided-email">youremail@example.com</p>
                            </div>
                        }
                    </div>

                    <footer className="art__stagger-in art__stagger-out">
                        <div className="buttons-container">
                            <span id="yes-button" className="button">{copy[version].ctaYes}</span>
                            <span id="no-button" className="button">{copy[version].ctaNo}</span>
                        </div>

                        {version === 'c' &&
                            <p className="agreement">By clicking <strong>&lsquo;Complete Setup,&rsquo;</strong> you agree to the Netflix Terms of Use, Privacy Statement, and confirm you're over 18.</p>
                        }
                    </footer>

            </div>
        )
    }
}

export default Account;
