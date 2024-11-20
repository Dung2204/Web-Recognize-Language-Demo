// Hiệu ứng cuộn cho phần "Features" và "Testimonials"
document.addEventListener('scroll', function() {
    const features = document.getElementById('features');
    const testimonials = document.getElementById('testimonials');
    const screenPosition = window.innerHeight / 1.5;

    [features, testimonials].forEach(section => {
        if (section && section.getBoundingClientRect().top < screenPosition) {
            section.classList.add('visible');
        }
    });
});

// Xác thực đầu vào
function validateInput() {
    const textArea = document.querySelector('textarea[name="user_input"]');
    if (textArea && textArea.value.trim() === "") {
        alert("Please enter text!");
        return false;
    }
    return true;
}

// Nút trở về đầu trang
const backToTopButton = document.createElement('button');
backToTopButton.innerText = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hiệu ứng mượt mà cho liên kết cuộn
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
        if (this.getAttribute('href') !== "#") {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => window.location.href = this.getAttribute('href'), 500);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const languageAlbum = document.getElementById('language-album');
    const historyBody = document.getElementById('history-body');

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                languageAlbum.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(languageAlbum);

    // Hiển thị lịch sử nhận diện ngôn ngữ
    const history = JSON.parse(localStorage.getItem('languageHistory')) || [];
    history.forEach((lang, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${lang}</td>`;
        historyBody.appendChild(row);
    });
});
// recognize.js
// // recognize.js
// let recognitionCount = 0; // Đếm số lần nhận diện
// let historyList = []; // Lưu lịch sử nhận diện

// function validateInput() {
//     const userInput = document.querySelector('textarea[name="user_input"]').value;
//     if (userInput.trim() === "") {
//         alert("Vui lòng nhập văn bản trước khi nhận diện.");
//         return false;
//     }
//     // Nếu đầu vào hợp lệ, gọi hàm để nhận diện ngôn ngữ
//     detectLanguage(userInput);
//     return false; // Ngăn không cho form gửi
// }

// function detectLanguage(input) {
//     // Giả sử chúng ta có một hàm nhận diện ngôn ngữ (có thể là một API)
//     const detectedLanguage = fakeLanguageDetection(input); // Thay thế bằng hàm thực tế

//     // Cập nhật kết quả nhận diện
//     document.querySelector("h2").innerText = `Ngôn ngữ đã nhận diện: ${detectedLanguage}`;

//     // Tăng đếm nhận diện
//     recognitionCount++;
//     document.getElementById("count").innerText = recognitionCount; // Cập nhật số lần nhận diện thành công

//     // Cập nhật lịch sử nhận diện
//     updateHistory(detectedLanguage);
// }

// function updateHistory(language) {
//     historyList.push(language); // Thêm ngôn ngữ vào lịch sử
//     const historyListElement = document.getElementById("history-list");
    
//     // Tạo phần tử li cho ngôn ngữ mới nhận diện
//     const newEntry = document.createElement("li");
//     newEntry.innerText = language;
//     historyListElement.appendChild(newEntry);
// }

// function fakeLanguageDetection(input) {
//     // Hàm giả định trả về ngôn ngữ (chỉ để minh họa)
//     // Thay thế bằng mã nhận diện ngôn ngữ thực tế
//     return input.includes("hello") ? "English" : "Unknown";
// }

// // Gọi hàm này để khởi tạo nếu cần
// function initialize() {
//     document.getElementById("count").innerText = recognitionCount; // Đặt giá trị đếm khi khởi động
// }

// window.onload = initialize; // Khởi tạo khi trang được tải
