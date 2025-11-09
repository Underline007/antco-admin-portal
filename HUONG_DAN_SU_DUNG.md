# 📖 HƯỚNG DẪN SỬ DỤNG ANTCO ADMIN PORTAL

## 🚀 Khởi động ứng dụng

### Bước 1: Chạy Backend
```bash
# Terminal 1 - API Server (Port 5000)
cd C:\HaiDang_AntCo\SSO.AntCo
dotnet run --project src\Presentation\SSO.AntCo.API\SSO.AntCo.API.csproj

# Terminal 2 - Admin API Server (Port 5100)
cd C:\HaiDang_AntCo\SSO.AntCo
dotnet run --project src\Presentation\SSO.AntCo.Admin.API\SSO.AntCo.Admin.API.csproj

# Terminal 3 - IdentityServer / OAuth Server (Port 5200)
cd C:\HaiDang_AntCo\SSO.AntCo
dotnet run --project src\Presentation\SSO.AntCo.IdentityServer\SSO.AntCo.IdentityServer.csproj
```

**Lưu ý:** Cần chạy cả 3 backend servers để hệ thống hoạt động đầy đủ.

### Bước 2: Chạy Frontend
```bash
# Terminal 4 - Frontend
cd C:\HaiDang_AntCo\antco-admin-portal
npm run dev
```

### Bước 3: Truy cập
Mở trình duyệt và truy cập: **http://localhost:5174**

---

## 🏗️ KIẾN TRÚC HỆ THỐNG

### Tổng quan Backend

Hệ thống SSO.AntCo sử dụng kiến trúc **3-tier backend** với các API độc lập:

| Service | Port | Chức năng |
|---------|------|-----------|
| **SSO.AntCo.API** | 5000 | API chính - Xác thực & quản lý user |
| **SSO.AntCo.Admin.API** | 5100 | API quản trị - CRUD users, roles, permissions |
| **SSO.AntCo.IdentityServer** | 5200 | OAuth 2.0 Server - SSO & Google Login |

### Luồng hoạt động:

```
┌─────────────────┐
│   Frontend      │  (Port 5174)
│  Admin Portal   │
└────────┬────────┘
         │
         ├──────────────┐
         │              │
         ▼              ▼
┌─────────────┐  ┌──────────────┐
│   API       │  │  Admin API   │
│  (5000)     │  │   (5100)     │
└──────┬──────┘  └──────┬───────┘
       │                │
       │  ┌─────────────┘
       │  │
       ▼  ▼
┌──────────────────┐
│   MongoDB        │
│   (27017)        │
└──────────────────┘

       ┌────────────────┐
       │ IdentityServer │ (5200)
       │  OAuth 2.0     │
       └────────┬───────┘
                │
         ┌──────┴──────┐
         ▼             ▼
    Google OAuth   Other Apps
```

### Phân công nhiệm vụ:

**1. SSO.AntCo.API (Port 5000):**
- ✅ Đăng nhập/đăng ký
- ✅ Quản lý phiên đăng nhập
- ✅ Đổi mật khẩu
- ✅ Lấy thông tin user hiện tại
- ✅ JWT token generation & validation

**2. SSO.AntCo.Admin.API (Port 5100):**
- ✅ CRUD Users (create, read, update, delete)
- ✅ CRUD Roles
- ✅ Quản lý Permissions
- ✅ Gán roles cho users
- ✅ Quản lý OAuth Clients

**3. SSO.AntCo.IdentityServer (Port 5200):**
- ✅ OAuth 2.0 Authorization Server
- ✅ OpenID Connect Provider
- ✅ Google OAuth Integration
- ✅ SSO cho ứng dụng bên ngoài
- ✅ Token endpoint, Authorization endpoint

### Tech Stack:

**Backend:**
- .NET 8.0
- ASP.NET Core Web API
- MongoDB (NoSQL Database)
- MediatR (CQRS Pattern)
- Clean Architecture

