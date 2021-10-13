import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTools } from '../../api/openstackAPI'
export const fetchTools = createAsyncThunk(
  'tools/all',
  async (_, thunkAPI) => {
    const data = await getTools()
    return data
  }
)

export const toolListSlice = createSlice({
  name: 'toolList',
  initialState: {
    tools: [],
    loading: 'init'
  },
  reducers: {
  },
  extraReducers: {
    [fetchTools.pending]: (state) => {
      state.loading = 'fetching'
    },
    [fetchTools.fulfilled]: (state, action) => {
      const data = action.payload.map(item => {
        return {
          ...item
        }
      })
      state.tools = data
      state.loading = 'idle'
    },
    [fetchTools.rejected]: (state, action) => {
      state.loading = 'error'
    }
  }

})

// export const { fetchTools } = toolListSlice.actions

export const selectTools = state => state.tools

export default toolListSlice.reducer
