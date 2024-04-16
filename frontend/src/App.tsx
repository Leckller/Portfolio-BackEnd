import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Context from './Context.tsx';
import Login from './routes/Login.tsx';
import Home from './routes/Home.tsx';

function App() {
  const prov = useContext(Context);
  if (!prov.login) {
    return (
      <Routes>
        <Route path="*" element={ <Login /> } />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="*" element={ <Login /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/tec" element={ <Home /> } />
    </Routes>
  );
}

export default App;
