import React from 'react';

export default function Breadcrumbs(props) {

    function buildBreadCrumbList() {

        if(props.version === 'a') {
            return(
                <ol className="breadcrumbs">
                    <li id="crumb-account" className={props.account ? 'complete' : ''}>01. Create Login</li>
                    <li id="crumb-choose" className={props.choose ? 'complete' : ''}>02. Confirm Plan</li>
                    <li id="crumb-watch" className={props.watch ? 'complete' : ''}>03. Start Watching</li>
                </ol>
            )
        }

        if(props.version === 'b') {
            return(
                <ol className="breadcrumbs">
                    <li id="crumb-choose" className={props.choose ? 'complete' : ''}>01. Confirm Plan</li>
                    <li id="crumb-account" className={props.account ? 'complete' : ''}>02. Create Login</li>
                    <li id="crumb-watch" className={props.watch ? 'complete' : ''}>03. Start Watching</li>
                </ol>
            )
        }

        if(props.version === 'c' && !props.account && !props.upgrade && !props.confirm) {
            return(
                <ol className="onramp-breadcrumbs">
                    <li className="num">Question</li>
                    <li className="num">{props.step}</li>
                    <li id="crumb-one" className={props.shows ? 'complete' : ''}></li>
                    <li id="crumb-two" className={props.devices ? 'complete' : ''}></li>
                    <li id="crumb-three" className={props.people ? 'complete' : ''}></li>
                    <li className="num">3</li>
                </ol>
            )
        }
    }

  return (
    <span>
        {buildBreadCrumbList()}
    </span>
  )
}
