import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import UserCreation from '../components/CreateUser.jsx'; // Asegúrate de tener este import correcto
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <UserCreation />
      </React.StrictMode>
    );
  };

  const getUsersList = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    axios
      .get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios:', error);
        setLoading(false);
        toast.warning('La lista de usuarios está vacía', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <body>
      <div>
        <button type="button" onClick={back} style={styles.tryAgain}>
          Go back
        </button>

        <h1 style={styles.title}>Users List</h1>
        <button type="button" onClick={getUsersList} style={styles.createButton}>
          Search
        </button>
        <p></p>
        {loading ? (
          <p>Loading Users...</p>
        ) : users.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableCell}>ID</TableCell>
                <TableCell style={styles.tableCell}>Username</TableCell>
                <TableCell style={styles.tableCell}>Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={styles.tableComponent} component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell style={styles.tableComponent}>{user.username}</TableCell>
                  <TableCell style={styles.tableComponent}>{user.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No Users available.</p>
        )}
        <ToastContainer />
      </div>
    </body>
  );
}

export default UserList;

const styles = {
  createButton: {
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  tryAgain: {
    backgroundColor: 'white',
    color: '#000',
    fontStyle: 'italic',
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
  tableCell: {
    backgroundColor: 'orange',
    color: 'black',
    fontWeight: 'bold',
  },
  tableComponent: {
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
  },
};
