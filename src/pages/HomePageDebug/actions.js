import {
    FETCH_CORRECTIONS_FOR_SENTENCES_INIT,
    FETCH_CORRECTIONS_FOR_SENTENCES_SUCCESS,
    FETCH_CORRECTIONS_FOR_SENTENCES_ERROR
} from '../../types';
import { post } from '../../api';

const REQUEST_URL = '/correct';

export function fetchCorrectionsInit() {
    return {
        type: FETCH_CORRECTIONS_FOR_SENTENCES_INIT
    };
}

export function fetchCorrectionsSuccess(data) {
    return {
        type: FETCH_CORRECTIONS_FOR_SENTENCES_SUCCESS,
        data
    };
}

export function fetchCorrectionsError(error) {
    return {
        type: FETCH_CORRECTIONS_FOR_SENTENCES_ERROR,
        error
    };
}

export function loadCorrectionsForSentence(request) {
    // eslint-disable-next-line func-names
    return function(dispatch) {
        dispatch(fetchCorrectionsInit());
        return post(REQUEST_URL, request)
            .then(response => {
                dispatch(fetchCorrectionsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchCorrectionsError(error.response));
            });
    };
}
