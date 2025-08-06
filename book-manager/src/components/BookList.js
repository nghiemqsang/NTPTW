import './BookList.css';

// Component nhận vào 3 props: books, onEdit, onDelete
function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="book-list">
      <h2>Danh sách Sách</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {/* Phần này chứa tiêu đề và tác giả */}
            <div className="book-details">
              <div className="book-title">{book.title}</div>
              <div className="book-author">Tác giả: {book.author}</div>
            </div>

            {/* Phần này chứa 2 nút Sửa và Xóa */}
            <div className="book-actions">
              <button onClick={() => onEdit(book)} className="edit-btn">Sửa</button>
              <button onClick={() => onDelete(book.id)} className="delete-btn">Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;