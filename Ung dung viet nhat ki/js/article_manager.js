// Dữ liệu mẫu: Danh sách bài viết
let articles = [];

// Hàm thêm bài viết mới
document.querySelector(".add-btn").addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("categories").value.trim();
  const moodSelect = document.getElementById("mood");
  const moods = Array.from(moodSelect.selectedOptions).map(option => option.value);
  const content = document.getElementById("content").value.trim();
  const statusElement = document.querySelector('input[name="status"]:checked');

  // Kiểm tra nếu thiếu thông tin
  if (!title || !category || moods.length === 0 || !content || !statusElement) {
    alert("Vui lòng điền đầy đủ thông tin bài viết!");
    return;
  }

  const status = statusElement.value;

  // Tạo bài viết mới
  const newArticle = {
    id: articles.length + 1,
    title,
    category,
    moods, // Mảng mood
    content,
    status,
  };

  // Thêm bài viết vào danh sách
  articles.push(newArticle);

  alert("Bài viết đã được thêm thành công!");

  // Reset form
  document.getElementById("title").value = "";
  document.getElementById("categories").value = "";
  moodSelect.value = ""; // Bỏ chọn mood
  document.getElementById("content").value = "";
  statusElement.checked = false; // Bỏ chọn radio

  console.log(articles); // Kiểm tra danh sách bài viết
});
