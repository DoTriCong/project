document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); // Ngăn chặn form reload trang

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Xóa thông báo lỗi trước đó
  clearErrors();

  let isValid = true;

  // Kiểm tra email
  if (!email) {
    showError("emailError", "Email không được để trống");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    showError("emailError", "Email phải đúng định dạng");
    isValid = false;
  }

  if (!password) {
    showError("passwordError", "Mật khẩu không được để trống");
    isValid = false;
  }

  // Xác thực thông tin đăng nhập
  if (isValid) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // Hiển thị thông báo đăng nhập thành công với SweetAlert2
      Swal.fire({
        title: "Đăng nhập thành công!",
        text: "Chào mừng bạn quay lại!",
        icon: "success",
        confirmButtonText: "Tiếp tục",
      }).then(() => {
        window.location.href = './dashboard.html'; 
      });
    } else {
      showError("emailError", "Email hoặc mật khẩu không đúng");
    }
  }
});

function showError(id, message) {
  const errorSpan = document.getElementById(id);
  if (errorSpan) {
    errorSpan.innerText = message;
  }
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((span) => {
    span.innerText = "";
  });
}
