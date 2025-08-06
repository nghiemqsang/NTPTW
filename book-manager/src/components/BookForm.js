import React, { useState, useEffect } from 'react';
import './BookForm.css';

// 1. Nhận thêm 2 props mới: bookToEdit và onUpdateBook
const BookForm = ({ onAddBook, bookToEdit, onUpdateBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 2. Sử dụng useEffect để theo dõi sự thay đổi của `bookToEdit`
  // Khi `bookToEdit` có giá trị, form sẽ chuyển sang chế độ sửa
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setIsEditing(true);
    } else {
      // Nếu không có sách nào được chọn để sửa, reset form
      setTitle('');
      setAuthor('');
      setIsEditing(false);
    }
  }, [bookToEdit]); // Hook này sẽ chạy lại mỗi khi `bookToEdit` thay đổi

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert('Vui lòng nhập đầy đủ tiêu đề và tác giả!');
      return;
    }

    if (isEditing) {
      // 3. Nếu đang ở chế độ sửa, gọi hàm onUpdateBook
      onUpdateBook(bookToEdit.id, { title, author });
    } else {
      // Nếu không, gọi hàm onAddBook như cũ
      onAddBook({ title, author });
    }

    // Reset form sau khi submit
    setTitle('');
    setAuthor('');
    setIsEditing(false);
  };

  return (
    <div className="book-form">
      {/* 4. Thay đổi tiêu đề và nút bấm tùy theo chế độ */}
      <h2>{isEditing ? 'Chỉnh sửa sách' : 'Thêm sách mới'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề sách"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tên tác giả"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">{isEditing ? 'Cập nhật' : 'Thêm sách'}</button>
      </form>
    </div>
  );
};

export default BookForm;