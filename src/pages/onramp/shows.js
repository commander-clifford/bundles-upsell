import React, { Component } from 'react';
import OnrampRow from '../../components/onrampRow';
import Header from '../../components/header';
import _ from 'lodash';

const showItems = [
    {
        "id": "onramp-shows-action",
        "label": "Action",
        "image": "../../assets/images/genres/Action.jpg"
    },
    {
        "id": "onramp-shows-adventure",
        "label": "Adventure",
        "image": "../../assets/images/genres/Adventure.jpg"
    },
    {
        "id": "onramp-shows-comedy",
        "label": "Comedy",
        "image": "../../assets/images/genres/Comedy.jpg"
    },
    {
        "id": "onramp-shows-documentary",
        "label": "Documentary",
        "image": "../../assets/images/genres/Documentary.jpg"
    },
    {
        "id": "onramp-shows-drama",
        "label": "Drama",
        "image": "../../assets/images/genres/Drama.jpg"
    },
    {
        "id": "onramp-shows-family",
        "label": "Family",
        "image": "../../assets/images/genres/Family.jpg"
    },
    {
        "id": "onramp-shows-horror",
        "label": "Horror",
        "image": "../../assets/images/genres/Horror.jpg"
    },
    {
        "id": "onramp-shows-kids",
        "label": "Kids",
        "image": "../../assets/images/genres/Kids.jpg"
    }
]

class Shows extends Component {
    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('onramp-shows-container', { orientation: 'vertical' });

        // LRUD: Row
        navigation.register('onramp-shows-content', { parent: 'onramp-shows-container', orientation: 'horizontal', type: 'comedy', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        // LRUD: Button
        navigation.register('skip-shows-button', { parent: 'onramp-shows-container', orientation: 'horizontal', type: 'comedy', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            //this.handleKeyDownEvents(event.code);
            this.keyHandler(event);
        }

        // Set inital focus
        navigation.focus('onramp-shows-content');

        // If we had previous selctions, then switch the button
        this.switchShowsButton();
    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('onramp-shows-container');

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
                // history.goBack();
                // do not go back to welcome loading screen, go to the account page
                history.replace(`/${version}/account`);
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
            case 'onramp-shows-content':
                this.refs.onrampRow.onSelect(node);
                this.switchShowsButton();
                break;

            case 'skip-shows-button':
                // Move along...
                const version = this.props.match.params.version;
                this.props.history.push('/' + version + '/onramp/devices');
                break;

            default:
                console.log('select', node);
        }
    };

    //=TODO: Some of this should prob be moved to OnrampRow
    // and then that should just return the number of selected
    // elements.
    switchShowsButton = () => {
        const container = document.getElementById('onramp-shows-container');
        const selections = container.querySelectorAll('.onramp-card.selected');
        const button = document.getElementById('skip-shows-button');
        (selections.length > 0) ? button.innerHTML = 'Next' : button.innerHTML = 'Skip';
    }

    render() {
        const version = this.props.match.params.version;

        return(
            <div id="onramp-shows-container" className="onramp-container container">
                <Header version={version} shows={true} step={1} />
                <section id="onramp-headings">
                    <h1>What do you like to watch?</h1>
                    <h2>Choose as many as you'd like. We'll help you discover TV shows and movies based on your choices.</h2>
                </section>
                <section id="onramp-shows-content">
                    <OnrampRow ref="onrampRow" items={showItems} page="shows" />
                </section>
                <footer id="onramp-footer">
                    <span id="skip-shows-button" className="button">Skip</span>
                </footer>
            </div>
        )
    }
}

export default Shows;
