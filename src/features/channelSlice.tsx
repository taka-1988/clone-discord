import { createSlice } from "@reduxjs/toolkit";

interface InitialChanelState {
  channelId: string | null;
  channelName: string | null;
}

const initialState: InitialChanelState = {
  channelId: null,
  channelName: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState: initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = channelSlice.actions;
export default channelSlice.reducer;
