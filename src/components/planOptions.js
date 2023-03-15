import React, { Component } from 'react';

class PlanOptions extends Component {

    render() {
        const version = this.props.version;

        return(
            <div id="plan-options-container">

                {/* BASIC */}
                {version !== 'c' &&
                    <div id="plan-basic" className="plan art__stagger-in art__stagger-out--columns">
                        <div className="plan-details">
                            <div className="plan-header">
                                <span className="included-tag"><span className="check-mark-container"><i className="check-mark"></i></span> Included</span>
                                <h1>Basic</h1>
                                <h2>Great starter plan</h2>
                            </div>
                            <div className="plan-price"><span>$0</span> / month</div>
                            <hr />
                            <ul className="plan-values-list">
                                <li>
                                    <i className="plan-value-device"><span>1</span></i>
                                    <span>Watch on 1 TV or device at a time</span>
                                </li>
                                <li>
                                    <i className="plan-value-quality">SD</i>
                                    <span>Standard picture quality</span>
                                </li>
                            </ul>
                            <div className="button">Continue with Basic</div>
                        </div>
                    </div>
                }


                {/* STANDARD */}
                <div id="plan-standard" className="plan art__stagger-in art__stagger-out--columns">
                    <div className="plan-details">
                        <div className="plan-header">
                        {version === 'c' &&
                            <span className="included-tag"><span className="check-mark-container"><i className="check-mark"></i></span> Included</span>
                        }
                            <h1>Standard</h1>
                            <h2>Better for families</h2>
                        </div>
                        {version === 'c' &&
                            <div className="plan-price"><span>$0</span> / month</div>
                        }
                        {version !== 'c' &&
                            <div className="plan-price"><span>$3</span> / month extra</div>
                        }
                        <hr />
                        <ul className="plan-values-list">
                            <li>
                                <i className="plan-value-device"><span>2</span></i>
                                <span>Watch on 2 TVs or devices at a time</span>
                            </li>
                            <li>
                                <i className="plan-value-quality">HD</i>
                                <span>Hi-def picture quality</span>
                            </li>
                        </ul>
                        <div className="button">Continue with Standard</div>
                    </div>
                </div>


                {/* PREMIUM */}
                <div id="plan-premium" className="plan art__stagger-in art__stagger-out--columns">
                    <div className="plan-details">
                        <div className="plan-header">
                            <h1>Premium</h1>
                            <h2>The best of the best</h2>
                        </div>
                        {version === 'c' &&
                            <div className="plan-price"><span>$3</span> / month extra</div>
                        }
                        {version !== 'c' &&
                            <div className="plan-price"><span>$6</span> / month extra</div>
                        }
                        <hr />
                        <ul className="plan-values-list">
                            <li>
                                <i className="plan-value-device"><span>4</span></i>
                                <span>Watch on 4 TVs or devices at a time</span>
                            </li>
                            <li>
                                <i className="plan-value-quality">4K</i>
                                <span>Ultra HD picture quality</span>
                            </li>
                        </ul>
                        <div className="button">Continue with Premium</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlanOptions;
