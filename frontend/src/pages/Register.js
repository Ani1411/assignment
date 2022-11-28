import './../css/login.css'
import Button from "../Elements/Button";
import Input from "../Elements/Input";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios-service';


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password: '',
    });

    const { username, email, password } = formData;
    const onInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = () => {
        axiosInstance.post('/register', {
            username, email, password
        })
            .then(res => {
                console.log(res.data)
                
                navigate('/')
            })
            .catch(err => console.log(err.response))
    }

    return <div className="login-container">
        <div className="login-content">
            <Input
                type='text'
                name='username'
                placeholder='username'
                value={username}
                onChange={onInputChange}
            /><br />
            <Input
                type='email'
                name='email'
                placeholder='email'
                value={email}
                onChange={onInputChange}
            /><br />
            <Input
                type='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={onInputChange}
            /><br />
            <Button onClick={handleRegister} text={<strong>Register</strong>} />
            <span>Already have an account. <a href="/">Login</a></span>
        </div>
    </div>
}

export default Register;