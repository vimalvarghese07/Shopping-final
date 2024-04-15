import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem('token') !== null,
  user:localStorage.getItem('user')
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.payload.token) );
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'USER':
      localStorage.setItem('user',JSON.stringify(action.payload.user));
      return{
        ...state,
      }
      
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };