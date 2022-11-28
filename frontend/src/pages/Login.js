import './../css/login.css'
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios-service';


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;
    const onInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = () => {
        axiosInstance.post('/login', {
            username, password
        })
            .then(res => {
                console.log(res)
                const { user, token } = res.data
                localStorage.setItem('token', `Token ${token}`)
                localStorage.setItem('user', user.username)
                navigate('/boards')
            })
            .catch(err => console.log(err.response))
    }

    return <div className="login-container">
        <div className="login-content">
            <Input
                type='text'
                name='username'
                placeholder='username/email'
                value={username}
                onChange={onInputChange}
            /><br />
            <Input
                type='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={onInputChange}
            /><br />
            <Button onClick={handleLogin} text={<strong>Login</strong>} />

        </div>
    </div>
}

export default Login;