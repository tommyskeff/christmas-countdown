import React from "react";

const CountdownElement = ({ displayNumber, displayUnit, isAnimating }) => {
    return (
        <div className={`b-cdn-elmnt ${isAnimating ? 'b-cdn-elmnt-flash' : ''}`}>
            <div className="b-cdn-elmnt-num">{displayNumber}</div>
            <div className="b-cdn-elmnt-unit">{displayUnit}</div>
        </div>
    )
}

export default CountdownElement;