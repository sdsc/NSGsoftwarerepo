import { createSlice } from '@reduxjs/toolkit'

export const toolPageSlice = createSlice({
  name: 'toolPage',
  initialState: {
    command: null
  },
  reducers: {
    setCommand: (state, action) => {
      state.command = action.payload
    }
  }
})

export default toolPageSlice.reducer
export const { setCommand } = toolPageSlice.actions
