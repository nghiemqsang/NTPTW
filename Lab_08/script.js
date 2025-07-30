document.addEventListener('DOMContentLoaded', function() {

    const tableBody = document.getElementById('transaction-table-body');
    const modal = document.getElementById('add-transaction-modal');
    const showModalBtn = document.getElementById('show-modal-btn');
    const closeBtn = document.querySelector('.modal .close-btn');
    const closeModalBtn = document.querySelector('.modal .close-modal-btn');
    const addTransactionForm = document.getElementById('add-transaction-form');

    const customerInput = document.getElementById('customer-name');
    const employeeInput = document.getElementById('employee-name');
    const amountInput = document.getElementById('amount');

    const customerError = document.getElementById('customer-error');
    const employeeError = document.getElementById('employee-error');
    const amountError = document.getElementById('amount-error');
    
    if (!tableBody || !modal || !showModalBtn || !addTransactionForm) {
        console.error("Một hoặc nhiều phần tử DOM cần thiết không được tìm thấy!");
        return;
    }

    function renderTable(data) {
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center">Không có giao dịch nào.</td></tr>';
            return;
        }

        const rowsHtml = data.map(tx => `
            <tr>
                <td>×</td>
                <td class="action-icons">
                    <span class="action-icon bg-primary" title="Xem"><i class="bi bi-eye-fill"></i></span>
                    <span class="action-icon bg-warning" title="Sửa"><i class="bi bi-pencil-fill"></i></span>
                    <span class="action-icon bg-danger" title="Xóa"><i class="bi bi-trash-fill"></i></span>
                </td>
                <td>${tx.id}</td>
                <td>${tx.customer}</td>
                <td>${tx.employee}</td>
                <td>${new Intl.NumberFormat('vi-VN').format(tx.amount)} đ</td>
                <td>${tx.date}</td>
            </tr>
        `).join('');

        tableBody.innerHTML = rowsHtml;
    }

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        addTransactionForm.reset();
        customerError.textContent = '';
        employeeError.textContent = '';
        amountError.textContent = '';
    }

    function handleAddTransaction(event) {
        event.preventDefault();
        
        let isValid = true;

        customerError.textContent = '';
        employeeError.textContent = '';
        amountError.textContent = '';

        if (customerInput.value.trim() === '') {
            customerError.textContent = 'Khách hàng không được bỏ trống.';
            isValid = false;
        } else if (customerInput.value.trim().length > 30) {
            customerError.textContent = 'Tên khách hàng không quá 30 ký tự.';
            isValid = false;
        }

        if (employeeInput.value.trim() === '') {
            employeeError.textContent = 'Nhân viên không được bỏ trống.';
            isValid = false;
        } else if (employeeInput.value.trim().length > 30) {
            employeeError.textContent = 'Tên nhân viên không quá 30 ký tự.';
            isValid = false;
        }

        if (amountInput.value.trim() === '') {
            amountError.textContent = 'Số tiền không được bỏ trống.';
            isValid = false;
        } else if (parseInt(amountInput.value) <= 0) {
            amountError.textContent = 'Số tiền phải là một số dương.';
            isValid = false;
        }

        if (isValid) {
            const newTransaction = {
                id: Date.now(),
                customer: customerInput.value.trim(),
                employee: employeeInput.value.trim(),
                amount: parseInt(amountInput.value, 10),
                date: new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })
            };
            
            transactions.unshift(newTransaction);
            renderTable(transactions);
            closeModal();
        }
    }

    showModalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
    addTransactionForm.addEventListener('submit', handleAddTransaction);

    renderTable(transactions);
});
