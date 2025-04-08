const posts = [
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
  const addBtn = document.querySelector("#addPostBtn");
  
  function renderPosts() {
    tbody.innerHTML = "";
  
    const start = (currentPage - 1) * postPerPage;
    const end = start + postPerPage;
    const currentPosts = posts.slice(start, end);
  
    currentPosts.forEach((post) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${post.image}" alt=""></td>
        <td>${post.title}</td>
        <td>${post.category}</td>
        <td>${post.content}</td>
        <td><span class="badge ${post.status.toLowerCase()}">${post.status}</span></td>
        <td>
          <select onchange="changeStatus(${post.id}, this.value)">
            <option ${post.status === "Public" ? "selected" : ""}>Public</option>
            <option ${post.status === "Private" ? "selected" : ""}>Private</option>
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
      renderPosts();
    }
  }
  
  function deletePost(id) {
    if (confirm("Bạn có chắc muốn xoá bài viết này không?")) {
      const index = posts.findIndex((p) => p.id === id);
      if (index !== -1) {
        posts.splice(index, 1);
  
        const totalPage = Math.ceil(posts.length / postPerPage);
        if (currentPage > totalPage) {
          currentPage = totalPage || 1;
        }
  
        renderPosts();
      }
    }
  }
  
  function addPost() {
    const title = prompt("Nhập tiêu đề:");
    const category = prompt("Nhập chủ đề:");
    const content = prompt("Nhập nội dung:");
    const image = prompt("Nhập link ảnh:");
  
    if (title && category && content && image) {
      const newPost = {
        id: Date.now(),
        image,
        title,
        category,
        content,
        status: "Public",
      };
      posts.unshift(newPost);
  
      currentPage = 1;
      renderPosts();
    } else {
      alert("Vui lòng nhập đầy đủ thông tin.");
    }
  }
  
  function editPost(id) {
    const post = posts.find((p) => p.id === id);
    if (post) {
      const newTitle = prompt("Sửa tiêu đề:", post.title);
      const newCategory = prompt("Sửa chủ đề:", post.category);
      const newContent = prompt("Sửa nội dung:", post.content);
  
      if (newTitle && newCategory && newContent) {
        post.title = newTitle;
        post.category = newCategory;
        post.content = newContent;
        renderPosts();
      }
    }
  }
  
  renderPosts();
  