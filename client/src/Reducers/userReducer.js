const userReducer = (state={user:{userName:"unknown"}}, action) => {
  switch(action.type){
    case 'LOG_IN' : return  {...state, user: action.user}
    case 'LOG_OUT': return  {...state, user:{userName:"unknown"} }
    default: return state
  }
}

export default userReducer