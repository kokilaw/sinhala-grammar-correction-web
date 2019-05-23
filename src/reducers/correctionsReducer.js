import { handleErrorAlerts } from '../handlers/connectionErrorAlertHandler';

import {
    FETCH_CORRECTIONS_FOR_SENTENCES_INIT,
    FETCH_CORRECTIONS_FOR_SENTENCES_SUCCESS,
    FETCH_CORRECTIONS_FOR_SENTENCES_ERROR
} from '../types';

export default function correctionsReducer(state = {}, action = {}) {
    switch (action.type) {
    case FETCH_CORRECTIONS_FOR_SENTENCES_INIT:
        return { ...state, status: 'LOADING' };
    case FETCH_CORRECTIONS_FOR_SENTENCES_SUCCESS:
        return { ...state, data: action.data, status: 'SUCCESS' };
    case FETCH_CORRECTIONS_FOR_SENTENCES_ERROR:
        handleErrorAlerts(action.error);
        return { ...state, error: action.error, status: 'ERROR' };
    default:
        return state;
    }
}
