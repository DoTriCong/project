// Lấy danh sách user từ localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Cấu hình phân trang
const itemsPerPage = 5;
let currentPage = 1;

// Hiển thị danh sách user
function renderUserList(filteredUsers) {
  const tbody = document.querySelector('.user-list tbody');
  tbody.innerHTML = ''; // Xóa nội dung cũ

  // Tính toán số lượng user cần hiển thị theo phân trang
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const usersToDisplay = filteredUsers.slice(start, end);

  // Hiển thị danh sách user trong bảng
  usersToDisplay.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name || 'Không xác định'}</td>
      <td>${user.status || 'Không xác định'}</td>
      <td>${user.email || 'Không xác định'}</td>
      <td>
        <a href="#" class="block-btn">block</a> 
        <a href="#" class="unblock-btn">unblock</a>
      </td>
      <td></td>
    `;
    tbody.appendChild(row);
  });

  updatePagination(filteredUsers);
}

// Cập nhật phân trang
function updatePagination(filteredUsers) {
  const pagination = document.querySelector('.pagination .page-numbers');
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  pagination.innerHTML = ''; // Xóa nội dung cũ
  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.textContent = i;
    pageNumber.classList.add(i === currentPage ? 'active' : '');
    pageNumber.addEventListener('click', () => {
      currentPage = i;
      renderUserList(filteredUsers);
    });
    pagination.appendChild(pageNumber);
  }
}

// Tìm kiếm người dùng theo tên
document.querySelector('.topbar input').addEventListener('input', (event) => {
  const searchValue = event.target.value.toLowerCase().trim();

  // Lọc danh sách theo tên nhập vào
  const filteredUsers = users.filter(user =>
    user.name && user.name.toLowerCase().includes(searchValue)
  );

  // Nếu không tìm thấy, hiển thị thông báo
  if (filteredUsers.length === 0) {
    alert('Không tìm thấy người dùng phù hợp!');
  }

  // Hiển thị kết quả tìm kiếm
  currentPage = 1; // Reset về trang đầu tiên
  renderUserList(filteredUsers);
});

// Sắp xếp theo tên user
document.querySelector('.user-list thead th:nth-child(5)').addEventListener('click', () => {
  users.sort((a, b) => a.name.localeCompare(b.name));
  renderUserList(users);
});

// Khởi tạo danh sách user đầy đủ khi trang tải
renderUserList(users);
