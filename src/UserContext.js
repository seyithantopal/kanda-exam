import React, { createContext } from 'react';

const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
    errors: {},
    isSigned: false
};

export const UserContext = createContext(user);