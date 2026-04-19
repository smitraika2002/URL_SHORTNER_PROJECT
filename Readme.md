# 🔗 URL Shortener API

A REST API to shorten URLs with secure user authentication.
Built for scalability using modern backend tools.

---

## 🚀 Features

* JWT Authentication (Signup/Login)
* Shorten long URLs
* Redirect via short links
* View only your URLs
* Update & delete URLs

---

## 🛠️ Tech Stack

* Node.js, Express.js
* PostgreSQL
* Drizzle ORM
* JWT Auth
* Docker, Postman

---

## 📡 API Routes

### Public

* `POST /signup`
* `POST /login`
* `GET /:shortCode`

### Protected

* `POST /shorten`
* `GET /urls`
* `PUT /urls/:id`
* `DELETE /urls/:id`

---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/url-shortener-api.git
cd url-shortener-api
npm install
docker-compose up -d
npm run dev
```

---

## 👨‍💻 Author

**Smit Magar**
