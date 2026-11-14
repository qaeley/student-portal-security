import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Dashboard({ user }) {
  async function logout() {
    await signOut(auth);
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
      <h1>Protected Student Dashboard</h1>
      <p>Authenticated account: <strong>{user.email}</strong></p>
      <button onClick={logout}>Logout</button>
    </main>
  );
}