// Danh sách bài viết mẫu
const articles = [
  {
    image: "./assets/images/Image1.png",
    title: "A Productive Day at Work",
    date: "2025-02-25",
    content: "Today was a really productive day at work. I managed to finish a report ahead of schedule and received positive feedback from my manager.",
    category: "Work & Career",
    comments: [
      { avatar: "../assets/images/Avatar1.png", text: "Very good!", likes: 15, replies: 6 },
      { avatar: "../assets/images/Avatar (1).png", text: "Hello Rikkei!", likes: 10, replies: 4 },
    ],
  },
  {
    image: "./assets/images/image2.png",
    title: "My First Job Interview Experience",
    date: "2025-02-24",
    content: "I had my first job interview today! I was nervous at first, but as the conversation went on, I felt more confident.",
    category: "Work & Career",
    comments: [
      { avatar: "../assets/images/Avatar1.png", text: "Very good!", likes: 15, replies: 6 },
      { avatar: "../assets/images/Avatar (1).png", text: "Hello Rikkei!", likes: 10, replies: 4 },
    ],
  },
  {
    image: "./assets/images/Image3.png",
    title: "Overthinking Everything",
    date: "2025-02-23",
    content: "Lately, I have been overthinking everything, from small decisions to bigger life choices. I know I should trust myself.",
    category: "Personal Thoughts",
    comments: [
      { avatar: "../assets/images/Avatar1.png", text: "Very good!", likes: 15, replies: 6 },
      { avatar: "../assets/images/Avatar (1).png", text: "Hello Rikkei!", likes: 10, replies: 4 },
    ],
  },
  {
    image: "./assets/images/Image4.png",
    title: "How collaboration makes us better designers",
    date: "2025-02-20",
    content: "Collaboration can make our teams stronger, and our individual designs better.",
    category: "Work & Career",
    comments: [
      { avatar: "../assets/images/Avatar1.png", text: "Very good!", likes: 15, replies: 6 },
      { avatar: "../assets/images/Avatar (1).png", text: "Hello Rikkei!", likes: 10, replies: 4 },
    ],
  },
  {
    image: "./assets/images/Image5.png",
    title: "Our top 10 Javascript frameworks to use",
    date: "2025-02-15",
    content: "JavaScript frameworks make development easy with extensive features and functionalities.",
    category: "Work & Career",
    comments: [
      { avatar: "../assets/images/Avatar1.png", text: "Very good!", likes: 15, replies: 6 },
      { avatar: "../assets/images/Avatar (1).png", text: "Hello Rikkei!", likes: 10, replies: 4 },
    ],
  },
  {
    image: "./assets/images/Image6.png",
    title: "Podcast: Creating a better CX Community",
    date: "2025-02-05",
    content: "Starting a community doesn’t need to be complicated, but how do you get started?",
    category: "Personal Thoughts",
    comments: [
      { avatar: "../assets/images/Avatar1.png", text: "Very good!", likes: 15, replies: 6 },
      { avatar: "../assets/images/Avatar (1).png", text: "Hello Rikkei!", likes: 10, replies: 4 },
    ],
  },
];

const renderArticles = (filteredArticles = articles) => {
  const blogContainer = document.querySelector(".blog-container");
  blogContainer.innerHTML = ""; // Xóa nội dung cũ

  if (filteredArticles.length === 0) {
    blogContainer.innerHTML = `<p>Không có bài viết nào được tìm thấy.</p>`;
    return;
  }

  filteredArticles.forEach((article) => {
    const articleCard = document.createElement("article");
    articleCard.classList.add("blog-card");

    articleCard.innerHTML = `
      <img src="${article.image}" alt="${article.title}" />
      <div class="content">
        <span class="date">Date: ${article.date}</span>
        <h2>${article.title}</h2>
        <p>${article.content}</p>
      </div>
    `;

    blogContainer.appendChild(articleCard);
  });

  // Gắn sự kiện click để xem chi tiết bài viết
  addArticleClickEvents(filteredArticles);
};

// Hàm gắn sự kiện click vào từng bài viết
const addArticleClickEvents = (articles) => {
  document.querySelectorAll(".blog-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      const selectedArticle = articles[index]; // Lấy dữ liệu bài viết tương ứng
      localStorage.setItem("selectedArticle", JSON.stringify(selectedArticle)); // Lưu dữ liệu vào localStorage
      window.location.href = "./pages/article-manager1.html"; // Điều h

      // Tạo danh sách bình luận
      const commentsHTML = selectedArticle.comments.length > 0
        ? selectedArticle.comments.map(
            (comment) => `
            <div class="comment">
              <p><img src="${comment.avatar}" alt="Avatar" /> ${comment.text}</p>
              <p class="stats">Likes: ${comment.likes} 💓 Replies: ${comment.replies} 🗯</p>
            </div>
          `
          ).join("")
        : "<p>Không có bình luận nào.</p>";

      // Hiển thị popup với SweetAlert2
      Swal.fire({
        title: selectedArticle.title,
        html: `
          <p><strong>${selectedArticle.date}</strong></p>
          <img src="${selectedArticle.image}" alt="${selectedArticle.title}" style="width: 100%; margin-bottom: 20px;">
          <p>${selectedArticle.content}</p>
          <h4>Comments:</h4>
          <div class="comments-section">
            ${commentsHTML}
          </div>
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Đóng",
      });
    });
  });
};

// Hàm lọc bài viết theo chủ đề
const filterArticlesByCategory = (category) => {
  if (category === "All blog posts") {
    renderArticles(); // Hiển thị tất cả bài viết
  } else {
    const filteredArticles = articles.filter((article) => article.category === category);
    renderArticles(filteredArticles);
  }
};

// Gắn sự kiện click vào danh sách chủ đề
const addCategoryClickEvents = () => {
  const categories = document.querySelectorAll(".categories ul li");
  categories.forEach((categoryElement) => {
    categoryElement.addEventListener("click", () => {
      const category = categoryElement.textContent.trim();
      filterArticlesByCategory(category); // Lọc bài viết theo danh mục
    });
  });
};

// Gắn sự kiện click vào nút "ADD NEW ARTICLE"
document.getElementById("add-article").addEventListener("click", () => {
  window.location.href = "./pages/article_manager.html"; // Điều hướng sang trang thêm bài viết
});

// Khởi chạy khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  renderArticles(); // Hiển thị tất cả bài viết mặc định
  addCategoryClickEvents(); // Gắn sự kiện click vào danh mục chủ đề
});