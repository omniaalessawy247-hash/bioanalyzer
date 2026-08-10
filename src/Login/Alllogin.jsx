import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Allnavbar from '../Home/Allnavbar';
import Allfooter from '../Home/Allfooter';

const AuthPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [userData, setUserData] = useState({
    name: '',
    address: '',
    birthdate: '',
    email: '',
    password: '',
  });

  const [authState, setAuthState] = useState('login'); // "login" or "signup"
  const [message, setMessage] = useState('');

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleChangeSignup = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('You have successfully logged in!');
  };

  const handleSocialLogin = (platform) => {
    setMessage(`You have successfully logged in with ${platform}`);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setMessage('You have successfully registered!');
  };

  const toggleForm = () => {
    setAuthState(authState === 'login' ? 'signup' : 'login');
    setMessage('');
  };

  return (
    <div>
      <Allnavbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container className="auth-container">
        <h1 className="mb-4">{authState === 'login' ? 'Login' : 'Sign Up'}</h1>
        
        {/* Login Form */}
        {authState === 'login' && (
          <Form onSubmit={handleLogin} className="animated-bounce-form">
            <div className="input-container">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3} className="form-label">Email :</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChangeLogin}
                    required
                    placeholder="Enter your email"
                    className="form-control"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="input-container">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3} className="form-label">Password :</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChangeLogin}
                    required
                    placeholder="Enter your password"
                    className="form-control"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="extra-links">
              <a href="#!" className="register-link" onClick={toggleForm}>Don't have an account? Sign up</a><br />
              <a href="/forgot-password" className="forgot-password-link">Forgot your password?</a>
            </div>
            <Button variant="primary" type="submit" className="mt-3">Login</Button>

            <div className="social-login">
              <button className="social-btn facebook-btn" onClick={() => handleSocialLogin('Facebook')}>Login with Facebook</button>
              <button className="social-btn google-btn" onClick={() => handleSocialLogin('Google')}>Login with Google</button>
            </div>
          </Form>
        )}

        {/* Sign Up Form */}
        {authState === 'signup' && (
          <Form onSubmit={handleSignUp} className="animated-bounce-form">
            <div className="input-container">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3} className="form-label">Name :</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChangeSignup}
                    required
                    placeholder="Enter your name"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="input-container">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3} className="form-label">Address :</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChangeSignup}
                    required
                    placeholder="Enter your address"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="input-container">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3} className="form-label">Date of Birth :</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="date"
                    name="birthdate"
                    value={userData.birthdate}
                    onChange={handleChangeSignup}
                    required
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="input-container">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3} className="form-label">Email :</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChangeSignup}
                    required
                    placeholder="Enter your email"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="input-container">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column md={3} className="form-label">Password :</Form.Label>
                <Col md={6}>
                  <Form.Control
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChangeSignup}
                    required
                    placeholder="Enter your password"
                  />
                </Col>
              </Form.Group>
            </div>

            <Button variant="primary" type="submit" className="mt-3">Sign Up</Button>
            <div className="extra-links">
              <a href="#!" className="register-link" onClick={toggleForm}>Already have an account? Login</a>
            </div>
          </Form>
        )}

        {/* Display Success Message */}
        {message && <p className="auth-message">{message}</p>}
      </Container>
      <Allfooter />
    </div>
  );
};

export default AuthPage;
