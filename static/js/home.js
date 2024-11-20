document.addEventListener('scroll', function() {
    const features = document.getElementById('features');
    const featuresPosition = features.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (featuresPosition < screenPosition) {
        features.classList.add('visible');
    }
});

// Hàm xác thực đầu vào
function validateInput() {
    const textArea = document.querySelector('textarea[name="user_input"]');
    if (textArea && textArea.value.trim() === "") {
        alert("Please enter text!"); // Cập nhật thông báo
        return false;
    }
    return true;
}

// Tự động cuộn về đầu trang khi nhấn liên kết
const links = document.querySelectorAll('a');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        if (link.getAttribute('href') !== "#") {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Cuộn mượt mà
            });
            setTimeout(() => {
                window.location.href = link.getAttribute('href');
            }, 500); // Thời gian chờ trước khi chuyển trang
        }
    });
});

// Hiệu ứng cuộn cho hero section
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (window.scrollY > 100) {
        hero.classList.add('scrolled'); // Thêm lớp khi cuộn
    } else {
        hero.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
// Thêm JavaScript để làm cho phần "Tính năng" xuất hiện khi cuộn xuống
document.addEventListener('DOMContentLoaded', () => {
    const featuresSection = document.getElementById('features');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                featuresSection.classList.add('visible');
                observer.disconnect(); // Ngắt kết nối sau khi đã thấy
            }
        });
    });

    observer.observe(featuresSection); // Bắt đầu theo dõi phần "Tính năng"
});
// Giữ nguyên mã gốc của bạn
document.addEventListener('DOMContentLoaded', function() {
    // Mã gốc của bạn ở đây...
});

// Thêm hiệu ứng cuộn cho phần đánh giá (Testimonials)
document.addEventListener('scroll', function() {
    const testimonialsSection = document.getElementById('testimonials');
    const testimonialsPosition = testimonialsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.5;

    if (testimonialsPosition < screenPosition) {
        testimonialsSection.classList.add('visible');
    }
});

// Nút trở về đầu trang
const backToTopButton = document.createElement('button');
backToTopButton.innerText = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
