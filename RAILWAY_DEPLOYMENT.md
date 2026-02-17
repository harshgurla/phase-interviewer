# Railway Deployment Configuration

This guide helps you deploy Phase Assistant to Railway in 10 minutes.

## Prerequisites

- GitHub account
- MongoDB Atlas free account (database)
- Google Gemini API key
- Railway account

## Step-by-Step Deployment

### 1. Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create user: `phase_user` with password
4. Get connection string (looks like: `mongodb+srv://phase_user:PASSWORD@cluster.mongodb.net/phase-assistant`)
5. Copy and save it

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy and save it

### 3. Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub and select your `phase-assistant` repository
5. Railway will detect it's a Node.js project

### 4. Add Environment Variables

Once Railway creates the project:

1. Go to "Variables" tab
2. Add these environment variables:

```
MONGO_URI=mongodb+srv://phase_user:PASSWORD@cluster.mongodb.net/phase-assistant
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=generate_a_random_32_character_string
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=strong_password_here
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
PORT=5000
```

3. Click "Deploy"

### 5. Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set root directory to `./client`
5. Add environment variables:

```
VITE_API_URL=https://phase-assistant-production.up.railway.app/api
```

6. Click "Deploy"

### 6. Update Backend URL in Frontend

After Vercel deployment, if your backend URL is different:

1. Go to Vercel project settings
2. Update `VITE_API_URL` to your Railway backend URL
3. Redeploy

## Testing Deployment

1. Visit your Vercel frontend URL
2. Sign up with test email
3. Start an interview session
4. Submit an answer
5. Verify Gemini feedback appears

## Troubleshooting

### MongoDB Connection Error
- Verify IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure MONGO_URI env var is set

### Gemini API Error
- Verify API key is correct
- Check Google Cloud API is enabled
- Test API key at [aistudio.google.com](https://aistudio.google.com)

### Frontend Can't Connect to Backend
- Check VITE_API_URL is correct
- Verify backend is running (check Railway logs)
- Clear browser cache and retry

## Railway Dashboard

Your Railway dashboard shows:
- **Logs**: Check deployment logs if something fails
- **Variables**: Manage environment variables
- **Deployments**: See deployment history
- **Usage**: Monitor resources used

## Next Steps

- [ ] Setup custom domain for frontend
- [ ] Setup custom domain for backend
- [ ] Configure SSL certificates
- [ ] Setup monitoring/alerts
- [ ] Add CI/CD pipeline
- [ ] Setup automated backups

## Support

For Railway issues: [Railway Docs](https://docs.railway.app)
For Vercel issues: [Vercel Docs](https://vercel.com/docs)
