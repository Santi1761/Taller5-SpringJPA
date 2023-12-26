import React, { useState } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import User from '../components/CreateUser.jsx';

function UpdateUser() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <User />
      </React.StrictMode>
    );
  };

  const handleFind = () => {
    const token = localStorage.getItem('token');

    axios
      .get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { username, password } = response.data;
        setUserData({
          username,
          password,
        });
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del usuario:', error);
        toast.error('Error al obtener los detalles del usuario', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  const handleUpdateUser = () => {
    const token = localStorage.getItem('token');

    axios
      .put(`/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Usuario actualizado:', response.data);
          toast.success('Usuario actualizado con éxito', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario:', error);
        if (error.response) {
          if (error.response.status === 400) {
            toast.error('Error en la solicitud. Verifique los datos proporcionados.', {
              position: 'top-right',
              autoClose: 3000,
            });
          } else if (error.response.status === 401) {
            toast.error('No autorizado. Inicie sesión nuevamente.', {
              position: 'top-right',
              autoClose: 3000,
            });
          } else {
            toast.error('Error al actualizar el usuario', {
              position: 'top-right',
              autoClose: 3000,
            });
          }
        } else {
          toast.error('Error de red. Por favor, inténtelo de nuevo más tarde.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>UPDATE USER</h1>
      <form>
        <div>
          <label htmlFor="userId" style={styles.label}>
            ID for search:
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={handleFind} style={styles.button}>
            Search
          </button>
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </form>
      <button type="button" onClick={handleUpdateUser} style={styles.buttonU}>
        Update
      </button>
      <p></p>
      <button type="button" onClick={back}>
        Go Back
      </button>
      <ToastContainer />
    </div>
  );
}

export default UpdateUser;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    backgroundColor: 'darkorange',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontSize: '2em',
    padding: '10px 0',
    borderRadius: '10px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '4px',
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '47%',
    padding: '11px',
    border: '4px solid #ccc',
    borderRadius: '10px',
  },
  buttonU: {
    backgroundColor: 'green',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};
