import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Register = () => {
    const [newUserData, setNewUserData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
        userType: 'Lifeguard'
    });

    const { name, email, password, re_password, userType } = newUserData

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/recordings');
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setNewUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== re_password) {
            toast.error('Passwords do not match!');
        } else {
            const userData = {
                name,
                email,
                password,
                userType
            };

            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Let's create your account</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder='Enter your email'
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter password'
                        autoComplete='on'
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        className='form-control'
                        id='re_password'
                        name='re_password'
                        value={re_password}
                        placeholder='Confirm password'
                        autoComplete='on'
                        onChange={onChange}
                    />
                </div>
                <div style={{ padding: '3%', justifyContent: 'space-between', display: 'table' }}>
                    <input style={{ paddingLeft: '30%' }}
                        type='checkbox'
                        className='form-control'
                        id='userType'
                        name='userType'
                        value='Admin'
                        onChange={onChange}
                    />
                    <label for='Admin'> Admin</label>
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
};

export default Register;
