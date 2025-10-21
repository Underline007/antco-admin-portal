# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Antco Admin Portal is a modern React-based admin dashboard built with:
- **React 19** + **TypeScript** for the UI framework
- **Vite** (with Rolldown) for fast build tooling
- **React Router v7** for routing
- **Tailwind CSS v4** for styling
- **Zustand** for global state management
- **TanStack Query (React Query)** for server state management
- **React Hook Form + Zod** for form handling and validation
- **Axios** for HTTP requests

## Development Commands

```bash
# Start development server
npm run dev

# Type-check and build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Feature-Based Directory Structure

The codebase follows a feature-based architecture where each feature is self-contained:

```
src/
├── app/                    # App-level providers and configuration
│   └── provider/          # Global providers (QueryProvider, etc.)
├── features/              # Feature modules (self-contained)
│   ├── auth/
│   │   ├── api/          # API functions for auth
│   │   ├── stores/       # Zustand stores for auth state
│   │   ├── types/        # TypeScript interfaces
│   │   └── utils/        # Feature-specific utilities (token management)
│   └── users/
│       ├── api/          # API functions for users
│       └── hooks/        # React Query hooks
├── shared/                # Shared/common code
│   ├── api/              # API client, endpoints, utilities
│   └── hooks/            # Shared React hooks
├── components/
│   └── ui/               # Reusable UI components
└── lib/                  # Utility libraries
```

### State Management Strategy

The app uses a **hybrid state management** approach:

1. **Zustand**: For global client state (e.g., authentication state)
   - Located in `features/*/stores/`
   - Uses `persist` middleware to sync with localStorage
   - Example: `src/features/auth/stores/authStore.ts`

2. **TanStack Query**: For server state (API data)
   - Custom hooks in `features/*/hooks/`
   - Query key factories pattern (e.g., `userKeys.list()`, `userKeys.detail(id)`)
   - Automatic caching, refetching, and optimistic updates
   - Example: `src/features/users/hooks/useUsers.ts`

### API Layer Architecture

**Centralized API client** with automatic token refresh:

1. **API Client** (`src/shared/api/client.ts`):
   - Axios instance with request/response interceptors
   - Automatic JWT token injection
   - Token refresh logic with request queuing during refresh
   - Auto-redirects to `/login` on authentication failure

2. **Endpoints** (`src/shared/api/endpoints.ts`):
   - Centralized endpoint definitions
   - Type-safe endpoint functions (e.g., `API_ENDPOINTS.USERS.GET(id)`)

3. **Feature API files** (`src/features/*/api/*Api.ts`):
   - Feature-specific API functions
   - Import `apiClient` and `API_ENDPOINTS`
   - Return typed responses

4. **Custom React Query hooks** (`src/shared/hooks/`):
   - `useApiQuery`: Wrapper around `useQuery` with error handling
   - `useApiMutation`: Wrapper around `useMutation` with error handling
   - Convenience callbacks: `onErrorMessage`, `onSuccessData`

### Authentication Flow

1. **Login**: `authStore.login()` → saves tokens via `setTokens()` → updates store
2. **Token Storage**: Access/refresh tokens stored in localStorage
3. **API Requests**: Interceptor adds `Authorization: Bearer <token>` header
4. **Token Refresh**: On 401 response, automatically refreshes token using refresh token
5. **Logout**: Clears tokens, resets store, redirects to login

### Path Alias

The project uses `@/*` as an alias for `src/*`:
- Configured in `vite.config.ts` and `tsconfig.json`
- Example: `import { apiClient } from '@/shared/api/client'`

## Adding a New Feature

Follow this pattern when adding new features:

1. **Create feature directory**: `src/features/feature-name/`

2. **Add types**: `src/features/feature-name/types/index.ts`
   ```typescript
   export interface Item {
     id: string;
     // ... fields
   }
   ```

3. **Add API functions**: `src/features/feature-name/api/itemApi.ts`
   ```typescript
   import apiClient from '@/shared/api/client';

   export const itemApi = {
     getItems: async () => {
       const response = await apiClient.get('/items');
       return response.data;
     },
   };
   ```

4. **Add endpoints** to `src/shared/api/endpoints.ts`:
   ```typescript
   ITEMS: {
     LIST: "/items",
     GET: (id: string) => `/items/${id}`,
   }
   ```

5. **Create React Query hooks**: `src/features/feature-name/hooks/useItems.ts`
   ```typescript
   import { useQuery } from '@tanstack/react-query';
   import { itemApi } from '../api/itemApi';

   export const itemKeys = {
     all: ['items'] as const,
     lists: () => [...itemKeys.all, 'list'] as const,
     detail: (id: string) => [...itemKeys.all, 'detail', id] as const,
   };

   export const useItemsList = () => {
     return useQuery({
       queryKey: itemKeys.lists(),
       queryFn: () => itemApi.getItems(),
     });
   };
   ```

6. **Optional: Add Zustand store** if global state needed: `src/features/feature-name/stores/itemStore.ts`

## TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` → `src/*`
- Target: ES2022
- Module resolution: bundler mode
- Unused locals/parameters checking enabled

## Important Notes

- **Environment Variables**: API base URL is configured via `VITE_API_BASE_URL` (defaults to `https://api.example.com`)
- **Token Management**: All token operations use `src/features/auth/utils/token.ts` utilities
- **Query Key Pattern**: Always use query key factories for type safety and easier invalidation
- **Error Handling**: API errors are handled centrally in `src/shared/api/utils.ts` via `handleApiError()`
- **Vite Override**: Project uses `rolldown-vite@7.1.14` instead of standard Vite
