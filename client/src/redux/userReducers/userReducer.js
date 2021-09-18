import { USER_AVATAR_FIELD,
    USER_BORN_YEAR_FIELD,
    USER_EMAIL_FIELD,
    USER_ID_FIELD,
    USER_IS_ACTIVATED_FIELD,
    USER_IS_BANNED_FIELD,
    USER_NAME_FIELD,
    USER_ROLE_FIELD } from '../../consts/userConsts';

const UPLOAD_USER = 'UPLOAD_USER';
const UNLOAD_USER = 'UNLOAD_USER';

const initialState = {
    [USER_EMAIL_FIELD]: '',
    [USER_BORN_YEAR_FIELD]: '',
    [USER_AVATAR_FIELD]: '',
    [USER_NAME_FIELD]: '',
    [USER_ROLE_FIELD]: '',
    [USER_IS_ACTIVATED_FIELD]: '',
    [USER_IS_BANNED_FIELD]: '',
    [USER_ID_FIELD]: '',
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_USER:
            return { ...state, ...action.payload };
        case UNLOAD_USER:
            return { ...state, ...initialState };
        default:
            return state;
    }
};

export const uploadUser = (payload) => ({ type: UPLOAD_USER, payload });

export const unloadUser = () => ({ type: UNLOAD_USER });
