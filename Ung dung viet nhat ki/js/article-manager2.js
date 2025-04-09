const posts = JSON.parse(localStorage.getItem("posts")) || [
  {
    id: 1,
    image: "../assets/images/Bài viết 1.png",
    title: "Học nấu cá sốt cà chua",
    category: "Nấu ăn",
    content: "Tôi đã học được cách nấu ăn...",
    status: "Public",
  },
  {
    id: 2,
    image: "../assets/images/Bài viết 2.png",
    title: "Bí kíp viết CV ngành IT",
    category: "IT",
    content: "Chia sẻ cách viết CV ấn tượng...",
    status: "Private",
  },
  {
    id: 3,
    image: "../assets/images/congnghe.jpg",
    title: "Chủ đề công nghệ mới",
    category: "Công nghệ",
    content: "Tin tức về AI và blockchain...",
    status: "Public",
  },
];

const postPerPage = 2;
let currentPage = 1;

const tbody = document.querySelector("tbody");
const pagination = document.querySelector(".pagination");

function renderPosts() {
  tbody.innerHTML = "";

  const start = (currentPage - 1) * postPerPage;
  const end = start + postPerPage;
  const currentPosts = posts.slice(start, end);

  currentPosts.forEach((post) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${post.image}" alt="Ảnh bài viết" /></td>
      <td>${post.title}</td>
      <td>${post.category}</td>
      <td>${post.content}</td>
      <td><span class="badge ${post.status.toLowerCase()}">${post.status}</span></td>
      <td>
        <select onchange="changeStatus(${post.id}, this.value)">
          <option value="Public" ${post.status === "Public" ? "selected" : ""}>Public</option>
          <option value="Private" ${post.status === "Private" ? "selected" : ""}>Private</option>
        </select>
      </td>
      <td>
        <button onclick="editPost(${post.id})">Sửa</button>
        <button class="delete" onclick="deletePost(${post.id})">Xoá</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  renderPagination();
}
document.getElementById("showFormBtn").addEventListener("click", () => {
  Swal.fire({
    title: "Thêm bài viết mới",
    html: `
      <input id="postTitle" class="swal2-input" placeholder="Tiêu đề">
      <input id="postCategory" class="swal2-input" placeholder="Chủ đề">
      <textarea id="postContent" class="swal2-textarea" placeholder="Nội dung"></textarea>
      <input id="postImage" class="swal2-input" placeholder="Link ảnh (tuỳ chọn)">
    `,
    showCancelButton: true,
    confirmButtonText: "Lưu",
    cancelButtonText: "Hủy",
    preConfirm: () => {
      // Lấy giá trị từ các trường nhập liệu
      const title = document.getElementById("postTitle").value.trim();
      const category = document.getElementById("postCategory").value.trim();
      const content = document.getElementById("postContent").value.trim();
      const image = document.getElementById("postImage").value.trim() || "../assets/images/default.png";

      // Kiểm tra đầu vào
      if (!title || !category || !content) {
        Swal.showValidationMessage("Vui lòng nhập đầy đủ thông tin!");
        return false;
      }
      return { title, category, content, image }; 
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Thêm bài viết mới
      const newPost = {
        id: Date.now(),
        title: result.value.title,
        category: result.value.category,
        content: result.value.content,
        image: result.value.image,
        status: "Public",
      };

      // Lưu bài viết vào danh sách và hiển thị lại
      posts.unshift(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();

      Swal.fire("Thành công!", "Bài viết mới đã được thêm thành công.", "success");
    }
  });
});

function renderPagination() {
  pagination.innerHTML = "";

  const totalPage = Math.ceil(posts.length / postPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.innerText = "← Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderPosts();
  };
  pagination.appendChild(prevBtn);

  let maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(totalPage, maxVisiblePages);
  }

  if (currentPage >= totalPage - 2) {
    startPage = Math.max(1, totalPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    addPage(1);
    if (startPage > 2) {
      addDots();
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    addPage(i);
  }

  if (endPage < totalPage) {
    if (endPage < totalPage - 1) {
      addDots();
    }
    addPage(totalPage);
  }

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next →";
  nextBtn.disabled = currentPage === totalPage;
  nextBtn.onclick = () => {
    currentPage++;
    renderPosts();
  };
  pagination.appendChild(nextBtn);

  function addPage(i) {
    const span = document.createElement("span");
    span.innerText = i;
    span.classList.add("page-number");
    if (i === currentPage) span.classList.add("active");
    span.onclick = () => {
      currentPage = i;
      renderPosts();
    };
    pagination.appendChild(span);
  }

  function addDots() {
    const dots = document.createElement("span");
    dots.innerText = "...";
    dots.classList.add("dots");
    pagination.appendChild(dots);
  }
}

function changeStatus(id, newStatus) {
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.status = newStatus;

    // Lưu danh sách bài viết vào localStorage
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

function deletePost(id) {
  Swal.fire({
    title: "Bạn có chắc chắn muốn xoá bài viết này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xoá",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      const index = posts.findIndex((p) => p.id === id);
      if (index !== -1) {
        posts.splice(index, 1);

        // Cập nhật lại localStorage
        localStorage.setItem("posts", JSON.stringify(posts));

        const totalPage = Math.ceil(posts.length / postPerPage);
        if (currentPage > totalPage) {
          currentPage = totalPage || 1;
        }

        renderPosts();
        Swal.fire("Đã xoá!", "Bài viết đã được xoá thành công.", "success");
      }
    }
  });
}

function addPost() {
  const title = document.getElementById("postTitle").value.trim();
  const category = document.getElementById("postCategory").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const image = document.getElementById("postImage").value.trim() || "../assets/images/default.png";

  if (!title || !category || !content) {
    Swal.fire({
      icon: "error",
      title: "Lỗi!",
      text: "Vui lòng nhập đầy đủ thông tin bài viết.",
    });
    return;
  }

  const newPost = {
    id: Date.now(),
    image,
    title,
    category,
    content,
    status: "Public",
  };

  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  currentPage = 1;
  renderPosts();

  Swal.fire({
    icon: "success",
    title: "Thành công!",
    text: "Bài viết đã được thêm thành công.",
  });

  document.getElementById("addPostForm").reset();
}

function editPost(id) {
  const post = posts.find((p) => p.id === id);
  if (post) {
    Swal.fire({
      title: "Sửa bài viết",
      html: `
        <input id="editTitle" class="swal2-input" placeholder="Tiêu đề" value="${post.title}">
        <input id="editCategory" class="swal2-input" placeholder="Chủ đề" value="${post.category}">
        <textarea id="editContent" class="swal2-textarea" placeholder="Nội dung">${post.content}</textarea>
      `,
      confirmButtonText: "Lưu",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      preConfirm: () => {
        const newTitle = document.getElementById("editTitle").value.trim();
        const newCategory = document.getElementById("editCategory").value.trim();
        const newContent = document.getElementById("editContent").value.trim();

        if (!newTitle || !newCategory || !newContent) {
          Swal.showValidationMessage("Vui lòng nhập đầy đủ thông tin.");
        }

        return { newTitle, newCategory, newContent };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { newTitle, newCategory, newContent } = result.value;
        post.title = newTitle;
        post.category = newCategory;
        post.content = newContent;

        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
        Swal.fire("Thành công!", "Bài viết đã được chỉnh sửa.", "success");
      }
    });
  }
}
renderPosts();
