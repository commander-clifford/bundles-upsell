import React, { Component } from 'react';
import Header from '../components/header';

const copy = {
    "basic": {
        "planName": "Basic Plan",
        "planValues": "watch on 1 device in SD",
        "planPrice": "$0",
        "planPeriod": "/month"
    },
    "standard": {
        "planName": "Standard Plan",
        "planValues": "watch on 2 devices in HD",
        "planPrice": "$3",
        "upgradePrice": "$0",
        "planPeriod": "/month"
    },
    "premium": {
        "planName": "Premium Plan",
        "planValues": "watch on 4 devices in 4K",
        "planPrice": "$6",
        "upgradePrice": "$3",
        "planPeriod": "/month"
    }
}

class Confirm extends Component {
    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('confirm-container', { orientation: 'horizontal' });
        navigation.register('watch-button', { parent: 'confirm-container', orientation: 'horizontal', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });
        navigation.register('back-button', { parent: 'confirm-container', orientation: 'horizontal', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        // Set inital focus
        navigation.focus('watch-button');
    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('confirm-container');

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
        const version = this.props.match.params.version;

        /*const el = document.getElementById(id);
        el && el.classList.remove('focused');
        el && el.classList.add('selected');*/

        /*if(id === 'back-button') {
            this.props.history.goBack();
        } else if(id === 'watch-button' && version !== 'c') {
            this.props.history.push('/' + version + '/welcome');
        }*/

        if(id === 'back-button') {
            this.props.history.goBack();
        } else if(id === 'watch-button') {
            this.props.history.push('/' + version + '/loading-member');
        }
    };

    render() {
        const planType = localStorage.getItem('planType') ? localStorage.getItem('planType') : 'basic';
        const version = this.props.match.params.version;

        return (
            <div id="confirm-container" className="container vlv-blur">

                <Header version={version} watch={true} confirm={true} />

                    <div className="content-container">
                        <div className="art__stagger-in art__stagger-out">
                            {version === 'c' &&
                                <div>
                                    <h1>Let’s confirm your upgrade</h1>
                                    <h2>Review your updates below. You can make changes<br />to your Netflix plan anytime at Netflix.com.</h2>
                                </div>
                            }
                            {version !== 'c' &&
                                <div>
                                    <h1>Get ready to start watching!</h1>
                                    <h2>You’ll get an email to set up your password, and you can make changes<br />to your Netflix plan anytime at Netflix.com.</h2>
                                </div>
                            }
                        </div>
                        <div className="art__stagger-in art__stagger-out">
                            <ul id="confirm-order-list">
                                <li><strong>Your Netflix login:</strong> youremail@example.com</li>
                                <li id="order-list-plan"><strong>{copy[planType].planName}</strong>, {copy[planType].planValues}</li>
                                {version === 'c' &&
                                    <li id="order-list-price"><strong>{copy[planType].upgradePrice}{copy[planType].planPeriod}</strong> billed to your Xfinity account</li>
                                }
                                {(version !== 'c' && planType === 'basic') &&
                                    <li id="order-list-price">
                                        <strong>No extra charge,</strong> included with your Xfinity account
                                    </li>
                                }{(version !== 'c' && planType !== 'basic') &&
                                    <li id="order-list-price"><strong>{copy[planType].planPrice}{copy[planType].planPeriod}</strong> billed to your Xfinity account</li>
                                }
                            </ul>
                        </div>
                    </div>

                    <footer className="art__stagger-in art__stagger-out">
                        <div className="buttons-container">
                            <span id="watch-button" className="button">Start Watching</span>
                            <span id="back-button" className="button">Go Back</span>
                        </div>

                        <p className="confirm-agreement">By clicking <strong>&lsquo;Start watching,&rsquo;</strong> you agree to the Netflix Terms of Use, Privacy Statement, and confirm you’re over 18.</p>
                    </footer>



            </div>
        )
    }
}

export default Confirm;
