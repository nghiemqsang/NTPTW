// src/components/StudentForm.jsx

function StudentForm({ formData, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên:</label>
        <input
          type="text"
          name="ten"
          value={formData.ten}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Thêm</button>
    </form>
  );
}

export default StudentForm;