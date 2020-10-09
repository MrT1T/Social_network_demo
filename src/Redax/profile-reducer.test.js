import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'My name is Eugene', likesCount: 125},
        {id: 2, message: 'How are you?', likesCount: 215},
    ],
}

test('length of posts should be incremented', () => {
    // 1. text data
    let action = addPost('I can')
    // 2. action
    let newState = profileReducer(state,action);
    // 3. expectation
    expect(newState.posts.length).toBe(3);

});


test('message is true', () => {
    // 1. text data
    let action = addPost('I can')
    // 2. action
    let newState = profileReducer(state,action);
    // 3. expectation

    expect(newState.posts[2].message).toBe('I can');
});

test('after deleting length of message should be decrement', () => {
    // 1. text data
    let action = deletePost(1)
    // 2. action
    let newState = profileReducer(state,action);
    // 3. expectation
    expect(newState.posts.length).toBe(1);

});

test(' should be ID incorrect', () => {
    // 1. text data
    let action = deletePost(100)
    // 2. action
    let newState = profileReducer(state,action);
    // 3. expectation
    expect(newState.posts.length).toBe(2);

});