// src/App.jsx
import { useState } from 'react';
import Header from './components/Header';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm'; // Import component Form
import './App.css';

function App() {
  // State quản lý danh sách sinh viên
  const [danhSach, setDanhSach] = useState([
    { ten: "Nguyễn Văn A", email: "a@gmail.com" },
    { ten: "Trần Thị B", email: "b@gmail.com" },
  ]);

  // State quản lý trạng thái ẩn/hiện của form
  const [isShowForm, setIsShowForm] = useState(false);

  // State quản lý dữ liệu của form
  const [formData, setFormData] = useState({ ten: '', email: '' });

  // Hàm xử lý khi người dùng gõ vào input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt reload lại trang
    // Thêm sinh viên mới vào danh sách
    setDanhSach([...danhSach, formData]);
    // Reset form về rỗng
    setFormData({ ten: '', email: '' });
    // Ẩn form đi sau khi thêm thành công
    setIsShowForm(false);
  };

  return (
    <div className="App">
      <Header />
      <hr />

      {/* Nút để bật/tắt form */}
      <button onClick={() => setIsShowForm(!isShowForm)}>
        {isShowForm ? 'Đóng Form' : 'Thêm Sinh Viên'}
      </button>

      {/* Hiển thị form có điều kiện */}
      {isShowForm && (
        <StudentForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}

      <br />

      <StudentTable danhSachSV={danhSach} />
    </div>
  );
}

export default App;
