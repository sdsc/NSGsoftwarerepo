import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getReadme } from '../../api/githubAPI'

export const fetchReadme = createAsyncThunk(
  'readme',
  async (args, thunkAPI) => {
    const data = await getReadme(args.owner, args.repoName)
    return data
  }
)

export const toolPageSlice = createSlice({
  name: 'toolPage',
  initialState: {
    tool: null,
    loading: 'init'
  },
  reducers: {
  },
  extraReducers: {
    [fetchReadme.pending]: (state) => {
      state.loading = 'fetching'
    },
    [fetchReadme.fulfilled]: (state, action) => {
      const data = action.payload
      state.tool = data
      state.loading = 'idle'
    }
  }
})

export default toolPageSlice.reducer
