import { createSlice } from "@reduxjs/toolkit";
import {
  createNewContact,
  deleteSingleContact,
  getAllContacts,
  getSingleContactDetails,
} from "./contactSliceReducer";

const initialState = {
  contacts: [],
  singleContact: {},
  loading: false,
  error: null,
  createContactMessage: "",
  deleteSingleContactMessage: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    clearCreateContactMessage: (state) => {
      state.createContactMessage = "";
    },

    clearDeleteSingleContactMessage: (state) => {
      state.deleteSingleContactMessage = "";
    },
  },
  extraReducers: (builder) => {
    //builder for getting all products
    builder
      .addCase(createNewContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewContact.fulfilled, (state, action) => {
        state.loading = false;
        state.createContactMessage = action.payload;
      })
      .addCase(createNewContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleContactDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleContactDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.singleContact = action.payload;
      })
      .addCase(getSingleContactDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSingleContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSingleContact.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSingleContactMessage = action.payload;
      })
      .addCase(deleteSingleContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCreateContactMessage,
  clearDeleteSingleContactMessage,
} = contactSlice.actions;

export default contactSlice.reducer;
