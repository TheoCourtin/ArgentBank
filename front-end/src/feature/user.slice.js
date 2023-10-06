import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    //Penser à changer l'initialState
    user: null,
  },
});

export default userSlice.reducer;