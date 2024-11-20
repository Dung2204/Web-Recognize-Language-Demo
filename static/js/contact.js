document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn submit mặc định

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let feedback = document.getElementById("formFeedback");

    if (name === "" || email === "" || message === "") {
        feedback.style.display = "block";
        feedback.style.color = "red";
        feedback.innerHTML = "Vui lòng điền đầy đủ thông tin.";
        return;
    }

    feedback.style.display = "block";
    feedback.style.color = "green";
    feedback.innerHTML = "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.";

    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    setTimeout(() => {
        feedback.style.display = "none";
    }, 5000);
});

// Back to top button functionality
const backToTopButton = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
