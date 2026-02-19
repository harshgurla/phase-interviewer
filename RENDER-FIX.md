# 🚀 RENDER DEPLOYMENT FIX GUIDE

## ❌ Current Problem
Your frontend is trying to connect to `localhost:5000` (local computer), but your backend is on Render (cloud). Students get `ERR_CONNECTION_REFUSED` because there's no server on their localhost.

---

## ✅ SOLUTION: Update Frontend to Use Render URL

### Step 1: Get Your Render Backend URL

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your **backend service**
3. Copy the URL (looks like: `https://phase-assistant-backend.onrender.com`)

### Step 2: Create Client Environment File

Create a file: `/home/navgurukul/Desktop/phase-assistant/client/.env`

```env
VITE_API_URL=https://YOUR-BACKEND-NAME.onrender.com/api
```

**Replace `YOUR-BACKEND-NAME` with your actual Render backend URL!**

Example:
```env
VITE_API_URL=https://phase-assistant-backend.onrender.com/api
```

### Step 3: Rebuild and Redeploy Frontend

```bash
cd /home/navgurukul/Desktop/phase-assistant/client
npm run build
```

Then push to GitHub and redeploy on Render/Vercel/Netlify.

---

## 🔧 If You're Using Render for BOTH Frontend & Backend

### Backend Service Settings:
- **Environment:** Node
- **Build Command:** `cd server && npm install`
- **Start Command:** `cd server && npm start`
- **Port:** 5000 (auto-detected)

### Frontend Service Settings:
- **Environment:** Static Site
- **Build Command:** `cd client && npm install && npm run build`
- **Publish Directory:** `client/dist`
- **Environment Variables:**
  ```
  VITE_API_URL=https://YOUR-BACKEND-NAME.onrender.com/api
  ```

---

## 📋 Quick Checklist

- [ ] Backend is deployed and running on Render
- [ ] Copy backend URL from Render dashboard
- [ ] Create `client/.env` with `VITE_API_URL=<backend-url>/api`
- [ ] Rebuild frontend: `npm run build`
- [ ] Redeploy frontend to Render/Vercel/Netlify
- [ ] Test by accessing your frontend URL
- [ ] Share frontend URL with students (NOT localhost!)

---

## 🌐 What URLs to Share with Students

❌ **WRONG:** http://localhost:5173 (your computer only!)
❌ **WRONG:** http://localhost:5000 (your computer only!)

✅ **CORRECT:** Your Render/Vercel frontend URL
Example: https://phase-assistant.onrender.com

---

## 🐛 Still Having Issues?

### Backend not responding?
Check Render logs:
1. Go to Render dashboard
2. Click your backend service
3. Click "Logs" tab
4. Look for errors

### CORS errors?
Add to `server/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com', 'http://localhost:5173'],
  credentials: true
}));
```

### Need to test locally?
- **Backend:** Keep using `npm start` (localhost:5000)
- **Frontend:** Create `client/.env.local`:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```

---

## 💡 Remember

- **Local development:** Use localhost URLs
- **Production (students):** Use Render URLs
- **Never share localhost URLs** - they only work on your computer!
- Set environment variables in Render dashboard, not in code
