import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';
import { DataProvider } from '../contexts/DataContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute component={Dashboard} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
