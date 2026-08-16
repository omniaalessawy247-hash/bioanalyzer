import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';


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
    <div className="auth-page">
      <Container className="auth-container">
        {/* Tab switch */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${authState === 'login' ? 'active' : ''}`}
            onClick={() => authState !== 'login' && toggleForm()}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab ${authState === 'signup' ? 'active' : ''}`}
            onClick={() => authState !== 'signup' && toggleForm()}
          >
            Sign Up
          </button>
        </div>

        <h1 className="auth-title">{authState === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="auth-subtitle">
          {authState === 'login'
            ? 'Enter your details to access your workspace.'
            : 'It takes less than a minute to get started.'}
        </p>

        {/* Login Form */}
        {authState === 'login' && (
          <Form onSubmit={handleLogin} className="auth-form">
            <div className="input-container">
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChangeLogin}
                  required
                  placeholder="Enter your email"
                  className="form-control"
                />
              </Form.Group>
            </div>

            <div className="input-container">
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChangeLogin}
                  required
                  placeholder="Enter your password"
                  className="form-control"
                />
              </Form.Group>
            </div>

            <div className="extra-links extra-links-top">
              <a href="/forgot-password" className="forgot-password-link">Forgot your password?</a>
            </div>

            <Button variant="primary" type="submit" className="submit-btn">Login</Button>

            <div className="divider"><span>or continue with</span></div>

            <div className="social-login">
              <button type="button" className="social-btn facebook-btn" onClick={() => handleSocialLogin('Facebook')}>Facebook</button>
              <button type="button" className="social-btn google-btn" onClick={() => handleSocialLogin('Google')}>Google</button>
            </div>

            <div className="extra-links">
              <span>Don't have an account? </span>
              <a href="#!" className="register-link" onClick={toggleForm}>Sign up</a>
            </div>
          </Form>
        )}

        {/* Sign Up Form */}
        {authState === 'signup' && (
          <Form onSubmit={handleSignUp} className="auth-form">
            <div className="input-container">
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChangeSignup}
                  required
                  placeholder="Enter your name"
                />
              </Form.Group>
            </div>

            <div className="input-container">
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChangeSignup}
                  required
                  placeholder="Enter your address"
                />
              </Form.Group>
            </div>

            <Row>
              <Col md={6}>
                <div className="input-container">
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthdate"
                      value={userData.birthdate}
                      onChange={handleChangeSignup}
                      required
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                <div className="input-container">
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChangeSignup}
                      required
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                </div>
              </Col>
            </Row>

            <div className="input-container">
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChangeSignup}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>
            </div>

            <Button variant="primary" type="submit" className="submit-btn">Sign Up</Button>

            <div className="extra-links">
              <span>Already have an account? </span>
              <a href="#!" className="register-link" onClick={toggleForm}>Login</a>
            </div>
          </Form>
        )}

        {/* Display Success Message */}
        {message && <p className="auth-message">{message}</p>}
      </Container>
    </div>
  );
};

export default AuthPage;