**Frontend:**
- React 19
- TypeScript
- Vite (Build tool)
- TanStack Query (Server state)
- Zustand (Client state)
- Tailwind CSS v4
- React Router v7

---

## 🔐 Đăng nhập

### Tài khoản Admin mặc định
- **Email**: `admin@sso.antco.com`
- **Password**: `Admin@123`

### Các bước đăng nhập:

1. Truy cập trang đăng nhập tại `/auth`
2. Nhập email và password
3. Click nút **"Sign In"**
4. Sau khi đăng nhập thành công, bạn sẽ được chuyển đến Dashboard

### Tính năng đăng nhập:
- ✅ Ghi nhớ phiên đăng nhập (localStorage)
- ✅ Auto-refresh token khi hết hạn
- ✅ Show/hide password
- ✅ Validation email và password
- ✅ Error messages hiển thị rõ ràng

---

## 📊 DASHBOARD (Trang chủ)

**Route**: `/` hoặc `/dashboard`

### Chức năng:
- 📈 Hiển thị tổng quan thống kê hệ thống
- 👥 Số lượng users
- 🔑 Số lượng roles
- 🛡️ Số lượng permissions
- 📊 Biểu đồ hoạt động (nếu có)

### Quick Actions:
- Nút nhanh để tạo User mới
- Nút nhanh để tạo Role mới
- Liên kết nhanh đến các trang quản lý

---

## 👥 QUẢN LÝ USERS

**Route**: `/users`

### Chức năng chính:

#### 1. **Xem danh sách Users**
- Hiển thị dạng table với phân trang
- Thông tin hiển thị:
  - ✉️ Email
  - 👤 Tên (First Name + Last Name)
  - 📱 Số điện thoại
  - 🎭 Roles được gán
  - 🟢 Trạng thái (Active/Inactive/Suspended)
  - 📅 Ngày tạo

#### 2. **Tìm kiếm Users**
- Tìm theo email hoặc tên
- Nhập từ khóa vào ô search
- Click nút **"Search"** hoặc nhấn Enter

#### 3. **Lọc Users**
- Lọc theo trạng thái (Status):
  - Active
  - Inactive
  - Suspended

#### 4. **Phân trang**
- Điều chỉnh số items mỗi trang (10, 20, 50)
- Nút Previous/Next
- Hiển thị tổng số users

#### 5. **Thao tác với User**
Mỗi user có các nút action:
- 👁️ **View** - Xem chi tiết
- ✏️ **Edit** - Chỉnh sửa thông tin
- 🗑️ **Delete** - Xóa user (có xác nhận)
- 🎭 **Assign Roles** - Gán roles

### Cách sử dụng:

**Tạo User mới:**
```
1. Click nút "Add User" (góc phải trên)
2. Nhập thông tin:
   - Email (bắt buộc)
   - Password (bắt buộc, tối thiểu 6 ký tự)
   - First Name
   - Last Name
   - Phone Number
3. Click "Create User"
```

**Chỉnh sửa User:**
```
1. Click icon Edit (✏️) ở hàng user
2. Cập nhật thông tin cần thiết
3. Click "Save Changes"
```

**Gán Roles cho User:**
```
1. Click nút "Assign Roles" hoặc icon 🎭
2. Chọn roles từ danh sách
3. Click "Assign"
```

**Xóa User:**
```
1. Click icon Delete (🗑️)
2. Xác nhận trong dialog
3. User sẽ bị xóa khỏi hệ thống
```

---

## 🔑 QUẢN LÝ ROLES

**Route**: `/roles`

### Chức năng chính:

#### 1. **Xem danh sách Roles**
- Hiển thị dạng grid cards (responsive)
- Mỗi card hiển thị:
  - 🔑 Tên role
  - 📝 Mô tả
  - 📅 Ngày tạo
  - Action buttons

#### 2. **Tìm kiếm Roles**
- Tìm theo tên role
- Real-time search

#### 3. **Thao tác với Role**
- ✏️ **Edit** - Chỉnh sửa role
- 🗑️ **Delete** - Xóa role
- 🔐 **Permissions** - Quản lý permissions của role

