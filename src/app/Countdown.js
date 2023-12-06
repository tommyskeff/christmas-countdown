import React, { useState, useEffect } from "react";
import CountdownElement from "./CountdownElement";
import "./style.css";
import "../media/background.png"

class ElementState {

    #displayUnit;
    #displayNumber;
    #hasChanged;

    constructor(displayUnit, displayNumber, hasChanged) {
        this.#displayUnit = displayUnit;
        this.#displayNumber = displayNumber;
        this.#hasChanged = hasChanged;
    }

    getDisplayUnit() {
        return this.#displayUnit;
    }

    getDisplayNumber() {
        return this.#displayNumber;
    }

    hasChanged() {
        return this.#hasChanged;
    }

}

const calculateElementStates = (timeLeft, units, previousStates) => {
    const states = [];
    for (let i = 0; i < units.length; i++) {
        const [displayUnit, unitValue] = units[i];
        const displayNumber = Math.floor(timeLeft / unitValue);
        const previousValue = previousStates.length > i ? previousStates[i].getDisplayNumber() : 0;

        const state = new ElementState(displayUnit, displayNumber, previousValue !== displayNumber);
        states.push(state);

        timeLeft -= displayNumber * unitValue;
    }

    return states;
};

const Countdown = ({ countdownTimestamp, units }) => {
    const [loading, setLoading] = useState(true);
    const [elementStates, setElementStates] = useState([]);
    const [animating, setAnimating] = useState([]);
    const [textAnimating, setTextAnimating] = useState(false);
    const [cycles, setCycles] = useState(0);

    useEffect(() => {
        const run = () => {
            setLoading(false);

            const timeLeft = countdownTimestamp - Date.now();
            const states = calculateElementStates(timeLeft, units, currentState);

            currentState = states;
            currentCycles = currentCycles + 1;

            setCycles(currentCycles);
            setTextAnimating(currentCycles % 3 === 0);
            setAnimating(true);
            setElementStates(states);
            setTimeout(() => setAnimating(false), 500);
        }

        let currentState = elementStates;
        let currentCycles = cycles;

        setTimeout(run, 1);
        const interval = setInterval(run, 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return null;
    }

    const elements = [];
    for (const element of elementStates) {
        const shouldAnimate = animating && element.hasChanged();
        const unit = element.getDisplayUnit();
        const number = element.getDisplayNumber();

        elements.push(
            <li key={unit}>
                <CountdownElement displayNumber={number} displayUnit={unit} isAnimating={shouldAnimate} />
            </li>
        );
    }

    return (
        <div className="b-cdn">
            <ul>{elements}</ul>
            <p className={`b-cdn-text ${textAnimating ? 'b-cdn-text-shake' : ''}`}>Until Hanukkah...</p>
        </div>
    );
};

export default Countdown;
