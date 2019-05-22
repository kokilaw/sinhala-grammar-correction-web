import swal from 'sweetalert';

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
        swal({
            title: 'Error connecting to the server!',
            text: 'Please try again later.',
            icon: 'error',
            button: true
        });
        return { ...state, error: action.error, status: 'ERROR' };
    default:
        return state;
    }
}
