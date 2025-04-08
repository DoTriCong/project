document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn form reload trang
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Kiểm tra điều kiện đầu vào
    if (!email) {
      alert('Email không được để trống');
      return;
    }
    if (!password) {
      alert('Mật khẩu không được để trống');
      return;
    }
  
    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);
  
    if (user) {
      alert('Đăng nhập thành công!');
      window.location.href = './dashboard.html'; 
    } else {
      alert('Email hoặc mật khẩu không đúng');
    }
  });
  