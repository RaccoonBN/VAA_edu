// src/App.js
import React from 'react';
import Login from './components/login/login'; // Đảm bảo đường dẫn bắt đầu bằng './'

function App() {
  return (
    <div>
      <Login /> {/* Đảm bảo component được gọi với chữ hoa */}
    </div>
  );
}

export default App;
