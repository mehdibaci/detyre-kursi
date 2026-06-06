# FinTrack — Web App per Menaxhimin e Financave Personale

Web app **MERN Stack** (MongoDB, Express, React, Node.js) qe i mundeson perdoruesit te regjistroje te ardhurat dhe shpenzimet, t'i klasifikoje sipas kategorive, dhe te shohe ne kohe reale nje permbledhje te gjendjes se tij financiare.

Projekti eshte ndertuar mbi arkitekturen e seminarit (MERN-TaskApp): autentikim me JWT, middleware per mbrojtjen e rrugeve (routes), RTK Query per menaxhimin e state, dhe operacione CRUD. Mbi kete baze jane shtuar: nje data model me i pasur, permbledhje financiare, filtrim, dhe nje grafik vizual.

## Veçorite

- **Autentikim**: register, login, dhe logout me token JWT
- **CRUD i plote**: shto, shfaq, modifiko dhe fshi transaksione
- **Tipi i transaksionit**: te ardhura (income) ose shpenzim (expense)
- **Kategorite**: Ushqim, Qira, Transport, Argetim, Shendetesi, Fatura, Rroge, Te tjera
- **Dashboard**: te ardhura totale, shpenzime totale, dhe bilanci
- **Grafik (donut chart)**: shperndarja e shpenzimeve sipas kategorive (SVG i paster, pa libra shtese)
- **Filtrim**: sipas tipit dhe sipas kategorise
- **Ngjyrosje**: te ardhurat jeshile, shpenzimet te kuqe, per lexueshmeri me te mire

## Struktura e projektit

```
fintrack/
├── backend/
│   ├── connect/database.js          # Lidhja me MongoDB
│   ├── controllers/
│   │   ├── transactionController.js # Logjika CRUD + permbledhja
│   │   └── userController.js        # Register / login
│   ├── middlewares/
│   │   ├── authMiddleware.js        # Mbrojtja e routes me JWT
│   │   └── errorMiddleware.js       # Trajtimi i gabimeve
│   ├── models/
│   │   ├── transactionModel.js      # Schema e transaksionit
│   │   └── userModel.js             # Schema e perdoruesit
│   ├── routes/
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/              # React components
        ├── store/                   # Redux Toolkit + RTK Query
        ├── constants.js             # Lista e kategorive
        └── index.css                # Stilet
```

## Si ta nisesh projektin

### Parakushtet
- [Node.js](https://nodejs.org/) (versioni 18 ose me i ri)
-  [MongoDB Atlas](https://www.mongodb.com/atlas) (falas)

### 1. Backend

```bash
cd backend
npm install
```

Krijo nje file `.env` brenda dosjes `backend/` (mund te kopjosh `.env.example`):

```
NODE_ENV = development
PORT = 8000
MONGO_URI = mongodb://localhost:27017/fintrack
JWT_SECRET = nje_fjalekalim_sekret_per_token
```

> Nese perdor MongoDB Atlas, zevendeso `MONGO_URI` me connection string-un tend.

Nis serverin:

```bash
npm run dev
```

Serveri do te nise ne `http://localhost:8000`.

### 2. Frontend

Hap nje terminal te dyte:

```bash
cd frontend
npm install
npm run dev
```

Frontend-i do te hapet ne `http://localhost:5173` (Vite). Hape kete adrese ne browser.

> File `frontend/.env` permban `VITE_API_URL=http://localhost:8000/api`. Sigurohu qe porti perputhet me ate te backend-it.

## Si funksionon

1. Hapesh aplikacionin → te çon te faqja e login
2. Register me emer, email dhe password
3. Pas login, sheh **Dashboard** me kartat e permbledhjes dhe grafikun
4. Shton nje transaksion (pershkrim, shume, tip, kategori)
5. Te faqja **Transaksionet** sheh listen, mund te filtrosh, modifikosh ose fshish

## Teknologjite

**Backend:** Express 5, Mongoose, JWT (jsonwebtoken), bcryptjs, express-async-handler
**Frontend:** React 19, Redux Toolkit (RTK Query), React Router 7, react-toastify, react-icons, Vite

## API Endpoints

| Metoda | Route | Pershkrimi | Akses |
|--------|-------|-----------|-------|
| POST | `/api/users` | Register | Publik |
| POST | `/api/users/login` | Login | Publik |
| GET | `/api/transactions` | Te gjitha transaksionet | Privat |
| GET | `/api/transactions/summary` | Permbledhja financiare | Privat |
| POST | `/api/transactions` | Krijo transaksion | Privat |
| PUT | `/api/transactions/:id` | Update | Privat |
| DELETE | `/api/transactions/:id` | Fshi | Privat |
</document_content>