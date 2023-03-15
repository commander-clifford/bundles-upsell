import React, { Component } from 'react';

let videoPlayer;

class Video extends Component {

    constructor(props) {
        super(props);

        // reset key bindings
        document.onkeydown = null;
    }

    componentDidMount() {

        document.onkeydown = event => {
            // navigation.handleKeyEvent(event);
            this.handleKeyDownEvents(event.code);
        }

        // Get the video player element
        videoPlayer = document.getElementById('plans-video');

        // Start playback
        videoPlayer.addEventListener('loadedmetadata', this.initPlayback, false);
    }

    componentWillUnmount() {
        // Remove timeouts
        //window.clearTimeout(autoTimeout);
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

            case 'KeyA':
                this.replayVideo();
                break;

            case 'KeyB':
                history.goBack();
                break;

            case 'KeyD':
                this.autoProgress();
                break;

            case 'KeyP':
                this.togglePlayPause();
                break;

            case 'KeyQ':
                history.replace(`/${version}/start`);
                break;

            default:
                console.log('handleKeyDownEvents', key);
        }
    }

    togglePlayPause = () => {
        if(videoPlayer.paused){
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    replayVideo = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = '0';
        videoPlayer.play();
    }

    autoProgress = () => {
        // Take action
        const version = this.props.match.params.version;
        this.props.history.push('/' + version + '/plans');
    }

    initPlayback = () => {
        videoPlayer.play();

        // Set up video player events
        videoPlayer.addEventListener('ended', this.videoEnded, false);
    }

    videoEnded = () => {
        //console.log('ended');
        this.autoProgress();
    }

    render() {

        return (
            <div id="video-container" className="container">
                <video src="../assets/videos/plans.mov" id="plans-video" />
            </div>
        )
    }
}

export default Video;
