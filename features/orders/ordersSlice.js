import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import api from "../../api/server";
import { logout } from "../auth/authSlice";

export const asyncOrders = createAsyncThunk("orders/asyncOrders", async () => {
  const result = await api.get("/order");
  return result.data.orders;
});
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ address, timeScheduled, instruction, callback }) => {
    const result = await api.post("/order", {
      address,
      timeScheduled,
      instruction,
    });
    console.log(result.data);
    callback();
    return result.data;
  }
);

const orderAdapter = createEntityAdapter({
  selectId: (order) => {
    return order._id;
  },
});
const ordersSlice = createSlice({
  name: "orders",
  initialState: orderAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers: {
    [logout]: (state) => {
      orderAdapter.removeAll(state);
    },
    [asyncOrders.fulfilled]: (state, { payload }) => {
      orderAdapter.setAll(state, payload);
      state.loading = false;
    },
    [asyncOrders.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [asyncOrders.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [addOrder.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      orderAdapter.addOne(state, payload);
    },
    [addOrder.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const ordersSelectors = orderAdapter.getSelectors(
  (state) => state.orders
);

export const ordersLoading = (state) => state.orders.loading;

export default ordersSlice.reducer;