### Cách sử dụng:

**Tạo Role mới:**
```
1. Click nút "Add Role"
2. Nhập:
   - Tên role (bắt buộc, unique)
   - Mô tả
3. Click "Create Role"
```

**Gán Permissions cho Role:**
```
1. Click nút "Permissions" trên role card
2. Chọn permissions từ danh sách
3. Click "Save"
```

**Chỉnh sửa Role:**
```
1. Click icon Edit
2. Cập nhật tên hoặc mô tả
3. Click "Update"
```

---

## 🛡️ XEM PERMISSIONS

**Route**: `/permissions`

### Chức năng chính:

#### 1. **Xem danh sách Permissions**
- Hiển thị permissions được nhóm theo category
- 5 categories:
  - 👥 **Users** - Quản lý users
  - 🔑 **Roles** - Quản lý roles
  - 🛡️ **Permissions** - Quản lý permissions
  - 🔌 **Clients** - Quản lý OAuth clients
  - ⚙️ **System** - Quản trị hệ thống

#### 2. **Filter theo Category**
- Click vào category button để lọc
- Click "All" để xem tất cả
- Màu sắc khác nhau cho mỗi category

#### 3. **Thông tin Permission**
Mỗi permission hiển thị:
- Tên permission (VD: `users.read`, `roles.create`)
- Mô tả chức năng
- Category

### Cách sử dụng:

**Xem permissions của một category:**
```
1. Click vào category button (VD: "Users")
2. Danh sách permissions sẽ được lọc
3. Click "All" để quay lại xem tất cả
```

**Hiểu permission naming:**
```
Format: {resource}.{action}

Ví dụ:
- users.read      → Đọc thông tin users
- users.create    → Tạo user mới
- users.update    → Cập nhật user
- users.delete    → Xóa user
- roles.manage    → Quản lý roles
```

---

## 👤 TRANG PROFILE (Thông tin cá nhân)

**Route**: `/profile`

### Chức năng:

#### 1. **Xem thông tin cá nhân**
- ✉️ Email (không thể thay đổi)
- 👤 First Name
- 👤 Last Name
- 📱 Phone Number
- 📅 Ngày tạo tài khoản
- 🕐 Lần đăng nhập cuối
- 🟢 Trạng thái tài khoản
- 🎭 Roles được gán

#### 2. **Chỉnh sửa thông tin**
- First Name
- Last Name
- Phone Number

### Cách sử dụng:

**Cập nhật thông tin cá nhân:**
```
1. Click nút "Edit Profile"
2. Các trường sẽ được enable để chỉnh sửa
3. Thay đổi thông tin:
   - First Name
   - Last Name
   - Phone Number
4. Click "Save Changes" để lưu
5. Click "Cancel" để hủy
```

**Lưu ý:**
- Email không thể thay đổi
- Thông tin sẽ được cập nhật ngay lập tức
- Success message sẽ hiển thị khi lưu thành công

---

## ⚙️ TRANG SETTINGS (Cài đặt)

**Route**: `/settings`

### Chức năng chính:

#### 1. **Đổi mật khẩu**

**Yêu cầu mật khẩu:**
- ✅ Tối thiểu 6 ký tự
- ✅ Phải khác mật khẩu cũ
- ✅ Mật khẩu mới và xác nhận phải giống nhau

### Cách sử dụng:

**Đổi mật khẩu:**
```
1. Nhập "Current Password" (mật khẩu hiện tại)
2. Nhập "New Password" (mật khẩu mới)
3. Nhập "Confirm New Password" (xác nhận mật khẩu mới)
4. Click nút "Change Password"
```

**Tính năng hỗ trợ:**
- 👁️ Show/Hide password (click icon mắt)
- ✅ Validation real-time
- 🔴 Error messages rõ ràng
- 🟢 Success notification
- 📋 Password requirements checklist

