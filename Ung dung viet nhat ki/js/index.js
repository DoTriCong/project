
// Hàm hiển thị danh sách bài viết
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
      filterArticlesByCategory(category);
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
