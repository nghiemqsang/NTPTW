// Chờ cho toàn bộ tài liệu HTML được tải xong trước khi chạy mã JS
document.addEventListener('DOMContentLoaded', function () {
    // --- 1. LẤY CÁC THÀNH PHẦN DOM ---
    const studentForm = document.querySelector('.card-body form');
    const submitButton = studentForm.querySelector('button[type="submit"]');
    const studentList = document.getElementById('student-list');

    // Lấy các ô nhập liệu
    const maSVInput = document.getElementById('maSV');
    const hoTenInput = document.getElementById('hoTen');
    const emailInput = document.getElementById('email');
    const ngaySinhInput = document.getElementById('ngaySinh');
    const ghiChuInput = document.getElementById('ghiChu');

    // --- 2. KHỞI TẠO DỮ LIỆU BAN ĐẦU VÀ BIẾN TRẠNG THÁI ---
    let students = [
        { maSV: '20210001', hoTen: 'Nguyễn Văn An', email: 'an.nv@gmail.com', ngaySinh: '2003-05-15', gioiTinh: 'Nam', ghiChu: '' },
        { maSV: '20210002', hoTen: 'Nghiêm Quang Sáng', email: 'sang.nq@gmail.com', ngaySinh: '2002-12-31', gioiTinh: 'Nam', ghiChu: '' },
        { maSV: '20210003', hoTen: 'Lê Thị Cẩm', email: 'cam.lt@gmail.com', ngaySinh: '2003-01-01', gioiTinh: 'Nữ', ghiChu: '' }
    ];

    let editingIndex = null; // Biến để theo dõi sinh viên đang được sửa. `null` nghĩa là đang ở chế độ thêm mới.

    // --- 3. CÁC HÀM XỬ LÝ ---

    /**
     * Hàm hiển thị lại toàn bộ danh sách sinh viên ra bảng
     */
    function renderStudents() {
        studentList.innerHTML = ''; // Xóa sạch danh sách hiện tại
        students.forEach((student, index) => {
            const row = document.createElement('tr');

            // Định dạng lại ngày sinh từ YYYY-MM-DD sang DD/MM/YYYY để hiển thị
            const displayDate = student.ngaySinh ? new Date(student.ngaySinh).toLocaleDateString('vi-VN') : 'Chưa có';

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.maSV}</td>
                <td>${student.hoTen}</td>
                <td>${student.email}</td>
                <td>${student.gioiTinh}</td>
                <td>${displayDate}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-edit" data-index="${index}">Sửa</button>
                    <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">Xoá</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }

    /**
     * Hàm kiểm tra dữ liệu đầu vào
     * @returns {boolean} - true nếu hợp lệ, false nếu không hợp lệ
     */
    function validateInput() {
        // Kiểm tra các trường bắt buộc không được để trống
        if (!maSVInput.value.trim() || !hoTenInput.value.trim() || !emailInput.value.trim()) {
            alert('⚠️ Vui lòng điền đầy đủ Mã SV, Họ tên và Email!');
            return false;
        }
        // Kiểm tra định dạng email đơn giản
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            alert('⚠️ Định dạng Email không hợp lệ!');
            return false;
        }
        return true;
    }

    /**
     * Hàm xử lý khi form được submit (Thêm mới hoặc Cập nhật)
     */
    function handleFormSubmit(event) {
        event.preventDefault(); // Ngăn trình duyệt tải lại trang

        if (!validateInput()) {
            return; // Dừng lại nếu dữ liệu không hợp lệ
        }

        const gioiTinhValue = document.querySelector('input[name="gioiTinh"]:checked')?.value || 'Không xác định';

        const studentData = {
            maSV: maSVInput.value.trim(),
            hoTen: hoTenInput.value.trim(),
            email: emailInput.value.trim(),
            ngaySinh: ngaySinhInput.value,
            gioiTinh: gioiTinhValue,
            ghiChu: ghiChuInput.value.trim()
        };

        if (editingIndex === null) {
            // --- CHẾ ĐỘ THÊM MỚI ---
            students.push(studentData);
            alert('✅ Thêm sinh viên thành công!');
        } else {
            // --- CHẾ ĐỘ CẬP NHẬT ---
            students[editingIndex] = studentData;
            alert('🔄 Cập nhật thông tin thành công!');
            
            // Trở lại chế độ thêm mới
            editingIndex = null;
            submitButton.textContent = 'Thêm sinh viên';
            submitButton.classList.remove('btn-info');
            submitButton.classList.add('btn-success');
            document.querySelector('.card-header.bg-primary h4').textContent = 'Thêm Sinh Viên Mới';
        }

        renderStudents(); // Cập nhật lại bảng
        studentForm.reset(); // Xóa các dữ liệu đã nhập trên form
    }

    /**
     * Hàm xử lý khi nhấn nút Sửa hoặc Xóa trên bảng
     */
    function handleTableClick(event) {
        const target = event.target;
        const index = target.dataset.index;

        if (target.classList.contains('btn-delete')) {
            // --- XỬ LÝ XÓA ---
            if (confirm(`Bạn có chắc chắn muốn xóa sinh viên "${students[index].hoTen}" không?`)) {
                students.splice(index, 1); // Xóa 1 phần tử tại vị trí `index`
                renderStudents();
                alert('🗑️ Xóa sinh viên thành công!');
            }
        }

        if (target.classList.contains('btn-edit')) {
            // --- XỬ LÝ SỬA ---
            const student = students[index];
            maSVInput.value = student.maSV;
            hoTenInput.value = student.hoTen;
            emailInput.value = student.email;
            ngaySinhInput.value = student.ngaySinh;
            ghiChuInput.value = student.ghiChu;
            
            // Chọn đúng radio button giới tính
            const gioiTinhRadio = document.querySelector(`input[name="gioiTinh"][value="${student.gioiTinh}"]`);
            if(gioiTinhRadio) {
                gioiTinhRadio.checked = true;
            }

            // Chuyển sang chế độ sửa
            editingIndex = index;
            submitButton.textContent = 'Cập nhật';
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-info');
            document.querySelector('.card-header.bg-primary h4').textContent = 'Cập Nhật Thông Tin';
            maSVInput.focus(); // Di chuyển con trỏ vào ô đầu tiên
        }
    }

    // --- 4. GẮN SỰ KIỆN ---
    studentForm.addEventListener('submit', handleFormSubmit);
    studentList.addEventListener('click', handleTableClick);

    // --- 5. HIỂN THỊ DỮ LIỆU BAN ĐẦU ---
    renderStudents();
});