
import React from 'react'
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchRoom from './SearchRoom'
import Login from './Login'
import Error from './Error'
import PrivateWrapper from './PrivateWrapper'




function App() {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* <PrivateRoute exact path='/' element={<SearchRoom />} /> */}
              <Route element={<PrivateWrapper />}>
                <Route exact path='/' element={<SearchRoom />} />
              </Route>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
