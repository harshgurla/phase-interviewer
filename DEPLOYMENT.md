# Deployment Guide for Phase Assistant AI Tool

## 🚀 Quick Deployment Options

### Option 1: FREE Deployment (Recommended for Learning)
**Frontend**: Vercel or Netlify
**Backend**: Railway or Render
**Database**: MongoDB Atlas (free tier)

### Option 2: Full Cloud Platform
**All-in-one**: AWS, Google Cloud, or Azure

---

## Step 1: Setup Database (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project called "phase-assistant"
4. Build a cluster (M0 Free tier)
5. Set IP whitelist to 0.0.0.0/0 (for development)
6. Create database user: `phase_user` with strong password
7. Get connection string: `mongodb+srv://phase_user:PASSWORD@cluster.mongodb.net/phase-assistant`

---

## Step 2: Setup Gemini API

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create API key
3. Save it securely (you'll need it for environment variables)

---

## Step 3: Deploy Backend (Railway - Easiest)

### Using Railway.app

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   ```
   MONGO_URI=mongodb+srv://phase_user:PASSWORD@cluster.mongodb.net/phase-assistant
   GEMINI_API_KEY=your_api_key
   JWT_SECRET=generate_random_string_32_chars_min
   ADMIN_EMAIL=admin@yoursite.com
   ADMIN_PASSWORD=strong_password_here
   NODE_ENV=production
   PORT=5000
   ```
6. Deploy button - Railway will auto-detect Node.js and start

**Backend URL will be**: `https://your-project-name.up.railway.app`

---

## Step 4: Deploy Frontend (Vercel - Easiest)

### Using Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Select "client" as root directory
5. Add environment variables:
   ```
   VITE_API_URL=https://your-project-name.up.railway.app/api
   ```
6. Deploy!

**Frontend URL will be**: `https://your-project.vercel.app`

---

## Step 5: Update CORS in Backend

Edit `server/server.js` and update CORS:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));
```

---

## Step 6: Update Frontend API URL

Update `client/src/api.js`:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

export default axios.create({
  baseURL: API_BASE_URL
});
```

---

## Deployment Commands (for manual deployment)

### Build Frontend
```bash
cd client
npm run build
```

Output: `client/dist` folder (upload to hosting)

### Start Backend
```bash
cd server
npm start
```

---

## Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Set strong ADMIN_PASSWORD
- [ ] Use MongoDB Atlas (not local)
- [ ] Get Gemini API key
- [ ] Update CORS origin to frontend URL
- [ ] Test login/admin endpoints
- [ ] Test Gemini evaluation flow
- [ ] Setup error monitoring (optional: Sentry)
- [ ] Enable HTTPS (all platforms do this by default)
- [ ] Test on production before release

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB Atlas IP whitelist
- Verify connection string has correct password
- Ensure MONGO_URI is set in environment

### "Gemini API key invalid"
- Regenerate key at Google AI Studio
- Ensure GEMINI_API_KEY is exactly copied

### "CORS error"
- Update FRONTEND_URL in backend env vars
- Restart backend after changing env vars

### "Deployment fails"
- Check build logs in platform dashboard
- Ensure Node version is 16+ 
- Run `npm install` locally to check for errors

---

## After Deployment

1. Go to `https://your-frontend-url.com`
2. Test signup/login
3. Start an interview session
4. Submit an answer - should get Gemini feedback
5. Check admin dashboard to verify data

---

## Next Steps (Optional Enhancements)

- [ ] Add email verification
- [ ] Setup error logging (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Setup CDN for frontend (CloudFlare)
- [ ] Add rate limiting
- [ ] Setup SSL certificates
