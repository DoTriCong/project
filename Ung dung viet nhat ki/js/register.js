document.querySelector('.register-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn form reload trang
    
    // Lấy giá trị các trường input
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    
    // Kiểm tra điều kiện đầu vào
    if (!firstName || !lastName) {
      alert('Họ và tên không được để trống');
      return;
    }
    if (!email) {
      alert('Email không được để trống');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email phải đúng định dạng');
      return;
    }
    if (!password) {
      alert('Mật khẩu không được để trống');
      return;
    }
    if (password.length < 6) {
      alert('Mật khẩu tối thiểu 6 ký tự');
      return;
    }
    if (!confirmPassword) {
      alert('Mật khẩu xác nhận không được để trống');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu phải trùng khớp');
      return;
    }
  
    // Kiểm tra email đã tồn tại
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      alert('Email này đã được đăng ký trước đó!');
      return;
    }
  
    // Lưu thông tin người dùng vào localStorage
    const newUser = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      status: "hoạt động" // Mặc định trạng thái là hoạt động
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  
    // Thông báo và chuyển hướng
    alert('Đăng ký thành công!');
    window.location.href = './login.html'; // Chuyển hướng sang trang đăng nhập
  });
  