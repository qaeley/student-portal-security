import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export function validatePassword(value) {
  if (!value) {
    return 'Password is required.';
  }
  if (value.length < 8) {
    return 'Password must contain at least 8 characters.';
  }
  return null;
}

export default function LoginScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    const pwdError = validatePassword(password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    setBusy(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      const messages = {
        'auth/invalid-credential': 'Unable to sign in with these credentials.',
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/weak-password': 'Please choose a stronger password.',
      };
      setError(messages[err.code] ?? 'Authentication failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ 
      maxWidth: '400px', 
      margin: '4rem auto', 
      padding: '2rem', 
      fontFamily: 'sans-serif', 
      textAlign: 'center',
      border: '1px solid #ccc',
      borderRadius: '8px'
    }}>
      <h1>{isRegister ? 'Student Registration' : 'Student Login'}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@example.com"
          />
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
          />
        </div>
        <br />
        <button type="submit" disabled={busy}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

      <br />
      <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
        {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </main>
  );
}