import React from 'react';
import { Switch, Route } from "react-router-dom";
import Lrud from 'lrud';
import { Transition, TransitionGroup } from 'react-transition-group';
import { enter, exit } from './timelines'; // https://css-tricks.com/animating-between-views-in-react/
import './styles/app.scss';
import Configuration from './pages/configuration';
import Launch from './pages/launch';
import Start from './pages/start';
import Plans from './pages/plans';
import Account from './pages/account';
import Confirm from './pages/confirm';
import Video from './pages/video';
import Shows from './pages/onramp/shows';
import Devices from './pages/onramp/devices';
import People from './pages/onramp/people';
import Upgrade from './pages/upgrade';
import Loading from './pages/loading';
import Nice from './pages/nice';
import NotNice from './pages/not-nice';
import Welcome from './pages/welcome';
import Member from './pages/member';
import LoadingMember from './pages/loadingMember';

const navigation = new Lrud();

function App() {

    return (
        <div className="app">
            <div className="view-wrapper" style={{position: 'relative', height: '100%'}}>
                <Route render={({ location }) => {
                    const { pathname, key } = location;
                    const prevPathname = null;
                    return (
                        <TransitionGroup component={null}>
                            <Transition
                            key={key}
                            appear={true}
                            onEnter={(node) => enter(node, pathname, prevPathname)}
                            onExit={(node) => exit(node, pathname, prevPathname)}
                            timeout={{enter: 1200, exit: 700 }}
                            >
                                <Switch location={location}>
                                <Route exact path={['/', '/config']} render={({ ...props }) => {
                                  return <Configuration {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/launch`} render={({ ...props }) => {
                                  return <Launch {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/loading`} render={({ ...props }) => {
                                  return <Loading {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/start`} render={({ ...props }) => {
                                  return <Start {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/account`} render={({ ...props }) => {
                                  return <Account {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/nice`} render={({ ...props }) => {
                                  return <Nice {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/not-nice`} render={({ ...props }) => {
                                  return <NotNice {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/plans`} render={({ ...props }) => {
                                  return <Plans {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/confirm`} render={({ ...props }) => {
                                  return <Confirm {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/video`} render={({ ...props }) => {
                                  return <Video {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/onramp/shows`} render={({ ...props }) => {
                                  return <Shows {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/onramp/devices`} render={({ ...props }) => {
                                  return <Devices {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/onramp/people`} render={({ ...props }) => {
                                  return <People {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/upgrade`} render={({ ...props }) => {
                                  return <Upgrade {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/welcome`} render={({ ...props }) => {
                                  return <Welcome {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/loading-member`} render={({ ...props }) => {
                                  return <LoadingMember {...props} navigation={navigation} />
                                }}/>
                                <Route exact path={`/:version/member`} render={({ ...props }) => {
                                  return <Member {...props} navigation={navigation} />
                                }}/>
                                </Switch>
                            </Transition>
                        </TransitionGroup>
                    )
                }}/>
            </div>
        </div>
    );

}

export default App;
