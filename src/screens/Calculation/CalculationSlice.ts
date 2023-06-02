import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setState } from '$utils/globals';
const INIT_STATE: {
  [key: string]: {
    [key: string]: any;
  };
} = {};
const CalculationSlice = createSlice({
  name: 'Caculation',
  initialState: INIT_STATE,
  reducers: {
    setState,
    saveFormValue: (
      state,
      action: PayloadAction<{ name: string; key: string; value: any }>,
    ) => {
      const { name, key, value } = action.payload;
      state[name] = state[name] || {};
      state[name][key] = value;
    },
    resetForm: (state, action: PayloadAction<string>) => {
      state[action.payload] = {};
    },
  },
});
export const CalculationActions = CalculationSlice.actions;
export const CalculationReducer = CalculationSlice.reducer;
