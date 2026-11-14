import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Dashboard({ user }) {
  async function logout() {
    await signOut(auth);
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Protected Student Dashboard</h1>
      <p>Authenticated account: <strong>{user.email}</strong></p>
      <button onClick={logout}>Logout</button>
    </main>
  );
}