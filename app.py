from flask import Flask, render_template, request, redirect, url_for, session
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Chọn một secret key để bảo mật session

# Đọc dữ liệu và huấn luyện mô hình
df = pd.read_csv("https://raw.githubusercontent.com/amankharwal/Website-data/master/dataset.csv")

X = np.array(df["Text"])
Y = df["language"]

# Tạo vector hóa cho văn bản
cv = CountVectorizer()
X = cv.fit_transform(X)

# Chia tập dữ liệu thành tập huấn luyện và kiểm tra
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=43)

# Huấn luyện mô hình
model = MultinomialNB()
model.fit(X_train, Y_train)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Kiểm tra tên người dùng và mật khẩu (nên kiểm tra với cơ sở dữ liệu)
        if username == 'admin' and password == 'password':  # Ví dụ đơn giản
            session['username'] = username
            return redirect(url_for('home'))
        else:
            return 'Đăng nhập không thành công'
    return render_template('login.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # Xử lý tin nhắn (ví dụ: gửi email hoặc lưu vào cơ sở dữ liệu)
        return 'Cảm ơn bạn đã liên hệ!'
    return render_template('contact.html')

@app.route('/language-detection', methods=['GET', 'POST'])
def language_detection():
    language = None  # Khởi tạo biến ngôn ngữ
    if request.method == 'POST':
        user_input = request.form['user_input']  # Lấy văn bản từ người dùng
        test = cv.transform([user_input]).toarray()  # Vector hóa văn bản
        output = model.predict(test)  # Dự đoán ngôn ngữ
        language = output[0]  # Lưu kết quả dự đoán

    return render_template('language_detection.html', language=language)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

