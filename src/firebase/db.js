import { db } from './firebase';

// User API

export const doCreateUser = (id, email, password) =>
  db.ref(`users/${id}`).set({
    email,
    password,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const setUsersClick = (id, click, transaction) =>
  db.ref(`clickData/${id}`).set({
    click,
    transaction,
  });

  export const getUsersClick = (id) =>
  db.ref(`clickData/${id}`)

  export const setWalletData = (id, page, walletId) =>
  db.ref(`walletData/${id}/${page}`).push({
    walletId,
  });

  export const getWalletData = (id, page) =>
  db.ref(`walletData/${id}/${page}`)

// Other db APIs ...