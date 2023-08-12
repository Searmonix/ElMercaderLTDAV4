import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  const authLocalStorage = localStorage.getItem('auth');
  console.log(authLocalStorage);

  if(authLocalStorage) {
    return JSON.parse(authLocalStorage);
  }
  
  return {
    id: null,
    correo: null,
    type: null,
    token: null
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.correo = action.payload.correo;
      state.token = action.payload.id;
      state.type = action.payload.type;

      action.payload.token = action.payload.id;

      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    logout(state, action) {
      state.id = null;
      state.correo = null;
      state.token = null;
      state.type = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;