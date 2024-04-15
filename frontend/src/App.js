import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router.js'
import { ThemeProvider } from './Helper/ThemeProvider.jsx';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
      
    </div>
  );
}

export default App;
