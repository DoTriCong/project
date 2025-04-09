document.querySelector('.register-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Ngăn chặn form reload trang
  
  // Lấy giá trị các trường input
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();
  
  // Xóa các thông báo lỗi trước đó
  clearErrors();

  let isValid = true;

  // Kiểm tra điều kiện đầu vào
  if (!firstName) {
    showError('first-name', 'Họ không được để trống');
    isValid = false;
  }

  if (!lastName) {
    showError('last-name', 'Tên không được để trống');
    isValid = false;
  }

  if (!email) {
    showError('email', 'Email không được để trống');
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('email', 'Email phải đúng định dạng');
      isValid = false;
    }
  }

  if (!password) {
    showError('password', 'Mật khẩu không được để trống');
    isValid = false;
  } else if (password.length < 6) {
    showError('password', 'Mật khẩu tối thiểu 6 ký tự');
    isValid = false;
  }

  if (!confirmPassword) {
    showError('confirm-password', 'Mật khẩu xác nhận không được để trống');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('confirm-password', 'Mật khẩu phải trùng khớp');
    isValid = false;
  }

  // Kiểm tra email đã tồn tại
  if (isValid) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      showError('email', 'Email này đã được đăng ký trước đó!');
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
    
    Swal.fire({
      title: 'Đăng ký thành công!',
      text: 'Hãy đăng nhập để tiếp tục sử dụng dịch vụ.',
      icon: 'success',
      confirmButtonText: 'Đăng nhập'
    }).then(() => {
      window.location.href = './login.html';
    });
    
  }
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.createElement('span');
  errorSpan.classList.add('error');
  errorSpan.innerText = message;
  field.parentElement.appendChild(errorSpan);
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach((error) => error.remove());
}

function showSuccessMessage(message) {
  const form = document.querySelector('.register-form');
  const successMessage = document.createElement('p');
  successMessage.classList.add('success');
  successMessage.innerText = message;
  form.appendChild(successMessage);

 
}
