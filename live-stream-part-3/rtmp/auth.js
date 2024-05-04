const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 8080;

// Kullanıcı bilgileri (gerçek uygulamada veritabanından alınabilir)
const users = [
    { username: 'admin', password: '123456' }
];

// Oturum middleware'ını ekleyin
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Kullanıcı giriş formu post isteği
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Kullanıcı doğrulama
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Oturum değişkenini ayarlayın
        req.session.isLoggedIn = true;
        // Başarılı giriş, livestream.html dosyasını gönder
        res.sendFile(path.join(__dirname, '/livestreaming.html'));
    } else {
        res.send('Kullanıcı adı veya şifre yanlış!');
    }
});

// livestream.html dosyasına erişimi kontrol et
app.get('/livestream.html', (req, res, next) => {
    // Kullanıcı girişi yapılmış mı kontrol et
    const isUserAuthenticated = req.session.isLoggedIn; // Oturum değişkenini kontrol ediyoruz

    if (isUserAuthenticated) {
        // Kullanıcı girişi yapılmışsa, dosyayı gönder
        res.sendFile(path.join(__dirname, '/livestreaming.html'));
    } else {
        // Kullanıcı girişi yapılmamışsa, giriş sayfasına yönlendir
        res.redirect('/');
    }
});


app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});
