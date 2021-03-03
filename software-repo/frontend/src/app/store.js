import { configureStore } from '@reduxjs/toolkit'
import toolListReducer, { fetchTools } from '../features/ToolList/toolListSlice'
import toolPageReducer from '../features/ToolPage/toolPageSlice'
const store = configureStore({
  reducer: {
    toolList: toolListReducer,
    toolPage: toolPageReducer
  }
})

store.dispatch(fetchTools())

export default store
