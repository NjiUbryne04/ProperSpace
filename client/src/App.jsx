import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './guards/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyListings from './pages/MyListings';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import PropertyDetail from './pages/PropertyDetail';
import Profile from './pages/Profile';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings/mine"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings/new"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings/:id/edit"
            element={
              <ProtectedRoute>
                <EditListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
