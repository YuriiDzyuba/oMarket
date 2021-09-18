import { USER_EMAIL_FIELD, USER_PASSWORD_FIELD } from '../../consts/userConsts';
import { login } from '../../http/userApi';
import { uploadUser } from './userReducer';

const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const CLEAR_FIELDS = 'CLEAR_FIELDS';

const initialState = {
    [USER_EMAIL_FIELD]: '',
    [USER_PASSWORD_FIELD]: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMAIL:
            return { ...state, [USER_EMAIL_FIELD]: action.text };
        case UPDATE_PASSWORD:
            return { ...state, [USER_PASSWORD_FIELD]: action.text };
        case CLEAR_FIELDS:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export const updateEmail = (text) => ({ type: UPDATE_EMAIL, text, });

export const updatePassword = (text) => ({ type: UPDATE_PASSWORD, text, });

export const clearFields = () => ({ type: CLEAR_FIELDS });

export const logInUser = () => async (dispatch, getState) => {

    const applicantData = getState().auth;

    const response = await login(applicantData);

    if (response) {
        dispatch(clearFields());
        dispatch(uploadUser(response));
    }
};
