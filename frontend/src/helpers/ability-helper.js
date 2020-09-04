import { Ability } from '@casl/ability';
import { Can as AbilityCan } from '@casl/react';
import { connect } from 'react-redux';

import store from '../redux/store';

const mapStateToProps = ({ ability }) => ({ ability });

export const Can = connect(mapStateToProps)(AbilityCan);

export const extractSubjectName = subject => {
    if (!subject || typeof subject === 'string') {
        return subject;
    }
    if (subject.modelName) {
        return subject.modelName;
    }
    if (subject.constructor) {
        return subject.constructor.modelName || subject.constructor.name;
    }
    return subject;
};

export function createAbility(rules = []) {
    return new Ability(rules, {
        subjectName: extractSubjectName,
    });
}

export function renderIfICan(actions, subject, children, defaultChildren = null) {
    const { ability } = store.getState();
    const shouldShow = Array.isArray(actions)
        ? actions.some(action => ability.can(action, subject))
        : ability.can(actions, subject);

    return shouldShow ? children : defaultChildren;
}