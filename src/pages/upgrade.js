import React, { Component } from 'react';
import Header from '../components/header';

class Upgrade extends Component {

    componentDidMount() {
        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('upgrade-buttons-container', { orientation: 'horizontal' });
        navigation.register('later-button', { parent: 'upgrade-buttons-container', orientation: 'horizontal', planType: 'standard', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });
        navigation.register('upgrade-button', { parent: 'upgrade-buttons-container', orientation: 'horizontal', planType: 'premium', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        // Set initial focus
        navigation.focus('later-button');
    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('plan-options-container');

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
        const { id, planType } = node;

        // Select new element
        const el = document.getElementById(id);
        el && el.classList.add('selected');

        // Store the planType
        localStorage.setItem('planType', planType);

        // Take action
        const version = this.props.match.params.version;

        /*if(id === 'plan-standard') {
            this.props.history.push('/' + version + '/loading-member');
        } else {
            this.props.history.push('/' + version + '/confirm');
        }*/

        if(id === 'later-button') {
            this.props.history.push('/' + version + '/loading-member');
        } else {
            this.props.history.push('/' + version + '/confirm');
        }

    };

    /*const shows = localStorage.getItem('shows');
        const devices = localStorage.getItem('devices');
        const people = localStorage.getItem('people');
        const classSelected = (shows && shows.includes(label) || devices && devices.includes(label) || people && people.includes(label)) ? ' selected ' : '';*/

    render() {
        const version = this.props.match.params.version;
        const devices = localStorage.getItem('devices');
        const people = localStorage.getItem('people');

        return(
            <div id="upgrade-container" className="container vlv-blur">
                <Header version={version} upgrade={true} />
                <div className="content-container">
                    <div className="upgrade-intro-container">
                        <div className="heading-container art__stagger-in art__stagger-out">
                            <h2>There's a better plan for you!</h2>
                            {devices && devices.includes('4K TV') &&
                                <h1>Get 4K picture quality for your<br/>4K TV.</h1>
                            }
                            {((people && devices) && (people.includes('Two Adults') || people.includes('Family')) && !devices.includes('4K TV')) &&
                                <h1>Watch all you want in more rooms of the house</h1>
                            }
                        </div>
                        <div className="buttons-container art__stagger-in art__stagger-out" id="upgrade-buttons-container">
                            <span id="later-button" className="button">Maybe Later</span>
                            <span id="upgrade-button" className="button">Upgrade to Premium</span>
                        </div>
                    </div>

                    <div className="plans-container">
                        <div className="plan current-plan art__stagger-in art__stagger-out--columns">
                            <h2>Your Plan</h2>
                            <h1>Standard</h1>
                            <i className="plan-value-quality">HD</i>
                            <p>Watch on up to 2 TVs or devices at the same time</p>
                            <div className="plan-price">Included</div>
                        </div>
                        <div className="plan recommended-plan art__stagger-in art__stagger-out--columns">
                            <h2>Recommended</h2>
                            <h1>Premium</h1>
                            <i className="plan-value-quality">4K</i>
                            <p>Watch on up to 4 TVs or devices at the same time</p>
                            <div className="plan-price"><span>$3</span> / month extra</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Upgrade;
