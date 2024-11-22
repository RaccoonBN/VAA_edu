import React, { useState } from 'react';
import './login.css'; 
import { FaLock, FaUser } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../img/logo.png';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Matkhau, setMatkhau] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Kiểm tra định dạng email
        if (!/\S+@\S+\.\S+/.test(Email)) {
            toast.error('Email không hợp lệ!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/login/login', { Email, Matkhau }, { withCredentials: true });

            if (res.status === 200) {
                // Session sẽ được lưu ở server và cookies sẽ tự động được gửi về client
                toast.success('Đăng nhập thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    navigate('/home'); // Chuyển hướng tới trang Home sau khi đăng nhập thành công
                }, 3000);
            }

        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error(err.response.data.msg || 'Đăng nhập thất bại!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div className='container'>
            <ToastContainer />
            <div className='wrapper'>
                <div className='form-box'>
                    <form onSubmit={handleLogin}>
                        <h1>ĐĂNG NHẬP</h1>
                        <div className="input-box">
                            <input 
                                type="text" 
                                placeholder='Email' 
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input 
                                type="password" 
                                placeholder='Mật Khẩu' 
                                value={Matkhau}
                                onChange={(e) => setMatkhau(e.target.value)} 
                                required 
                            />
                            <FaLock className='icon' />
                        </div>
                        <button type='submit'>Đăng Nhập</button>
                    </form>
                </div>
            </div>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="dream-text">
                <p>Let your dream fly - Let your dream fly - Let your dream fly - Let your dream fly - Let your dream fly - Let your dream fly - Let your dream fly - Let your dream fly</p>
            </div>
        </div>
    );
};

export default Login;