**Các lỗi thường gặp:**
- ❌ "Current password is required" - Chưa nhập mật khẩu cũ
- ❌ "New password must be at least 6 characters" - Mật khẩu quá ngắn
- ❌ "Passwords do not match" - Mật khẩu xác nhận không khớp
- ❌ "New password must be different" - Mật khẩu mới giống cũ
- ❌ "Invalid current password" - Mật khẩu cũ sai

**Sau khi đổi thành công:**
```
1. Form sẽ được reset
2. Success message hiển thị
3. Mật khẩu mới có hiệu lực ngay lập tức
4. Phiên đăng nhập hiện tại vẫn được duy trì
```

---

## 🔐 OAUTH 2.0 & IDENTITY SERVER

**Server URL**: http://localhost:5200

### Giới thiệu

IdentityServer là OAuth 2.0 Authorization Server cho phép:
- Đăng nhập bằng tài khoản Google
- Tích hợp SSO (Single Sign-On) với các ứng dụng khác
- Quản lý OAuth Clients
- Cấp phát Access Token và Refresh Token

### Các tính năng chính:

#### 1. **OAuth 2.0 Authorization Code Flow với PKCE**
- Flow bảo mật cao nhất cho web/mobile apps
- Sử dụng PKCE để bảo vệ khỏi authorization code interception
- Hỗ trợ refresh token

#### 2. **Google OAuth Integration**
- Đăng nhập bằng tài khoản Google
- Tự động đồng bộ thông tin user từ Google
- Không cần nhớ password riêng

#### 3. **OpenID Connect**
- Lấy thông tin user profile
- Email verification
- Profile photo từ Google

### Endpoints quan trọng:

```
Authorization Endpoint:
GET http://localhost:5200/oauth2/authorize

Token Endpoint:
POST http://localhost:5200/oauth2/token

UserInfo Endpoint:
GET http://localhost:5200/oauth2/userinfo
```

### Cách sử dụng OAuth:

**Đăng nhập bằng Google (cho ứng dụng khác):**

```
1. Redirect user đến:
   http://localhost:5200/oauth2/authorize?
     response_type=code&
     client_id=YOUR_CLIENT_ID&
     redirect_uri=YOUR_CALLBACK_URL&
     scope=openid profile email&
     state=RANDOM_STATE&
     code_challenge=PKCE_CHALLENGE&
     code_challenge_method=S256

2. User đăng nhập bằng Google

3. Nhận authorization code tại callback URL

4. Exchange code lấy token:
   POST http://localhost:5200/oauth2/token
   Body: {
     grant_type: "authorization_code",
     code: "AUTH_CODE",
     redirect_uri: "YOUR_CALLBACK_URL",
     client_id: "YOUR_CLIENT_ID",
     code_verifier: "PKCE_VERIFIER"
   }

5. Nhận access_token và refresh_token

6. Sử dụng access_token để gọi API
```

### Tài liệu chi tiết:

Xem file `C:\HaiDang_AntCo\SSO.AntCo\IDENTITY_SERVER_GUIDE.md` để biết:
- Hướng dẫn tích hợp chi tiết
- Code examples (React/TypeScript)
- Cấu hình Google OAuth
- Security best practices

---

## 🚪 ĐĂNG XUẤT

### Cách đăng xuất:

**Cách 1: Từ Header**
```
1. Click vào avatar/username ở góc phải trên
2. Click "Logout" trong dropdown menu
```

**Cách 2: Từ Sidebar**
```
1. Scroll xuống cuối sidebar
2. Click nút "Logout"
```

**Sau khi đăng xuất:**
- Tokens sẽ bị xóa khỏi localStorage
- Bạn sẽ được chuyển về trang đăng nhập
- Session backend cũng sẽ bị hủy

---

## 🎨 GIAO DIỆN & NAVIGATION

### Sidebar Navigation
Sidebar bên trái chứa các menu chính:
- 📊 **Dashboard** - Trang chủ
- 👥 **Users** - Quản lý users
- 🔑 **Roles** - Quản lý roles
- 🛡️ **Permissions** - Xem permissions
- 👤 **Profile** - Thông tin cá nhân
- ⚙️ **Settings** - Cài đặt

