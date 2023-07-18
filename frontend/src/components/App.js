import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard'

function App() {
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute component={Dashboard}/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
