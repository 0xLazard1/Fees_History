# Blockchain Transaction Analyzer

## Installation

### Backend
```bash
cd backend
pip install hypersync fastapi uvicorn web3 pandas
```

Configurez votre token depuis envio/hypersync (token) dans `backend/main.py` ligne 8.

### Frontend
```bash
cd frontend/my-app
npm install
```

## Lancement

### Backend
```bash
cd backend
uvicorn api:app --reload
```

### Frontend
```bash
cd frontend/my-app
npm run dev
```

L'application est disponible sur `http://localhost:3000`
