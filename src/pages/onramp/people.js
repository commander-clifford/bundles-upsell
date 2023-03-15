import React, { Component } from 'react';
import OnrampRow from '../../components/onrampRow';
import Header from '../../components/header';
import _ from 'lodash';

const showItems = [

    {
        "id": "onramp-single",
        "label": "One Adult",
        "image": "../../assets/images/people/OneAdult.jpg"
    },
    {
        "id": "onramp-dual",
        "label": "Two Adults",
        "image": "../../assets/images/people/TwoAdults.jpg"
    },
    {
        "id": "onramp-family",
        "label": "Family",
        "image": "../../assets/images/people/Family.jpg"
    }
]

class People extends Component {
    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('onramp-people-container', { orientation: 'vertical' });

        // LRUD: Row
        navigation.register('onramp-people-content', { parent: 'onramp-people-container', orientation: 'horizontal', type: 'comedy', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        // LRUD: Button
        navigation.register('skip-people-button', { parent: 'onramp-people-container', orientation: 'horizontal', type: 'comedy', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        // Keybindings
        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.keyHandler(event);
        }

        // Set inital focus
        navigation.focus('onramp-people-content');

        // If we had previous selctions, then switch the button
        this.switchPeopleButton();
    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('onramp-people-container');

        // Remove key bindings: this breaks the next route as prev/next overlap during transition
        // document.onkeydown = null;
    }

    keyHandler = _.throttle(function(e) {
        const {
            history,
            match
        } = this.props;

        const version = match.params.version;

        switch(e.key) {
            case 'Escape':
                history.replace('/');
                break;

            case 'KeyQ':
                history.replace(`/${version}/start`);
                break;

            case 'KeyB':
            case 'b':
                history.goBack();
                // history.replace(`/${version}/onramp/devices`);
                break;

            case 'ArrowLeft':
                this.refs.onrampRow.moveRow('back');
                break;

            case 'ArrowRight':
                this.refs.onrampRow.moveRow('forward')
                break;

            default:
                console.log('keyHandler', e.key);
        }
    }, 200);

    onFocus = node => {
        //console.log('focus', node);
        const el = document.getElementById(node.id);
        el && el.classList.add('focused');
    };

    onBlur = node => {
        //console.log('blur', node);
        const el = document.getElementById(node.id);
        el && el.classList.remove('focused');
    };

    onSelect = node => {
        const { id } = node;

        switch(id) {
            case 'onramp-people-content':
                this.refs.onrampRow.onSelect(node);
                this.switchPeopleButton();
                break;

            case 'skip-people-button':
                // Move along...
                const version = this.props.match.params.version;
                //this.props.history.push('/' + version + '/nice');

                const devices = localStorage.getItem('devices');
                const people = localStorage.getItem('people');

                const qualityUpgrade = devices ? devices.includes('4K TV') : false;
                const peopleUpgrade = people ? people.includes('2 or more adults') || people.includes('Family') : false;

                // If devices contains '4K TV' OR people contains '2 or more adults' or 'Family'
                if(qualityUpgrade || peopleUpgrade) {
                    // then show the upgrade offer
                    this.props.history.push('/' + version + '/nice');
                } else {
                    // Else, no up sell, take them to the member experience
                    this.props.history.push('/' + version + '/not-nice');
                }

                break;

            default:
                console.log('select', node);
        }
    };

    //=TODO: Some of this should prob be moved to OnrampRow
    // and then that should just return the number of selected
    // elements.
    switchPeopleButton = () => {
        const container = document.getElementById('onramp-people-container');
        const selections = container.querySelectorAll('.onramp-card.selected');
        const button = document.getElementById('skip-people-button');
        (selections.length > 0) ? button.innerHTML = 'Next' : button.innerHTML = 'Skip';
    }

    render() {
        const version = this.props.match.params.version;

        return(
            <div id="onramp-people-container" className="onramp-container container vlv-blur">
                <Header version={version} shows={true} devices={true} people={true} step={3} />
                <section id="onramp-headings">
                    <h1>Who will be watching?</h1>
                    <h2>We’ll set up profiles, so everyone has a space to watch and save shows.</h2>
                </section>
                <section id="onramp-people-content">
                    <OnrampRow ref="onrampRow" items={showItems} page="people" />
                </section>
                <footer id="onramp-footer">
                    <span id="skip-people-button" className="button">Skip</span>
                </footer>
            </div>
        )
    }
}

export default People;
