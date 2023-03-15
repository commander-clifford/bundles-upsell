import React, { Component } from 'react';

class Configuration extends Component {
    componentDidMount() {
        const {
            navigation
        } = this.props;

        // See if we have a stored verison
        let version = localStorage.getItem('version') ? localStorage.getItem('version') : '';

        // Register nodes for LRUD
        navigation.register('configuration-container', { orientation: 'vertical' });

        // LRUD: Version Options
        navigation.register('version-options', { parent: 'configuration-container', orientation: 'horizontal' });
        navigation.register('version-a', { parent: 'version-options', orientation: 'horizontal', version: 'a', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });
        navigation.register('version-b', { parent: 'version-options', orientation: 'horizontal', version: 'b', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });
        navigation.register('version-c', { parent: 'version-options', orientation: 'horizontal', version: 'c', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            //console.log(event);
        }

        // Set inital focus
        navigation.focus('version-' + version);

        // Remove some localStorage items
        localStorage.clear();
        localStorage.setItem('version', version);
    }

    componentWillUnmount() {
        //console.log('configuration unmount');
        const { navigation } = this.props;

        // Unregister nodes
        //navigation.unregister(navigation);
        navigation.unregister('configuration-container');
    
        // Remove key bindings: this breaks the next route as prev/next overlap during transition
        // document.onkeydown = null;
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
        //console.log('select', node);
        this.itemSelected(node);
    };

    itemSelected = (node) => {
        //console.log(node);
        const { parent, id, version } = node;

        // Clear previous element
        const parentEl = document.getElementById(parent);
        const selectedEl = parentEl.querySelector('.selected');
        if(selectedEl !== null) {
            selectedEl.classList.remove('selected')
        }

        // Select new element
        const el = document.getElementById(id);
        el && el.classList.add('selected');

        // Store the selected version
        localStorage.setItem('version', version);

        // Move along...
        this.props.history.push(version + '/launch');
    }

    render() {
        return (
            <div id="configuration-container">
                <ol className="config-option-list" id="version-options">
                    <li id="version-a">A</li>
                    <li id="version-b">B</li>
                    <li id="version-c">C</li>
                </ol>
            </div>
        )
    }
}

export default Configuration;
