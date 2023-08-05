import { UserState } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// you can perform other operation here such as defining
// async actions to fetch data ...

export default userSlice.reducer;
