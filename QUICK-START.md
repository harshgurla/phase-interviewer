# 🚀 Quick Start Guide

## Problem: ERR_CONNECTION_REFUSED Error?

This happens when the backend server is not running. Use the scripts below to start/stop the application properly.

---

## ✅ PERMANENT SOLUTION - Use These Scripts

### **Option 1: Start Everything (Recommended)**
```bash
./start-app.sh
```
This will:
- Start the backend server on port 5000
- Start the frontend client on port 5173
- Create logs in the `logs/` directory
- Keep both running in the background

### **Option 2: Check if Running**
```bash
./check-status.sh
```
Shows which services are running and their process IDs.

### **Option 3: Stop Everything**
```bash
./stop-app.sh
```
Stops both frontend and backend cleanly.

---

## 🔧 Manual Start (If Scripts Don't Work)

### Start Backend Only:
```bash
cd server
npm start
```
Keep this terminal open!

### Start Frontend (in new terminal):
```bash
cd client
npm run dev
```
Keep this terminal open too!

---

## 🐛 Troubleshooting

### Error: "Port 5000 already in use"
```bash
# Kill the process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Error: "Port 5173 already in use"
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
```

### Check logs if something goes wrong:
```bash
tail -f logs/server.log    # Backend logs
tail -f logs/client.log    # Frontend logs
```

---

## 📋 Daily Workflow

**Every time you start working:**
```bash
./start-app.sh
```

**When you're done:**
```bash
./stop-app.sh
```

**If errors occur:**
```bash
./check-status.sh
```

---

## 🔄 Auto-start on System Boot (Optional)

To make it start automatically when you login:

1. Open Startup Applications:
   ```bash
   gnome-session-properties
   ```

2. Click "Add" and enter:
   - Name: `Phase Assistant`
   - Command: `/home/navgurukul/Desktop/phase-assistant/start-app.sh`
   - Comment: `Start Phase Assistant Application`

3. Click "Save"

Now it will start automatically when you log in!

---

## 🌐 Access URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/

---

## ⚠️ Important Notes

- **Never close the terminals** if you start manually
- **Always use `./stop-app.sh`** to stop properly
- **Check `./check-status.sh`** before starting to avoid conflicts
- **Logs are saved** in the `logs/` directory
