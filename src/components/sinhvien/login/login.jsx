import React, { useState } from 'react';
import './login.css'; 
import { FaLock, FaUser } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import thư viện Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của Toastify
import { useNavigate } from 'react-router-dom'; // Để điều hướng khi đăng nhập thành công
import logo from '../../../img/logo.png'; // Đường dẫn chính xác từ login.jsx

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Matkhau, setMatkhau] = useState('');
    const navigate = useNavigate(); // Để điều hướng trang

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
            const res = await axios.post('http://localhost:5000/api/login', { Email, Matkhau });
            
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            localStorage.setItem('MaSV', res.data.MaSV);

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
            }, 3000); // Đợi 3 giây trước khi chuyển hướng
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
            <ToastContainer /> {/* Thành phần thông báo */}
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
