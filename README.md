# 🛒 MarketMint

MarketMint is a modern grocery shopping application built with React Native and Expo. It provides a clean, fast, and user-friendly experience for managing grocery shopping, tracking items, and organizing purchases.

## ✨ Features

* 🔐 Authentication with Clerk
* 🛍️ Grocery item management
* 📦 Quantity tracking
* ✅ Mark items as purchased
* 🚚 Smart shopping experience
* 🎨 Modern UI with custom animations
* 📱 Cross-platform support (Android, iOS, Web)
* ☁️ Neon PostgreSQL Database
* 🗄️ Drizzle ORM for database management

## 🛠️ Tech Stack

### Frontend

* React Native
* Expo Router
* TypeScript
* NativeWind
* React Native Animated
* Expo Linear Gradient

### Backend & Database

* Neon PostgreSQL
* Drizzle ORM

### Authentication

* Clerk

## 📂 Project Structure

```text
app/
components/
constants/
assets/
lib/
 └── server/
      └── db/
           ├── client.ts
           ├── schema.ts
           └── db-actions.ts
scripts/
```

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Sureka7557/MarketMint.git
cd MarketMint
```

### Install Dependencies

```bash
bun install
```

### Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_DATABASE_URL=your_neon_database_url
```

### Run Development Server

```bash
bun start
```

### Android

```bash
bun run android
```

### iOS

```bash
bun run ios
```

## 🗄️ Database

Generate migrations:

```bash
bunx drizzle-kit generate
```

Push schema:

```bash
bunx drizzle-kit push
```

Seed database:

```bash
bun run seed:grocery
```

## 📸 Screenshots

Coming Soon

## 👩‍💻 Author

**Sureka**

GitHub: https://github.com/Sureka7557

## 📄 License

This project is licensed under the MIT License.
