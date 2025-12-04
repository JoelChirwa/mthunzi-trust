# Cloudinary Setup Guide for Mthunzi Trust

## Why Cloudinary?

Render uses an **ephemeral file system**, which means uploaded files are deleted when:

- The service restarts
- A new deployment occurs
- The service scales

**Cloudinary** provides permanent cloud storage for images with a generous free tier:

- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ Automatic image optimization
- ✅ CDN delivery (fast loading worldwide)

---

## Setup Instructions

### Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Credentials

Once logged in:

1. Go to the **Dashboard** (https://cloudinary.com/console)
2. You'll see your credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Step 3: Add Environment Variables

#### **On Render:**

1. Go to your Render dashboard
2. Select your web service
3. Go to **Environment** tab
4. Add these environment variables:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### **Locally (for development):**

Add to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 4: Deploy the Changes

The code has already been updated to use Cloudinary. Just:

```bash
git add -A
git commit -m "Add Cloudinary for persistent image storage"
git push
```

### Step 5: Re-upload Images

**Important**: Any images previously uploaded to the local file system are now gone. You need to:

1. Log in to your admin panel
2. Re-upload all images (partners, blogs, programs, team members)
3. The new images will be stored permanently on Cloudinary

---

## How It Works

### Before (Local Storage - Ephemeral):

```
User uploads → Saved to /server/uploads → ❌ Deleted on deployment
```

### After (Cloudinary - Persistent):

```
User uploads → Saved to Cloudinary CDN → ✅ Permanent & Fast
```

---

## Benefits

1. **Permanent Storage**: Images never get deleted
2. **CDN Delivery**: Images load fast globally
3. **Automatic Optimization**: Cloudinary optimizes images automatically
4. **Transformations**: Can resize/crop images on-the-fly
5. **Free Tier**: More than enough for most small-to-medium sites

---

## Testing

After deployment:

1. Go to your admin panel
2. Try uploading an image
3. Check the **Network** tab in browser DevTools
4. The image URL should look like:
   ```
   https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/mthunzi-trust/filename.jpg
   ```

---

## Monitoring Usage

1. Log in to [Cloudinary Dashboard](https://cloudinary.com/console)
2. View your usage stats
3. Free tier is usually more than enough unless you have thousands of high-res images

---

## Troubleshooting

### Images still not showing?

1. **Check environment variables** on Render - make sure all 3 are set
2. **Check browser console** for errors
3. **Verify Cloudinary credentials** are correct
4. **Re-deploy** after adding environment variables

### Getting 401 Unauthorized errors?

- Double-check your API credentials
- Make sure there are no extra spaces in the environment variables

---

## Next Steps

Once Cloudinary is set up, you can:

- Enable automatic backups
- Set up custom transformations
- Use Cloudinary's image optimization features
