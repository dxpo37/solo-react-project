const likeReducer = (state=0, action) => {
  switch(action.type){
    case 'LIKE_INCREMENT': return state++
    case 'LIKE_DECREMENT': return state--
    default: return state
  }
}

export default likeReducer