### Header
Header ở trên cùng hiển thị:
- Logo/Brand name
- User dropdown menu:
  - View Profile
  - Settings
  - Logout

### Responsive Design
- 📱 **Mobile**: Sidebar collapse thành hamburger menu
- 💻 **Tablet**: Sidebar thu gọn, hiển thị icon
- 🖥️ **Desktop**: Sidebar full, hiển thị text + icon

---

## 🔍 TÌM KIẾM & LỌC DỮ LIỆU

### Tìm kiếm (Search)
```
1. Nhập từ khóa vào ô search
2. Click nút "Search" hoặc nhấn Enter
3. Kết quả sẽ được lọc theo từ khóa
4. Xóa từ khóa và search lại để reset
```

### Lọc (Filter)
```
1. Chọn filter option (VD: Status, Category)
2. Kết quả tự động cập nhật
3. Có thể kết hợp search + filter
```

### Phân trang (Pagination)
```
1. Click "Previous" để về trang trước
2. Click "Next" để sang trang sau
3. Chọn page size để thay đổi số items/trang
4. Hiển thị: "Showing page X of Y (Z total items)"
```

---

## ⚡ KEYBOARD SHORTCUTS

| Phím tắt | Chức năng |
|----------|-----------|
| `Ctrl + /` | Focus vào search box |
| `Esc` | Đóng modal/dialog |
| `Enter` | Submit form |
| `Tab` | Di chuyển giữa các trường |

---

## ❗ XỬ LÝ LỖI

### Lỗi kết nối API
**Triệu chứng:**
- Error message: "Network Error"
- Không load được data

**Giải pháp:**
1. Kiểm tra backend có đang chạy không
2. Kiểm tra ports: 5000 (API) và 5100 (Admin API)
3. Xem console log để biết chi tiết

### Lỗi xác thực (401 Unauthorized)
**Triệu chứng:**
- Tự động redirect về trang login
- Error: "Unauthorized"

**Nguyên nhân:**
- Token hết hạn
- Token không hợp lệ

**Giải pháp:**
- Đăng nhập lại
- Hệ thống sẽ tự động refresh token

### Lỗi quyền (403 Forbidden)
**Triệu chứng:**
- Không thể truy cập trang
- Error: "You don't have permission"

**Giải pháp:**
- Liên hệ admin để được cấp quyền
- Kiểm tra roles được gán

### Lỗi validation
**Triệu chứng:**
- Form không submit được
- Error messages dưới các trường

**Giải pháp:**
- Đọc error message
- Điền đúng format yêu cầu
- Kiểm tra các trường bắt buộc

---

## 💡 TIPS & TRICKS

### 1. Quản lý Users hiệu quả
```
✅ Sử dụng search để tìm nhanh
✅ Lọc theo status để quản lý users inactive
✅ Bulk assign roles cho nhiều users
✅ Export users ra CSV/Excel (nếu có)
```

### 2. Quản lý Roles & Permissions
```
✅ Đặt tên role rõ ràng (VD: Admin, Editor, Viewer)
✅ Gán permissions theo nguyên tắc least privilege
✅ Review permissions định kỳ
✅ Tạo role template cho các nhóm user
```

### 3. Bảo mật
```
✅ Đổi mật khẩu định kỳ
✅ Sử dụng mật khẩu mạnh
✅ Đăng xuất khi không sử dụng
✅ Không chia sẻ tài khoản
✅ Sử dụng OAuth/SSO cho ứng dụng bên ngoài
✅ Enable 2FA (nếu có)
```

### 4. Performance
```
✅ Sử dụng pagination thay vì load tất cả
✅ Filter/search để giảm data load
✅ Clear cache khi gặp lỗi hiển thị
✅ Sử dụng lazy loading cho images
```

### 5. Khi nào dùng API nào?

