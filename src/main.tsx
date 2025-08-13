import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile.tsx';
import Chat from './pages/Chat.tsx';
import Register from './pages/Register.tsx';
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
});
