// import { createSelector } from '@reduxjs/toolkit';

// export const selectContactsLoading = state => state.contacts.loading;
// export const selectContactsError = state => state.contacts.error;

// const selectContacts = state => state.contacts.items;
// const selectNameFilter = state => state.filters.name;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filters) => {
//     return contacts
//       .filter(item => item.name.toLowerCase().includes(filters.toLowerCase()))
//       .toSorted((a, b) => a.name.localeCompare(b.name));
//   }
// );
