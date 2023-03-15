import React, { Component } from 'react';
import OnrampRow from '../../components/onrampRow';
import Header from '../../components/header';
import _ from 'lodash';

const showItems = [

    {
        "id": "onramp-smart-tv",
        "label": "Smart TV",
        "image": "../../assets/images/devices/smart-tv.jpg"
    },
    {
        "id": "onramp-4k-tv",
        "label": "4K TV",
        "image": "../../assets/images/devices/4K_TV.jpg"
    },
    {
        "id": "onramp-set-top-box",
        "label": "Streaming Device",
        "image": "../../assets/images/devices/Streaming_Media.jpg"
    },
    {
        "id": "onramp-video-game",
        "label": "Game Console",
        "image": "../../assets/images/devices/Video_Game.jpg"
    },
    {
        "id": "onramp-smartphone",
        "label": "Smartphone",
        "image": "../../assets/images/devices/SmartPhones.jpg"
    },
    {
        "id": "onramp-tablet",
        "label": "Tablet",
        "image": "../../assets/images/devices/Tablets.jpg"
    },
    {
        "id": "onramp-computer",
        "label": "Computer",
        "image": "../../assets/images/devices/Computers.jpg"
    },

]

class Devices extends Component {
    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('onramp-devices-container', { orientation: 'vertical' });

        // LRUD: Row
        navigation.register('onramp-devices-content', { parent: 'onramp-devices-container', orientation: 'horizontal', type: 'comedy', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        // LRUD: Button
        navigation.register('skip-devices-button', { parent: 'onramp-devices-container', orientation: 'horizontal', type: 'comedy', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        // Keybindings
        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.keyHandler(event);
        }

        // Set inital focus
        navigation.focus('onramp-devices-content');

        // If we had previous selctions, then switch the button
        this.switchDevicesButton();
    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('onramp-devices-container');

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
                // history.replace(`/${version}/onramp/shows`);
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
            case 'onramp-devices-content':
                this.refs.onrampRow.onSelect(node);
                this.switchDevicesButton();
                break;

            case 'skip-devices-button':
                // Move along...
                const version = this.props.match.params.version;
                this.props.history.push('/' + version + '/onramp/people');
                break;

            default:
                console.log('select', node);
        }
    };

    //=TODO: Some of this should prob be moved to OnrampRow
    // and then that should just return the number of selected
    // elements.
    switchDevicesButton = () => {
        const container = document.getElementById('onramp-devices-container');
        const selections = container.querySelectorAll('.onramp-card.selected');
        const button = document.getElementById('skip-devices-button');
        (selections.length > 0) ? button.innerHTML = 'Next' : button.innerHTML = 'Skip';
    }

    render() {
        const version = this.props.match.params.version;

        return(
            <div id="onramp-devices-container" className="onramp-container container">
                <Header version={version} shows={true} devices={true} step={2} />
                <section id="onramp-headings">
                    <h1>Which devices do you have?</h1>
                    <h2>We’ll send you instructions to set up Netflix on your favorite devices.</h2>
                </section>
                <section id="onramp-devices-content">
                    <OnrampRow ref="onrampRow" items={showItems} page="devices" />
                </section>
                <footer id="onramp-footer">
                    <span id="skip-devices-button" className="button">Skip</span>
                </footer>
            </div>
        )
    }
}

export default Devices;
