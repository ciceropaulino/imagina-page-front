import { useState } from 'react';
import './Login.css'; 
import { Field, Input, Label, Button } from '@headlessui/react';
import clsx from 'clsx';
import background from '../../assets/images/bg-login.png';
import colorLogo from '../../assets/images/color-cube-logo.png';
import textLogo from '../../assets/images/full-logo-only-text.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


const handleLogin = async (event) => {
  event.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await axios.post('http://localhost:8080/auth/login', {
      username,
      password,
    });

    // Sucesso: armazene o token, a role e redirecione
    localStorage.setItem('accessToken', response.data.token);
    localStorage.setItem('userRole', response.data.role); // Salva a role
    alert('Login realizado com sucesso!');
    setLoading(false);
    if (response.data.role === 'ADMIN') {
      navigate('/people');
    } else {
      navigate('/');
    }
  } catch (err) {
    // Erro na autenticação
    setError('Login falhou. Verifique suas credenciais.');
    setLoading(false);
  }
};

  return (
    <div className="login-container relative w-screen h-screen">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <div className="login-left-panel flex-1 flex justify-center items-center">
        <img src={colorLogo} alt="Logo" className="w-2/3 max-w-xs h-auto" />
      </div>

      <div className="login-right-panel flex-1 flex items-center justify-center bg-[#272727]/50 backdrop-blur-sm">
        <div className="w-full max-w-md flex flex-col items-center justify-center space-y-6 mx-auto">
          <img src={textLogo} alt="Logo" className="w-2/3 max-w-xs h-auto" />

          <form className="login-form w-full space-y-6" onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold text-white">Login</h2>

            <Field>
              <Label className="text-sm font-medium text-white block">User</Label>
              <Input
                className={clsx(
                  'block w-full rounded-lg border-none bg-white/10 py-2 px-3 text-sm text-white',
                  'focus:outline-none focus:ring-2 focus:ring-white/50'
                )}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label className="text-sm font-medium text-white block">Password</Label>
              <Input
                type="password"
                className={clsx(
                  'block w-full rounded-lg border-none bg-white/10 py-2 px-3 text-sm text-white',
                  'focus:outline-none focus:ring-2 focus:ring-white/50'
                )}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className={clsx(
                'w-full inline-flex justify-center items-center rounded-md bg-black/50 py-2 px-4 text-sm font-semibold text-white',
                'shadow-inner shadow-white/10 focus:outline-none active:bg-black/70 backdrop-blur-md'
              )}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          <div className="mt-6">
            <a
              href="#"
              className="text-sm font-medium text-white underline hover:text-gray-400"
            >
              Change password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

