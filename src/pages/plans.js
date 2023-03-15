import React, { Component } from 'react';
import Header from '../components/header';
import PlanOptions from '../components/planOptions';

class Plans extends Component {
    componentDidMount() {

        // reset keydown before building
        document.onkeydown = null;

        const {
            navigation
        } = this.props;

        // Register nodes for LRUD
        navigation.register('plan-options-container', { orientation: 'horizontal' });
        navigation.register('plan-basic', { parent: 'plan-options-container', orientation: 'horizontal', planType: 'basic', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });
        navigation.register('plan-standard', { parent: 'plan-options-container', orientation: 'horizontal', planType: 'standard', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });
        navigation.register('plan-premium', { parent: 'plan-options-container', orientation: 'horizontal', planType: 'premium', onFocus: this.onFocus, onBlur: this.onBlur, onSelect: this.onSelect });

        document.onkeydown = event => {
            navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        // Set inital focus
        let planType = localStorage.getItem('planType');
        planType ? navigation.focus(`plan-${planType}`) : navigation.focus('plan-basic');
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
                //=TODO: In Version B should it go back to /video or to /account?
                switch(version) {
                    case 'a':
                        // Skip the nice screen
                        history.replace(`/${version}/account`);
                        break;
                    default:
                        history.goBack();
                }
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
        const { id, planType } = node;

        // Select new element
        const el = document.getElementById(id);
        el && el.classList.add('selected');

        // Store the planType
        localStorage.setItem('planType', planType);

        // Take action
        const version = this.props.match.params.version;
        if(version === 'b') {
            this.props.history.push('/' + version + '/account');
        } else {
            this.props.history.push('/' + version + '/confirm');
        }

    };

    render() {
        const version = this.props.match.params.version;
        return (
            <div id="plans-container" className="container vlv-blur">
                <Header version={version} choose={true} />
                <PlanOptions />
            </div>
        )
    }
}

export default Plans;
