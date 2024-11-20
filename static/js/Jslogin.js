document.addEventListener('DOMContentLoaded', function() {
    // Khai báo các biến cần thiết và thông tin tài khoản admin
    const loginForm = document.getElementById('loginForm');
    const createAccountForm = document.getElementById('createAccount');
    const forgotPasswordForm = document.getElementById('forgotPassword');
    const userDetailsSection = document.getElementById('userDetails');
    const userFullNameSpan = document.getElementById('userFullName');
    const userDOB = document.getElementById('userDOB');
    const userEmail = document.getElementById('userEmail');
    const userPhone = document.getElementById('userPhone');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginHistoryList = document.getElementById('loginHistoryList');
    const userAccountsList = document.getElementById('userAccountsList');
    const adminSection = document.getElementById('adminSection');

    const validUsername = 'admin';
    const validPassword = '1';

    const userDetails = {
        fullName: 'John Doe',
        dob: '01/01/1990',
        email: 'john.doe@example.com',
        phone: '123-456-7890'
    };

    let loginHistory = [];
    let loggedInAccounts = [];
    let users = [{ username: validUsername, password: validPassword }];

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            alert('Login successful!');
            loginForm.style.display = 'none';
            userDetailsSection.style.display = 'block';
            userFullNameSpan.textContent = userDetails.fullName;
            userDOB.textContent = userDetails.dob;
            userEmail.textContent = userDetails.email;
            userPhone.textContent = userDetails.phone;
        
            const loginTime = new Date().toLocaleString();
            loginHistory.push(`Logged in at ${loginTime}`);
            updateLoginHistory();
        
            if (!loggedInAccounts.includes(username)) {
                loggedInAccounts.push(username);
                updateUserAccounts();
            }
        
            // Kiểm tra nếu là admin
            if (username === validUsername) {
                adminSection.style.display = 'block';
            } else {
                adminSection.style.display = 'none'; // Ẩn adminSection nếu không phải admin
            }
        } else {
            alert('Invalid username or password');
        }
    });

    createAccountForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword === confirmPassword) {
            users.push({ username: newUsername, password: newPassword });
            alert('Tài khoản đã được tạo thành công!');
            hideAllForms();
            loginForm.style.display = 'block'; // Trở lại form đăng nhập
        } else {
            alert('Mật khẩu không khớp');
        }
    });

    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const recoverUsername = document.getElementById('recoverUsername').value;
        const recoverEmail = document.getElementById('recoverEmail').value;

        const user = users.find(user => user.username === recoverUsername);
        if (user && recoverEmail === userDetails.email) {
            alert('Hướng dẫn khôi phục mật khẩu đã được gửi tới email của bạn.');
            hideAllForms();
            loginForm.style.display = 'block'; // Trở lại form đăng nhập
        } else {
            alert('Tên người dùng hoặc email không hợp lệ');
        }
    });

    logoutBtn.addEventListener('click', function() {
        alert('Đăng xuất thành công!');
        loginForm.style.display = 'block';
        userDetailsSection.style.display = 'none';
        adminSection.style.display = 'none'; // Ẩn adminSection khi logout
        const logoutTime = new Date().toLocaleString();
        loginHistory.push(`Đăng xuất vào lúc ${logoutTime}`);
        updateLoginHistory();
    });

    document.getElementById('createAccountLink').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllForms();
        createAccountForm.style.display = 'block'; // Hiển thị form tạo tài khoản
    });

    document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllForms();
        forgotPasswordForm.style.display = 'block'; // Hiển thị form quên mật khẩu
    });

    document.getElementById('backToLoginForgot').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllForms();
        loginForm.style.display = 'block'; // Quay lại form đăng nhập
    });

    document.getElementById('backToLoginCreate').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllForms();
        loginForm.style.display = 'block'; // Quay lại form đăng nhập
    });

    document.getElementById('deleteAccountBtn').addEventListener('click', function() {
        const confirmDelete = confirm('Bạn có chắc chắn muốn xóa tài khoản của mình không?');
        if (confirmDelete) {
            const usernameToDelete = loggedInAccounts[0];
    
            // Kiểm tra xem tài khoản cần xóa có phải là admin hay không
            if (usernameToDelete === validUsername) {
                alert('Không thể xóa tài khoản admin.');
                return; // Ngăn không cho tiếp tục thực hiện khi là tài khoản admin
            }
    
            // Tìm và xóa tài khoản từ danh sách users và loggedInAccounts
            const userToDeleteIndex = users.findIndex(user => user.username === usernameToDelete);
            if (userToDeleteIndex !== -1) {
                users.splice(userToDeleteIndex, 1); // Xóa khỏi users
            }
    
            const loggedInIndex = loggedInAccounts.indexOf(usernameToDelete);
            if (loggedInIndex !== -1) {
                loggedInAccounts.splice(loggedInIndex, 1); // Xóa khỏi loggedInAccounts
            }
    
            alert('Tài khoản đã được xóa thành công');
    
            // Hiển thị lại form đăng nhập và ẩn các phần tử khác
            loginForm.style.display = 'block';
            userDetailsSection.style.display = 'none';
            adminSection.style.display = 'none';
    
            // Sau khi xóa tài khoản, hãy cập nhật lại danh sách người dùng và hiển thị
            updateUserAccounts();
        }
    });

    document.getElementById('lockAccountBtn').addEventListener('click', function() {
        const confirmLock = confirm('Bạn có chắc chắn muốn khóa tài khoản của mình không?');
        if (confirmLock) {
            const usernameToLock = loggedInAccounts[0];
            if (usernameToLock === validUsername) {
                alert('Không thể khóa tài khoản admin.');
            } else {
                alert('Tài khoản đã được khóa thành công');
                // Xóa dữ liệu phiên của người dùng (nếu cần)
                // ...
                // Hiển thị lại form đăng nhập và ẩn các phần tử khác
                loginForm.style.display = 'block';
                userDetailsSection.style.display = 'none';
                adminSection.style.display = 'none'; // Ẩn adminSection khi logout
            }
        }
    });

    function hideAllForms() {
        loginForm.style.display = 'none';
        createAccountForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
    }

    function updateLoginHistory() {
        loginHistoryList.innerHTML = '';
        loginHistory.forEach(entry => {
            const listItem = document.createElement('div');
            listItem.textContent = entry;
            loginHistoryList.appendChild(listItem);
        });
    }

    function updateUserAccounts() {
        userAccountsList.innerHTML = '';
        loggedInAccounts.forEach(account => {
            const listItem = document.createElement('div');
            listItem.className = 'userAccountItem';

            const accountName = document.createElement('span');
            accountName.textContent = account;
            listItem.appendChild(accountName);

            // Chỉ hiển thị nút block và delete nếu không phải là tài khoản admin
            if (account !== validUsername) {
                const listItem = document.createElement('div');
                listItem.className = 'userAccountItem';
            
                // Tạo phần tử cho tên tài khoản
                const accountName = document.createElement('span');
                accountName.textContent = account;
            
                // Tạo phần tử cho các nút
                const actionsDiv = document.createElement('span');
                actionsDiv.className = 'actions';
            
                const blockBtn = document.createElement('button');
                blockBtn.textContent = 'Block';
                blockBtn.className = 'blockBtn';
                blockBtn.addEventListener('click', function() {
                    alert(`Tài khoản ${account} đã bị chặn`);
                    loggedInAccounts = loggedInAccounts.filter(acc => acc !== account);
                    updateUserAccounts();
                });
            
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'deleteBtn';
                deleteBtn.addEventListener('click', function() {
                    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa tài khoản ${account} không?`);
                    if (confirmDelete) {
                        users = users.filter(user => user.username !== account);
                        loggedInAccounts = loggedInAccounts.filter(acc => acc !== account);
                        alert(`Tài khoản ${account} đã được xóa`);
                        updateUserAccounts();
                    }
                });
            
                // Thêm nút vào actionsDiv
                actionsDiv.appendChild(blockBtn);
                actionsDiv.appendChild(deleteBtn);
            
                // Thêm tên tài khoản và actionsDiv vào listItem
                listItem.appendChild(accountName);
                listItem.appendChild(document.createTextNode(' (')); // Thêm ký tự '('
                listItem.appendChild(actionsDiv);
                listItem.appendChild(document.createTextNode(')')); // Thêm ký tự ')'
            
                userAccountsList.appendChild(listItem);
            }
        });
    }
});
