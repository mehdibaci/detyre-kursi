# FinTrack — Aplikacion Web për Menaxhimin e Financave Personale

Aplikacion **MERN Stack** (MongoDB, Express, React, Node.js) që i mundëson përdoruesit të regjistrojë të ardhurat dhe shpenzimet, t'i klasifikojë sipas kategorive, dhe të shohë në kohë reale një përmbledhje të gjendjes së tij financiare.

Projekti është ndërtuar mbi arkitekturën e seminarit (MERN-TaskApp): autentikim me JWT, middleware për mbrojtjen e rrugëve, RTK Query për menaxhimin e gjendjes, dhe operacione CRUD. Mbi këtë bazë janë shtuar: një model të dhënash më i pasur, përmbledhje financiare, filtrim, dhe një grafik vizual.

## Veçoritë

- **Autentikim**: regjistrim, hyrje (login), dhe dalje (logout) me token JWT
- **CRUD i plotë**: shto, shfaq, modifiko dhe fshi transaksione
- **Tipi i transaksionit**: të ardhura (income) ose shpenzim (expense)
- **Kategoritë**: Ushqim, Qira, Transport, Argëtim, Shëndetësi, Fatura, Rrogë, Të tjera
- **Panel përmbledhës (Dashboard)**: të ardhura totale, shpenzime totale, dhe bilanci
- **Grafik byrek (donut)**: shpërndarja e shpenzimeve sipas kategorive (SVG i pastër, pa libra shtesë)
- **Filtrim**: sipas tipit dhe sipas kategorisë
- **Ngjyrosje**: të ardhurat jeshile, shpenzimet të kuqe, për lexueshmëri më të mirë

## Struktura e projektit

```
fintrack/
├── backend/
│   ├── connect/database.js          # Lidhja me MongoDB
│   ├── controllers/
│   │   ├── transactionController.js # Logjika CRUD + përmbledhja
│   │   └── userController.js        # Regjistrim / login
│   ├── middlewares/
│   │   ├── authMiddleware.js        # Mbrojtja e rrugëve me JWT
│   │   └── errorMiddleware.js       # Trajtimi i gabimeve
│   ├── models/
│   │   ├── transactionModel.js      # Skema e transaksionit
│   │   └── userModel.js             # Skema e përdoruesit
│   ├── routes/
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/              # Komponentët React
        ├── store/                   # Redux Toolkit + RTK Query
        ├── constants.js             # Lista e kategorive
        └── index.css                # Stilet
```

## Si ta nisësh projektin

### Parakushtet
- [Node.js](https://nodejs.org/) (versioni 18 ose më i ri)
- Një bazë të dhënash MongoDB — ose lokale, ose [MongoDB Atlas](https://www.mongodb.com/atlas) (falas)

### 1. Backend

```bash
cd backend
npm install
```

Krijo një skedar `.env` brenda dosjes `backend/` (mund të kopjosh `.env.example`):

```
NODE_ENV = development
PORT = 8000
MONGO_URI = mongodb://localhost:27017/fintrack
JWT_SECRET = nje_fjalekalim_sekret_per_token
```

> Nëse përdor MongoDB Atlas, zëvendëso `MONGO_URI` me connection string-un tënd.

Nis serverin:

```bash
npm run dev
```

Serveri do të nisë në `http://localhost:8000`.

### 2. Frontend

Hap një terminal të dytë:

```bash
cd frontend
npm install
npm run dev
```

Frontend-i do të hapet në `http://localhost:5173` (Vite). Hape këtë adresë në browser.

> Skedari `frontend/.env` përmban `VITE_API_URL=http://localhost:8000/api`. Sigurohu që porti përputhet me atë të backend-it.

## Si funksionon

1. Hapësh aplikacionin → të çon te faqja e hyrjes
2. Regjistrohesh me emër, email dhe fjalëkalim
3. Pas hyrjes, sheh **Dashboard-in** me kartat e përmbledhjes dhe grafikun
4. Shton një transaksion (përshkrim, shumë, tip, kategori)
5. Te faqja **Transaksionet** sheh listën, mund të filtrosh, modifikosh ose fshish

## Teknologjitë

**Backend:** Express 5, Mongoose, JWT (jsonwebtoken), bcryptjs, express-async-handler
**Frontend:** React 19, Redux Toolkit (RTK Query), React Router 7, react-toastify, react-icons, Vite

## API Endpoints

| Metoda | Rruga | Përshkrimi | Akses |
|--------|-------|-----------|-------|
| POST | `/api/users` | Regjistrim | Publik |
| POST | `/api/users/login` | Hyrje | Publik |
| GET | `/api/transactions` | Të gjitha transaksionet | Privat |
| GET | `/api/transactions/summary` | Përmbledhja financiare | Privat |
| POST | `/api/transactions` | Krijo transaksion | Privat |
| PUT | `/api/transactions/:id` | Përditëso | Privat |
| DELETE | `/api/transactions/:id` | Fshi | Privat |
