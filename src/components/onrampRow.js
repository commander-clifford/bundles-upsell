import React, { Component } from 'react';

class OnrampRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focusedIndex: 0
        };
    }

    componentDidMount() {
        // Nothing to do here...
    }

    moveRow = (direction) => {
        // Set up some variables
        const titles = document.querySelectorAll('.onramp-card'),
              title = titles[0],
              titleWidth = title.getBoundingClientRect().width,
              titleMarginWidth = parseInt(window.getComputedStyle(title).marginRight),
              row = document.getElementById('onramp-row'),
              endIndex = titles.length - 1;

        // Determine which direction we're going
        if(direction === 'forward' && this.state.focusedIndex < endIndex) {
            this.setState((prevState) => ({
                focusedIndex: prevState.focusedIndex + 1
            }));
        } else if(direction === 'back' && this.state.focusedIndex >= 1) {
            this.setState((prevState) => ({
                focusedIndex: prevState.focusedIndex - 1
            }));
        }

        // Move the row using transform
        const translateX = -(titleWidth + titleMarginWidth) * this.state.focusedIndex;
        row.style.transform = `translate3d(${translateX}px,0,0)`;

        // Set new focus
        const currentFocus = row.querySelectorAll('.focused')[0];
        currentFocus && currentFocus.classList.remove('focused');
        const newFocus = titles[this.state.focusedIndex];
        newFocus && newFocus.classList.add('focused');
    }

    onSelect = () => {
        // Find the focused item and add or remove class of selected
        const el = document.querySelectorAll('.onramp-card.focused')[0];
        if(el && el.classList.contains('selected')) {
            el.classList.remove('selected');
        } else {
            el.classList.add('selected');
        }

        // Get the selected items to save to localStorage
        const selectedEls = document.querySelectorAll('.selected');
        const values = [];
        //console.log('selected', selectedEls);

        for(var i = 0; i < selectedEls.length; i++) {
            const value = selectedEls[i].innerText;
            values.push(value);
        }

        // Update localStorage
        localStorage.setItem(this.props.page, values);
    }

    buildRowItem = (item, index) => {
        const { id, label, image } = item;

        const classFocus = (index === 0) ? 'onramp-card focused' : 'onramp-card';
        const shows = localStorage.getItem('shows');
        const devices = localStorage.getItem('devices');
        const people = localStorage.getItem('people');
        const classSelected = (shows && shows.includes(label) || devices && devices.includes(label) || people && people.includes(label)) ? ' selected ' : '';

        return(
            <li className={classFocus + classSelected + ' art__stagger-in art__stagger-out--columns'} id={id} key={index} style={{backgroundImage: `url(${image})`}}>
                <span>
                    <span className="label">{label}</span>
                </span>
            </li>
        )
    }

    render() {
        return(
            <div>
                <div className="onramp-highlighter"></div>
                    <ol id="onramp-row">
                        {this.props.items.map((item, index) => this.buildRowItem(item, index))}
                    </ol>
            </div>
        )
    }
}

export default OnrampRow;
