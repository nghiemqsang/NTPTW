import { useState, useEffect } from 'react'; // 1. Import thêm useEffect
import './App.css';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

// Đặt tên cho key để lưu trong Local Storage, tránh gõ nhầm
const LOCAL_STORAGE_KEY = 'react-book-manager-books';

function App() {
  // 2. THAY ĐỔI CÁCH KHỞI TẠO STATE `books`
  // Chúng ta truyền một hàm vào useState. Hàm này sẽ chỉ chạy một lần duy nhất
  // khi component được render lần đầu tiên.
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
      // Nếu có dữ liệu trong local storage, parse nó từ JSON string về lại array
      if (savedBooks) {
        return JSON.parse(savedBooks);
      } else {
        // Nếu không có, trả về mảng mặc định
        return [
          { id: 1, title: 'Nhà Giả Kim', author: 'Paulo Coelho' },
          { id: 2, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie' },
          { id: 3, title: 'Đi tìm lẽ sống', author: 'Viktor Frankl' }
        ];
      }
    } catch (error) {
      console.error("Lỗi khi tải sách từ Local Storage", error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  });

  const [currentBook, setCurrentBook] = useState(null);

  // 3. THÊM `useEffect` ĐỂ LƯU DỮ LIỆU
  // Hook này sẽ tự động chạy lại mỗi khi state `books` thay đổi.
  useEffect(() => {
    // Lưu state `books` vào local storage.
    // Vì local storage chỉ lưu được string, ta cần chuyển mảng books thành JSON string.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]); // Mảng phụ thuộc, useEffect sẽ chạy khi `books` thay đổi


  const addBook = (book) => {
    const newBook = { id: Date.now(), ...book };
    setBooks([...books, newBook]);
  };

  const selectBookToEdit = (book) => {
    setCurrentBook(book);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => (book.id === id ? { ...book, ...updatedBook } : book)));
    setCurrentBook(null);
  };

  const deleteBook = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Quản lý Sách</h1>
      </header>
      <main>
        <BookForm
          onAddBook={addBook}
          bookToEdit={currentBook}
          onUpdateBook={updateBook}
        />
        <BookList
          books={books}
          onEdit={selectBookToEdit}
          onDelete={deleteBook}
        />
      </main>
    </div>
  );
}

export default App;