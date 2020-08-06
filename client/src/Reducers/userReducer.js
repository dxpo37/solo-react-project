const userReducer = (state={username:"deepak"}, action) => {
  switch(action.type){
    case 'LIKE_INCREMENT': return state
    case 'LIKE_DECREMENT': return state
    default: return state
  }
}

export default userReducer