**SSO.AntCo.API (Port 5000) - Dùng khi:**
```
✅ User cần đăng nhập/đăng ký
✅ Cần lấy thông tin user hiện tại
✅ Đổi mật khẩu
✅ Validate JWT token
✅ Refresh access token
```

**SSO.AntCo.Admin.API (Port 5100) - Dùng khi:**
```
✅ Admin cần quản lý users (CRUD)
✅ Quản lý roles và permissions
✅ Gán roles cho users
✅ Xem danh sách permissions
✅ Quản lý OAuth clients
```

**SSO.AntCo.IdentityServer (Port 5200) - Dùng khi:**
```
✅ Tích hợp SSO với ứng dụng khác
✅ Đăng nhập bằng Google OAuth
✅ Cần OAuth 2.0 Authorization Code Flow
✅ Build ứng dụng bên thứ 3 cần xác thực qua SSO
✅ Implement Single Sign-On across multiple apps
```

---

## 🆘 HỖ TRỢ & LIÊN HỆ

### Báo lỗi
Nếu gặp lỗi, vui lòng cung cấp:
- Screenshot màn hình
- Mô tả chi tiết lỗi
- Các bước để tái tạo lỗi
- Console log (F12 > Console)

### Tài liệu kỹ thuật
- **Backend API**: http://localhost:5000/swagger
- **Admin API**: http://localhost:5100/swagger
- **IdentityServer**: http://localhost:5200 (OAuth 2.0 Server)
- **Frontend source**: `C:\HaiDang_AntCo\antco-admin-portal`
- **OAuth Guide**: `C:\HaiDang_AntCo\SSO.AntCo\IDENTITY_SERVER_GUIDE.md`

---

## 📚 APPENDIX

### Default Seeded Data

**Admin User:**
```
Email: admin@sso.antco.com
Password: Admin@123
Roles: Admin, SuperAdmin
```

**Default Roles:**
- Admin
- User
- Manager
- SuperAdmin

**Default Permissions:**
- users.read
- users.create
- users.update
- users.delete
- roles.read
- roles.create
- roles.update
- roles.delete
- permissions.read
- clients.read
- clients.create
- clients.update
- clients.delete
- system.admin

---

## 🎯 CHECKLIST KHỞI ĐỘNG

Trước khi sử dụng, đảm bảo:

- [ ] **MongoDB** đang chạy (localhost:27017)
- [ ] **Backend API** đang chạy (Port 5000)
- [ ] **Admin API** đang chạy (Port 5100)
- [ ] **IdentityServer** đang chạy (Port 5200) - Bắt buộc nếu dùng OAuth
- [ ] **Frontend** đang chạy (Port 5174)
- [ ] Đã có tài khoản admin (admin@sso.antco.com / Admin@123)
- [ ] Browser hỗ trợ (Chrome, Firefox, Edge mới nhất)

### Kiểm tra nhanh các services:

```bash
# Kiểm tra API đang chạy
curl http://localhost:5000/api/health

# Kiểm tra Admin API đang chạy
curl http://localhost:5100/api/health

# Kiểm tra IdentityServer đang chạy
curl http://localhost:5200/.well-known/openid-configuration

# Kiểm tra Frontend
# Mở browser: http://localhost:5174
```

---

**Phiên bản**: 1.1
**Cập nhật lần cuối**: 2025-11-09
**Tech Stack**: React 19 + TypeScript + .NET 8.0 + MongoDB + OAuth 2.0

### Thay đổi trong phiên bản 1.1:
- ✅ Thêm hướng dẫn về IdentityServer (OAuth 2.0)
- ✅ Cập nhật kiến trúc hệ thống 3-tier backend
- ✅ Thêm phần phân biệt khi nào dùng API nào
- ✅ Bổ sung checklist health check cho các services
- ✅ Cập nhật architecture diagram
- ✅ Thêm hướng dẫn OAuth flow và Google Login

---

**Chúc bạn sử dụng hiệu quả! 🚀**
