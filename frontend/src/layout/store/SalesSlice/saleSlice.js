import { createSlice } from "@reduxjs/toolkit";
import {
  createNewSaleByEmployee,
  deleteSale,
  getAllSales,
  getMyAllSales,
  getSalesOfEmployee,
  getSingleSale,
  getSingleSalebyEmployee,
} from "./saleSliceReducers";

const initialState = {
  sales: [],
  singleSale: {},
  singleEmployeeSale: [],
  mySales: [],
  singleSaleByEmployee: {},
  loading: false,
  error: null,
  combinedTotal: 0,
  onlineSalesTotal: 0,
  physicalSalesTotal: 0,
  deleteSaleMessage: "",
  createSaleMessage: "",
};

const saleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    clearDeleteSaleMessage: (state) => {
      state.deleteSaleMessage = "";
    },
    clearCreateSaleMessage: (state) => {
      state.createSaleMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.sales;
        state.combinedTotal = action.payload.combinedTotal;
        state.onlineSalesTotal = action.payload.onlineSalesTotal;
        state.physicalSalesTotal = action.payload.physicalSalesTotal;
      })
      .addCase(getAllSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMyAllSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyAllSales.fulfilled, (state, action) => {
        state.loading = false;
        state.mySales = action.payload;
      })
      .addCase(getMyAllSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSingleSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleSale.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSale = action.payload;
      })
      .addCase(getSingleSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSingleSalebyEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleSalebyEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSaleByEmployee = action.payload;
      })
      .addCase(getSingleSalebyEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSalesOfEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesOfEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.singleEmployeeSale = action.payload;
      })
      .addCase(getSalesOfEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewSaleByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewSaleByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.createSaleMessage = action.payload?.message;
      })
      .addCase(createNewSaleByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.loading = false;
        const deletedSaleId = action.meta.arg;
        console.log(deletedSaleId);

        state.sales = state.sales?.filter((sale) => sale._id !== deletedSaleId);
        state.deleteSaleMessage = action.payload;
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDeleteSaleMessage, clearCreateSaleMessage } =
  saleSlice.actions;

export default saleSlice.reducer;
