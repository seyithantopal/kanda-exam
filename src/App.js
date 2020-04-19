import React, { useContext, useReducer } from 'react';
import './App.css';

import { UserContext } from './UserContext';
import SignupForm from './SignupForm';
import Success from './Success';

function App() {

  const user = useContext(UserContext)

  const [state, dispatch] = useReducer((state, action) => ({
    ...state, ...action
  }), user);



  if(state.isSigned) {
    return (
      <Success />
    );
  } else {
    return (
      <div className="App">
        <UserContext.Provider value={{state, dispatch}}>
          <SignupForm />
        </UserContext.Provider>
    </div>
    );
  }
}

export default App;
