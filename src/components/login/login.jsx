import React from 'react';
import './login.css'; 
import { FaLock, FaUser } from "react-icons/fa";
import logo from '../../img/logo.png'; // Đường dẫn chính xác

const Login = () => {
    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='form-box'>
                    <form action="">
                        <h1>ĐĂNG NHẬP</h1>
                        <div className="input-box">
                            <input type="text" placeholder='Email' required />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Mật Khẩu' required />
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

export default Login; // Đảm bảo xuất component
