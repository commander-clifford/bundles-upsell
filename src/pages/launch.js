import React, { Component } from 'react';
import './launch.scss';
var currentTimeInterval = null;

class Launch extends Component {

    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('launch-container', { orientation: 'vertical', isIndexAlign: true });

        navigation.register('launch-section--row-1', { parent: 'launch-container', orientation: 'horizontal', isIndexAlign: true });

        navigation.register('launch-netflix', { parent: 'launch-section--row-1', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});
        navigation.register('launch-npr', { parent: 'launch-section--row-1', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});
        navigation.register('launch-nfl', { parent: 'launch-section--row-1', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});
        navigation.register('launch-nascar', { parent: 'launch-section--row-1', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});

        navigation.register('launch-section--row-2', { parent: 'launch-container', orientation: 'horizontal', isIndexAlign: true });

        navigation.register('launch-pandora', { parent: 'launch-section--row-2', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});
        navigation.register('launch-iheartradio', { parent: 'launch-section--row-2', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});
        navigation.register('launch-bbc', { parent: 'launch-section--row-2', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});
        navigation.register('launch-youtube', { parent: 'launch-section--row-2', orientation: 'horizontal', isFocusable: true, onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect});

        // Keybindings
        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        // init focus
        navigation.focus('launch-netflix');

        // Remove some localStorage items
        localStorage.removeItem('planType');

        // Set the current time
        this.updateTime();
        currentTimeInterval = setInterval(this.updateTime, 1000)
    }

    componentWillUnmount() {
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('launch-container');

        // Remove the current time interval
        clearInterval(currentTimeInterval);

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
        this.itemSelected(node);
    };

    itemSelected = (node) => {
        const { id } = node;

        // Select new element
        const el = document.getElementById(id);
        el && el.classList.add('selected');

        // Take action
        const version = this.props.match.params.version;
        this.props.history.push('/' + version + '/loading');
    }

    // Source: https://stackoverflow.com/questions/10470825/how-to-make-javascript-time-automatically-update
    updateTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();

        if (minutes < 10) {
        minutes = "0" + minutes;
        }

        var t_str = hours + ":" + minutes;

        if(hours > 11) {
        if(hours > 12) {
            t_str = (hours - 12) + ":" + minutes;
        }

        t_str += "p";
        } else {
        t_str += "a";
        }

        document.getElementById('current-time').innerHTML = t_str;
    }

    render() {
        return (
            <div id="launch-container">
                <header>
                    <h1>Applications</h1>
                    <div id="current-time"></div>
                </header>
                {/*<nav>
                    <span className="focused">TV</span>
                    <span>Movies</span>
                    <span>Kids</span>
                    <span>Networks</span>
                    <span>Music</span>
                    <span>Latino</span>
                    <span>Web</span>
                    <span>Str</span>
                </nav>*/}
                <section id="launch-section--row-1" className="row art__stagger-in art__stagger-out">
                    <h2>Featured</h2>
                    <div className="grid__row">
                        <span id="launch-netflix"><img alt="netflix-logo" src="../assets/images/logos/netflix-logo.png" height="95px" /></span>
                        <span id="launch-npr" style={{backgroundColor: "#DBE8FF"}}><img alt="npr-one-logo" src="../assets/images/logos/npr-one-logo.png" height="165px" /></span>
                        <span id="launch-nfl" style={{backgroundColor: "#EBF4FF"}}><img alt="nfl-100-logo" src="../assets/images/logos/nfl-100-logo.png" height="125px" /></span>
                        <span id="launch-nascar" style={{backgroundColor: "#FFEFBD"}}><img alt="nascar-logo" src="../assets/images/logos/nascar-logo.png" height="205px" /><i className=""></i></span>
                    </div>
                </section>
                <hr />
                <section id="launch-section--row-2" className="row art__stagger-in art__stagger-out">
                    <h2>Music</h2>
                    <div className="grid__row">
                        <span id="launch-pandora" style={{backgroundColor: "#BAE8FF"}}><img alt="pandora-logo" src="../assets/images/logos/pandora-logo.png" height="155px" /></span>
                        <span id="launch-iheartradio" style={{backgroundColor: "#FFD1D6"}}><img alt="iheartradio-logo" src="../assets/images/logos/iheartradio-logo.png" height="175px" /></span>
                        <span id="launch-bbc" style={{backgroundColor: "#EFFEF"}}><img alt="bbc-radio-logo" src="../assets/images/logos/bbc-radio-logo.png" height="155px" /></span>
                        <span id="launch-youtube" style={{backgroundColor: "#FFF"}}><img alt="youtube-logo" src="../assets/images/logos/youtube-logo.png" height="55px" /></span>
                    </div>
                </section>
            </div>
        )
    }
}

export default Launch;
