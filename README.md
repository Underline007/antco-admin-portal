# 🎯 AntCo Admin Portal

Admin portal để quản lý users, roles, và permissions cho hệ thống SSO.AntCo

## 🚀 Quick Start

### 1. Cài đặt
```bash
npm install
```

### 2. Cấu hình môi trường
Tạo file `.env` với nội dung:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ADMIN_API_BASE_URL=http://localhost:5100/api
```

### 3. Chạy development server
```bash
npm run dev
```

Truy cập: **http://localhost:5174**

### 4. Build production
```bash
npm run build
npm run preview
```

---

## 🔐 Đăng nhập

**Tài khoản Admin mặc định:**
- Email: `admin@sso.antco.com`
- Password: `Admin@123`

---

## 📱 Các tính năng chính

### ✅ Đã hoàn thành

| Feature | Route | Mô tả |
|---------|-------|-------|
| 🔐 **Login/Register** | `/auth` | Đăng nhập & đăng ký |
| 📊 **Dashboard** | `/dashboard` | Trang chủ với thống kê |
| 👥 **Users Management** | `/users` | Quản lý users (CRUD, search, filter) |
| 🔑 **Roles Management** | `/roles` | Quản lý roles & permissions |
| 🛡️ **Permissions** | `/permissions` | Xem danh sách permissions |
| 👤 **Profile** | `/profile` | Xem & chỉnh sửa thông tin cá nhân |
| ⚙️ **Settings** | `/settings` | Đổi mật khẩu & cài đặt |

---

## 🛠️ Tech Stack

### Core Technologies
- React 19 + TypeScript
- Vite (với Rolldown)
- React Router v7
- Tailwind CSS v4

### State & Data Management
- Zustand
- TanStack Query (React Query)
- React Hook Form + Zod
- Axios

### UI Components & Styling
- Radix UI
- Lucide React
- Recharts
- TanStack Table
- CVA (class-variance-authority) - Variant styling
- clsx + tailwind-merge

### Utilities
- Day.js

### Backend Integration
- API Port: `5000` (Auth API)
- Admin API Port: `5100` (Admin API)
- Authentication: JWT Bearer Token
- Auto token refresh on 401

---

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App-level config
│   ├── layouts/           # Layout components
│   └── routes/            # Route configuration
│
├── features/              # Feature modules
│   ├── auth/             # Authentication
│   ├── dashboard/        # Dashboard
│   ├── users/            # Users management
│   ├── roles/            # Roles management
│   ├── permissions/      # Permissions view
│   ├── profile/          # User profile
│   └── settings/         # App settings
│
├── shared/               # Shared utilities
│   ├── api/             # API client & endpoints
│   ├── components/      # Shared components
│   ├── hooks/           # Custom hooks
│   └── stores/          # Zustand stores
│
└── components/          # UI components library
    └── ui/              # Reusable UI components
```

---

## 🔌 API Endpoints

### Auth API (Port 5000)
```
POST   /api/auth/login              - Đăng nhập
POST   /api/auth/register           - Đăng ký
POST   /api/auth/logout             - Đăng xuất
GET    /api/auth/me                 - Get current user
POST   /api/auth/change-password    - Đổi mật khẩu
POST   /api/auth/refresh-token      - Refresh token
```

### Admin API (Port 5100)
```
# Users
GET    /api/admin/users             - Danh sách users
GET    /api/admin/users/{id}        - Chi tiết user
POST   /api/admin/users             - Tạo user
PUT    /api/admin/users/{id}        - Cập nhật user
DELETE /api/admin/users/{id}        - Xóa user
POST   /api/admin/users/{id}/roles  - Gán roles

# Roles
GET    /api/admin/roles             - Danh sách roles
POST   /api/admin/roles             - Tạo role
PUT    /api/admin/roles/{id}        - Cập nhật role
DELETE /api/admin/roles/{id}        - Xóa role

# Permissions
GET    /api/admin/permissions       - Danh sách permissions
GET    /api/admin/permissions/categories - Categories
```

---

## 🎨 UI Components

Dự án sử dụng các components từ:
- **Radix UI** - Accessible primitives
- **Custom UI components** - Tailwind-styled components
- **Lucide Icons** - SVG icons

### Ví dụ sử dụng:
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

<Card className="p-6">
  <Input type="email" placeholder="Email" />
  <Button>Submit</Button>
</Card>
```

---

## 🔐 Authentication Flow

1. User đăng nhập với email/password
2. Backend trả về `accessToken` + `refreshToken`
3. Frontend lưu tokens vào localStorage
4. Mọi API request auto-inject `Authorization: Bearer {token}`
5. Khi token hết hạn (401), tự động refresh
6. Nếu refresh thất bại, redirect về login

---

## 📖 Documentation

- **Hướng dẫn sử dụng chi tiết**: [HUONG_DAN_SU_DUNG.md](./HUONG_DAN_SU_DUNG.md)
- **Backend API Docs**: http://localhost:5000/swagger
- **Admin API Docs**: http://localhost:5100/swagger

---

## 📝 Scripts

```json
{
  "dev": "vite",              // Dev server với HMR
  "build": "vite build",      // Production build
  "preview": "vite preview",  // Preview production build
  "lint": "eslint ."          // Lint code
}
```

---

**Version**: 1.0.0
**Last Updated**: 2025-11-09
