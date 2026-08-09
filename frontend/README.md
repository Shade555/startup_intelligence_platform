# Signup & SignIn Template 🚀

A modern, full-featured authentication system built with **Next.js** and **Supabase**. Supports email/password authentication and OAuth providers (Google & GitHub) with a beautiful dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Auth-green?logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [OAuth Configuration](#oauth-configuration)
  - [Google OAuth](#google-oauth)
  - [GitHub OAuth](#github-oauth)
- [Running the App](#running-the-app)
- [Available Routes](#available-routes)
- [How It Works](#how-it-works)

---

## ✨ Features

✅ **Email & Password Authentication**
- Sign up with email and password
- Sign in with existing credentials
- Password confirmation validation
- Error handling and user feedback

✅ **OAuth Providers**
- Google OAuth integration
- GitHub OAuth integration
- One-click login/signup
- Automatic user creation

✅ **Dashboard**
- Protected route (requires authentication)
- User profile display
- Session management
- Sign out functionality
- Auto-redirect to login if not authenticated

✅ **Security**
- Supabase server-side authentication
- Secure token handling
- Protected API routes
- Database session management

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Supabase** | Backend & authentication |
| **Tailwind CSS** | Styling |
| **Next Auth (Supabase)** | Session management |

---

## 📁 Project Structure

```
app/
├── (routing)/
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx          # Sign in page
│   │   └── signup/
│   │       └── page.tsx          # Sign up page
│   └── dashboard/
│       └── page.tsx              # Protected dashboard
├── components/
│   ├── auth/
│   │   ├── Auth.jsx              # Auth component (signin/signup toggle)
│   │   └── Auth.css              # Auth styling
│   ├── dashboard/
│   │   └── Dashboard.jsx         # Dashboard component
│   └── Navbar.jsx                # Navigation component
├── lib/
│   └── supabase/
│       ├── client.ts             # Browser client
│       └── server.ts             # Server client
├── layout.tsx                    # Root layout
├── page.tsx                      # Home page
├── globals.css                   # Global styles
└── Home.css                      # Home page styles

public/
├── bg.mp4                        # Background video
└── favicon.ico

Root Files
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js config
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind config
├── postcss.config.mjs            # PostCSS config
└── eslint.config.mjs             # ESLint config
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Clone & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd hackathon_template

# Install dependencies
npm install

# Install Supabase packages
npm install @supabase/supabase-js @supabase/ssr
```

---

## 🔐 Environment Setup

### Create `.env.local` file

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Get Your Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings → API**
4. Copy your **Project URL** and **Anon Key**
5. Paste them in `.env.local`

---

## 🔑 OAuth Configuration

### Google OAuth Setup

#### 1. Create Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create a new project
- Enable **Google+ API**

#### 2. Create OAuth Credentials
- Go to **APIs & Services → Credentials**
- Click **Create Credentials → OAuth 2.0 Client ID**
- Choose **Web Application**
- Add Authorized JavaScript Origins:
  ```
  http://localhost:3000
  http://127.0.0.1:3000
  ```
- Add Authorized Redirect URI:
  ```
  https://your-project.supabase.co/auth/v1/callback?provider=google
  ```
- Copy **Client ID** and **Client Secret**

#### 3. Add to Supabase
1. Go to **Authentication → Providers**
2. Click **Google**
3. Toggle **Enable**
4. Paste Client ID and Client Secret
5. Click **Save**

---

### GitHub OAuth Setup

#### 1. Create GitHub OAuth App
- Go to GitHub Settings → **Developer settings → OAuth Apps**
- Click **New OAuth App**
- Fill in the form:
  - **App name**: Your app name
  - **Homepage URL**: `http://localhost:3000`
  - **Authorization callback URL**: 
    ```
    https://your-project.supabase.co/auth/v1/callback?provider=github
    ```

#### 2. Get Credentials
- Copy **Client ID** and **Client Secret**

#### 3. Add to Supabase
1. Go to **Authentication → Providers**
2. Click **GitHub**
3. Toggle **Enable**
4. Paste Client ID and Client Secret
5. Click **Save**

---

## 🎯 Running the App

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 🗺️ Available Routes

| Route | Purpose | Auth Required |
|-------|---------|:-------------:|
| `/` | Home page | ❌ |
| `/auth/signin` | Sign in page | ❌ |
| `/auth/signup` | Sign up page | ❌ |
| `/dashboard` | User dashboard | ✅ |

---

## 🔄 How It Works

### Authentication Flow

#### Email/Password Sign Up
```
User fills form → Validate → Supabase creates account → Success message → Switch to signin
```

#### Email/Password Sign In
```
User enters credentials → Supabase auth → Session created → Redirect to /dashboard → User logged in
```

#### OAuth (Google/GitHub)
```
User clicks Google/GitHub button → Redirect to provider → User authenticates → 
Provider redirects back → Supabase creates/updates session → Redirect to /dashboard
```

### Protected Routes

The dashboard automatically:
- Checks if user is authenticated
- Displays user info (email, sign-in date, ID)
- Redirects to `/auth/signin` if not logged in
- Provides sign out button

### Session Management

Sessions are managed by:
- **Browser**: Stored in cookies (client)
- **Server**: Validated via server client
- **Supabase**: Central auth provider

---

## 📝 Component Overview

### Auth Component (`Auth.jsx`)
- Handles both sign up and signup flows
- Toggle between modes
- Email/password validation
- OAuth button integration
- Error display
- Loading states

### Dashboard Component (`Dashboard.jsx`)
- Protected route with auth check
- User profile display
- Sign out functionality
- Automatic redirects

### Supabase Clients
- **client.ts**: Browser-side authentication (sign up, sign in, OAuth)
- **server.ts**: Server-side protected routes & session validation

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

### Update OAuth Redirect URLs

For production, update redirect URIs in:
- **Google Cloud Console**: Add your production domain
- **GitHub OAuth App**: Update callback URL
- **Supabase Dashboard**: May auto-detect based on domain

---

## 📚 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Made with ❤️ for the Hackathon** 🎉
