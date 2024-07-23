import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { logOut } from '../auth/operations';

const contactsInitialState = {
  items: [],
  loading: false,
  error: null,
};

const isPending = action =>
  typeof action.type === 'string' && action.type.endsWith('/pending');
const isRejected = action =>
  typeof action.type === 'string' && action.type.endsWith('/rejected');

const contactsPending = state => {
  state.loading = true;
  state.error = null;
};
const contactsRejected = state => {
  state.loading = false;
  state.error = true;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })

      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.loading = false;
      })

      .addMatcher(isPending, contactsPending)
      .addMatcher(isRejected, contactsRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
