import { db } from './firebase';


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

  export const setWalletData = (id, page, walletId, value) =>
  db.ref(`walletData/${id}/${page}`).push({
    walletId,
    value
  });

  export const getWalletData = (id, page) =>
  db.ref(`walletData/${id}/${page}`)

  export const setPages = (id, page) =>
  db.ref(`pages/${id}`).push({
    page,
  });

  export const getPagesData = (id) =>
  db.ref(`pages/${id}`)