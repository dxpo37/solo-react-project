const userReducer = (state={user:{userName:"unknown"}}, action) => {
  switch(action.type){
    case 'LOGGED': return {...state, user: action.user}
    case 'NOT_LOGGED': return state
    default: return state
  }
}

export default userReducer