import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../config/axios';
import DashboardPage from '../components/DashboardPage.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Dash from '../components/DashboardPage.jsx';
import List from '../components/ShowUserList.jsx';
import Delete from '../components/DeleteUser.jsx';
import Update from '../components/UpdateUser.jsx';

function CreateUser() {
    const [value, setValue] = useState(0);

    // Utiliza un solo estado para todos los datos del usuario
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };

    const handleDashboard = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Dash />
            </React.StrictMode>
        );
    };

    const handleShowList = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <List />
            </React.StrictMode>
        );
    };

    const handleDelete = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Delete />
            </React.StrictMode>
        );
    };

    const handleUpdate = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Update />
            </React.StrictMode>
        );
    };

    const handleCreateUser = () => {
        if (!userData.username.trim() || !userData.password.trim()) {
            toast.error('El nombre de usuario y la contraseña del usuario no pueden estar vacíos', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        const token = localStorage.getItem('token');
        axios
            .post('/users', userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 201) {
                    toast.success('Usuario creado exitosamente', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .catch((error) => {
                console.error('Error de autenticación:', error);
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error('Credenciales incorrectas. Por favor, inténtelo de nuevo.', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    } else if (error.response.status === 500) {
                        toast.error('Error interno del servidor. Por favor, inténtelo de nuevo más tarde.', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    } else {
                        toast.error('Error. Por favor, inténtelo de nuevo más tarde.', {
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

    return (
        <div style={styles.container}>
            <Box
                sx={{
                    maxWidth: { xs: 320, sm: 1000 },
                    bgcolor: 'background.paper',
                    margin: '0 auto',
                    padding: '20px',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChangee}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Back to Dashboard" onClick={handleDashboard} />
                    <Tab label="Create User" />
                    <Tab label="Update User" onClick={handleUpdate} />
                    <Tab label="Delete User" onClick={handleDelete} />
                    <Tab label="Get User List" onClick={handleShowList} />
                </Tabs>
            </Box>
            <h1 style={styles.heading}>Create user</h1>
            <form>
                <div style={styles.formGroup}>
                    <label htmlFor="username" style={styles.label}>
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        style={styles.input}
                    />
                </div>
                <button type="button" onClick={handleCreateUser} style={styles.button}>
                    Create
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
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
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
    },
    button: {
        backgroundColor: 'green',
        color: '#000',
        border: 'none',
        borderRadius: '3px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
};

export default CreateUser;
