const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';


let initialState = {
    dialogs: [
        {id: 1, ava: 'https://likevideogid.ru/wp-content/uploads/2019/11/likee_avatarka2-400x398.jpg', name: 'Irisha'},
        {id: 2, ava: 'https://vibirai.ru/image/964470.jpg', name: 'Telega'},
        {id: 3, ava: 'https://vibirai.ru/image/964470.jpg', name: 'Zhora'},
        {id: 4, ava: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg', name: 'Alex'},
        {id: 5, ava: 'https://likevideogid.ru/wp-content/uploads/2019/11/likee_avatarka4-400x572.jpg', name: 'Sergey'}
    ],
    message: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'I Can'},
        {id: 4, message: 'I smart programmer'},
        {id: 5, message: 'I Can'},
        {id: 6, message: 'I smart programmer'},
    ],

}


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                message: [...state.message, {id: 7, message: action.newMassageBody}],

            };

        default:
            return state;
    }
}
export const addMessage = (newMassageBody) => ({type: ADD_MESSAGE, newMassageBody});
export default dialogsReducer;