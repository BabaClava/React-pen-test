const TEST = 'TEST';
const FOLLOW_CHANGE = 'FOLLOW-CHANGE';
const SET_USERS = 'SET-USERS';

let initialState = {
    users: [
        {
            id: 1,
            name: 'Dmitry',
            surname: 'K.',
            country: 'Belarus',
            city: 'Minsk',
            title: 'I am looking for a job right now...',
            follow: true,
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png'
        },
        {
            id: 2,
            name: 'Svetlana',
            surname: 'D.',
            country: 'Belarus',
            city: 'Minsk',
            title: 'I am so pretty',
            follow: true,
            //avatar: null

        },
        {
            id: 3,
            name: 'Sergei',
            surname: 'S.',
            country: 'Ukraine',
            city: 'Kyiv',
            title: 'I like football!',
            follow: false,
            avatar: null
        },
        {
            id: 4,
            name: 'Andrew',
            surname: 'T.',
            country: 'United States',
            city: 'Philadelphia',
            title: 'I am free to help you to create good Video Production',
            follow: false,
            avatar: null
        }
    ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST: 
            console.log('test');
            return {
                ...state
            };
        case FOLLOW_CHANGE:
            return {
                ...state,
                users: state.users.map( user => {
                    if (user.id === action.id) {
                        return {...user, follow: !user.follow}
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

export const test = () => ({
    type: TEST
});

export const followChange = (id) => ({
    type: FOLLOW_CHANGE,
    id: id
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users: users
});

export default usersReducer;