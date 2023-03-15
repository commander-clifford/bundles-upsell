import { TimelineMax as Timeline, Power2 } from 'gsap';

/**

  Animated Router Transitions (art)

  https://css-tricks.com/animating-between-views-in-react/
  GSAP Cheat Sheet: https://ihatetomatoes.net/wp-content/uploads/2016/07/GreenSock-Cheatsheet-4.pdf
  GSAP Docs https://greensock.com/docs/

*/

/* ENTER ANIMATION TIMELINES */

/* Enter: Slide in from Left */
const enterSlideInFromLeftTimeline = (node) => {
    const timeline = new Timeline({ paused: true });
    const staggerInElements = node.querySelectorAll('.art__stagger-in');
    timeline
    .from( node, 0.6, {
        autoAlpha: 0,
        delay: 0.6,
    })
    .staggerFrom( staggerInElements, 0.6, {
        autoAlpha: 0,
        scale: 0.94,
        x: '14%',
        ease: Power2.easeOut,
        clearProps: "opacity",
    }, 0.1, "-=0.4")
    return timeline;
}

/* Enter: Slide in from Right */
const enterSlideInFromRightTimeline = (node) => {
    const timeline = new Timeline({ paused: true });
    const staggerInElements = node.querySelectorAll('.art__stagger-in');
    timeline
    .from( node, 0.6, {
        autoAlpha: 0,
        delay: 0.4,
    })
    .staggerFrom( staggerInElements, 0.6, {
        autoAlpha: 0,
        scale: 0.94,
        x: '-14%',
        ease: Power2.easeOut,
    }, 0.1, "-=0.4")
    return timeline;
}

/* EXIT ANIMATION TIMELINES */

/* Exit: Slide out to Left */
const exitSlideOutToLeftTimeline = (node) => {
    const timeline = new Timeline({ paused: true });
    const staggerOutElements = node.querySelectorAll('.art__stagger-out');
    const staggerOutColumnElements = node.querySelectorAll('.art__stagger-out--columns');
    timeline
    .set(node,{
        // set position to take this node out of natural flow to prevent flash
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, // must match app padding
        right: 0, // must match app padding
        zIndex: 0,
    })
    .staggerTo( staggerOutElements, 0.6, {
        autoAlpha: 0,
        scale: 0.94,
        x: '-14%',
        ease: Power2.easeIn
    }, -0.1)
    .staggerTo( staggerOutColumnElements, 0.6, {
        autoAlpha: 0,
        scale: 0.94,
        x: '-14%',
        ease: Power2.easeIn
    }, 0.1)
    .to( node, 0.6, {
        autoAlpha: 0,
    }, '-=0.4')
    return timeline;
}

/* Exit: Slide out to right */
const exitSlideOutToRightTimeline = (node) => {
    const timeline = new Timeline({ paused: true });
    const staggerOutElements = node.querySelectorAll('.art__stagger-out');
    timeline
    .set(node,{
        // set position to take this node out of natural flow to prevent flash
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, // must match app padding
        right: 0, // must match app padding
        zIndex: 0,
    })
    .staggerTo( staggerOutElements, 0.6, {
        autoAlpha: 0,
        scale: 0.94,
        x: '14%',
        ease: Power2.easeIn
    }, -0.1)
    .to( node, 0.6, {
        autoAlpha: 0,
    }, '-=0.4')
    return timeline;
}

/* EXPORT TIMELINES */

/* ENTER */
export const enter = (node, pathname, prevPathname) => {

    let timeline;

    console.log('compare',pathname,'to',prevPathname);

    // TODO: pathname === prevPathname ? route must be back : Do reverse animation
    if(false){
        console.log('they do match: go backward');
        timeline = enterSlideInFromRightTimeline(node); // do it backwards
    } else {
        console.log('they do not match: go forward');
        timeline = enterSlideInFromLeftTimeline(node); // do it forwards
    }

    window.loadPromise = new Promise(resolve => {
        window.addEventListener("DOMContentLoaded", timeline.play())
    });

}

/* EXIT */
export const exit = (node, pathname, prevPathname) => {

    let timeline;

    // TODO: pathname === prevPathname ? route must be back : Do reverse animation
    if(false){
        timeline = exitSlideOutToRightTimeline(node); // do it backwards
    } else {
        timeline = exitSlideOutToLeftTimeline(node); // do it forwards
    }

    window.loadPromise = new Promise(resolve => {
        window.addEventListener("DOMContentLoaded", timeline.play())
    });

}
