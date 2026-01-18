# Fix Sanity CORS Issues

## 🔧 Quick Fix

### Step 1: Add CORS Origins in Sanity Dashboard

1. Go to https://sanity.io/manage
2. Select your project: **portfolio** (e2x3s42w)
3. Click **API** in the left sidebar
4. Scroll to **CORS Origins** section
5. Click **Add CORS origin**

### Step 2: Add These Origins (Exactly)

Add each of these separately:

#### For Development:
```
http://localhost:5173
```

If port 5173 is taken, also add:
```
http://localhost:5174
```

#### Format Rules:
- ✅ Use: `http://localhost:5173` (no trailing slash)
- ❌ Don't use: `localhost:5173` (missing protocol)
- ❌ Don't use: `http://localhost:5173/` (has trailing slash)
- ❌ Don't use: Studio URL (that's for Sanity Studio, not your frontend)

### Step 3: Settings for Each Origin

When adding:
- **Allow credentials**: ✅ Check this
- That's it! No other settings needed

### Step 4: Verify Your .env File

Make sure your `.env` has:
```env
VITE_SANITY_PROJECT_ID=e2x3s42w
VITE_SANITY_DATASET=production
```

## 🔄 After Adding CORS Origins

1. **Restart your dev server**:
   ```bash
   # Stop the server (Ctrl+C in terminal)
   npm run dev
   ```

2. **Hard refresh your browser**: `Ctrl+Shift+R`

3. **Check browser console**: You should now see data being fetched

## 🐛 Still Having Issues?

### Check if Project ID is Correct

Open browser console and type:
```javascript
console.log(import.meta.env.VITE_SANITY_PROJECT_ID)
```

Should show: `e2x3s42w`

### Check Network Tab

1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Refresh page
4. Look for requests to `cdn.sanity.io` or `api.sanity.io`
5. Click on them to see the error details

### Test Direct Query

Open browser console and paste:
```javascript
fetch('https://e2x3s42w.api.sanity.io/v2024-01-18/data/query/production?query=*[_type == "techStack"]')
  .then(r => r.json())
  .then(console.log)
```

If this works but your app doesn't, the CORS is set up correctly and the issue is elsewhere.

## 📸 Screenshot Guide

Your CORS settings should look like:

```
CORS Origins
┌────────────────────────────────────────┐
│ Origin: http://localhost:5173          │
│ ✅ Allow credentials                   │
│ [Delete]                               │
└────────────────────────────────────────┘
[+ Add CORS origin]
```

## 🎯 Common Mistakes

1. **Using Studio URL**: Studio URL is for Sanity Studio deployment, not CORS
2. **Wrong Protocol**: Must use `http://` for localhost
3. **Trailing Slash**: Don't add `/` at the end
4. **Port Number**: Make sure it matches your running port

## ✅ Success Indicators

You'll know it's working when:
- No CORS errors in browser console
- Console shows: `Tech stack data from Sanity: [array of items]`
- Icons appear from Sanity (not fallback data)
