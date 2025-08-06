// src/components/StudentTable.jsx

function StudentTable({ danhSachSV }) { // Nhận props từ cha
  return (
    <table>
      <thead>
        <tr>
          <th>Tên</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {danhSachSV.map((sv, index) => (
          <tr key={index}>
            <td>{sv.ten}</td>
            <td>{sv.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;