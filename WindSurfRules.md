# GuardMate Project - WindSurf Development Rules

## 📋 Core Technology Stack

### Package Manager
- **Use `bun` instead of npm/yarn** for all package management
- Commands: `bun install`, `bun add`, `bun remove`, `bun run`

### Frontend Framework
- **Use Next.js 14+** with App Router for the web application
- Enable TypeScript strict mode
- Use Server Components by default, Client Components when needed

### Styling & Layout
- **Use Tailwind CSS** for all styling
- **Use CSS Grid for layout** (primary layout system)
- Use Flexbox as secondary layout tool
- Follow mobile-first responsive design

### State Management
- **Use Zustand** for global state management
- Create separate stores for different domains (auth, guards, deployments, etc.)
- Use immer middleware for complex state updates

### Database & ORM
- **Use Prisma** as the ORM
- **Use SQLite** for development and testing
- Use PostgreSQL for production (multi-tenant setup)
- Follow Prisma naming conventions

### Authentication
- **Use NextAuth.js (Auth.js)** for authentication
- Support multiple providers (credentials, phone, facial recognition)
- Implement proper session management
- Use JWT with refresh tokens

### Forms & Validation
- **Use React Hook Form** for all form handling
- **Use Zod** for schema validation
- Create reusable form components
- Implement proper error handling

### Media & Routing
- **Use Next/Image** for all image handling
- **Use Next/Router** (App Router) for navigation
- Implement proper image optimization
- Use dynamic imports for code splitting

## 📁 Project Structure

```
guardmate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth route group
│   │   ├── (dashboard)/       # Dashboard route group
│   │   ├── (admin)/           # Admin route group
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── guards/           # Guard-specific components
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # Auth configuration
│   │   ├── db.ts             # Database connection
│   │   ├── utils.ts          # Utility functions
│   │   └── validations.ts    # Zod schemas
│   ├── store/                # Zustand stores
│   │   ├── auth-store.ts     # Authentication store
│   │   ├── guard-store.ts    # Guard management store
│   │   └── deployment-store.ts # Deployment store
│   ├── types/                # TypeScript type definitions
│   └── hooks/                # Custom React hooks
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Database migrations
│   └── seed.ts              # Database seeding
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
└── package.json             # Dependencies
```

## 🎯 Development Guidelines

### Component Development
- Use functional components with hooks
- Implement Server Components when possible
- Follow atomic design principles (atoms, molecules, organisms)
- Create compound components for complex UI patterns

### State Management Patterns
```typescript
// Zustand store example
interface GuardStore {
  guards: Guard[]
  activeGuard: Guard | null
  setGuards: (guards: Guard[]) => void
  setActiveGuard: (guard: Guard) => void
  updateGuardStatus: (id: string, status: GuardStatus) => void
}

export const useGuardStore = create<GuardStore>((set) => ({
  guards: [],
  activeGuard: null,
  setGuards: (guards) => set({ guards }),
  setActiveGuard: (guard) => set({ activeGuard: guard }),
  updateGuardStatus: (id, status) =>
    set((state) => ({
      guards: state.guards.map((guard) =>
        guard.id === id ? { ...guard, status } : guard
      ),
    })),
}))
```

### Form Handling Patterns
```typescript
// React Hook Form with Zod validation
const guardSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
})

type GuardFormData = z.infer<typeof guardSchema>

const GuardForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<GuardFormData>({
    resolver: zodResolver(guardSchema),
  })

  const onSubmit = (data: GuardFormData) => {
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Form fields */}
    </form>
  )
}
```

### Database Schema Patterns
```prisma
// Multi-tenant schema with proper relationships
model Company {
  id        String   @id @default(cuid())
  name      String
  guards    Guard[]
  sites     Site[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Guard {
  id          String       @id @default(cuid())
  companyId   String
  company     Company      @relation(fields: [companyId], references: [id])
  checkIns    CheckIn[]
  incidents   Incident[]
  // ... other fields
}
```

## 🔐 Security & Authentication

### Authentication Flow
1. Use NextAuth.js for secure authentication
2. Implement multi-factor authentication (OTP + Facial Recognition)
3. Use secure session management
4. Implement proper role-based access control (RBAC)

### API Security
- Validate all inputs using Zod schemas
- Implement rate limiting
- Use CSRF protection
- Sanitize user inputs
- Implement proper error handling

## 📱 Mobile Integration

### PWA Configuration
- Configure Next.js as PWA
- Implement offline functionality
- Add app manifest for mobile installation
- Use service workers for caching

### Responsive Design
- Mobile-first approach using Tailwind
- Use CSS Grid for complex layouts
- Implement touch-friendly interfaces
- Optimize for various screen sizes

## 🚀 Performance Optimization

### Next.js Optimizations
- Use Server Components for static content
- Implement proper image optimization with Next/Image
- Use dynamic imports for code splitting
- Implement proper caching strategies

### Database Optimizations
- Use Prisma query optimization
- Implement proper indexing
- Use connection pooling
- Implement database query caching

## 🧪 Testing Strategy

### Testing Tools
- Use Vitest for unit testing
- Use Playwright for E2E testing
- Use React Testing Library for component testing
- Implement API testing with Supertest

### Testing Patterns
```typescript
// Component testing example
import { render, screen } from '@testing-library/react'
import { GuardCard } from './GuardCard'

test('renders guard information correctly', () => {
  const mockGuard = {
    id: '1',
    name: 'John Doe',
    status: 'ACTIVE',
  }

  render(<GuardCard guard={mockGuard} />)
  
  expect(screen.getByText('John Doe')).toBeInTheDocument()
  expect(screen.getByText('ACTIVE')).toBeInTheDocument()
})
```

## 📊 Data Management

### API Routes
- Use Next.js API routes for backend functionality
- Implement proper error handling
- Use middleware for authentication
- Follow RESTful conventions

### Real-time Updates
- Use WebSocket for real-time features
- Implement Server-Sent Events for notifications
- Use optimistic updates for better UX
- Implement proper conflict resolution

## 🎨 UI/UX Guidelines

### Design System
- Create consistent component library
- Use Tailwind design tokens
- Implement dark mode support
- Follow accessibility guidelines (WCAG 2.1)

### Layout Patterns
```css
/* Use CSS Grid for main layouts */
.dashboard-layout {
  @apply grid grid-cols-[250px_1fr] min-h-screen;
}

.guard-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4;
}

.form-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}
```

## 📝 Documentation Requirements

### Code Documentation
- Use JSDoc for function documentation
- Comment complex business logic
- Document API endpoints
- Maintain up-to-date README files

### Type Safety
- Use TypeScript strict mode
- Define proper interfaces and types
- Use Zod for runtime validation
- Implement proper error types

## 🔄 Development Workflow

### Git Workflow
- Use conventional commits
- Create feature branches
- Implement proper PR reviews
- Use semantic versioning

### TODO Management
- **Always reference TODO.md** for current tasks
- **Update TODO.md** after completing tasks
- Mark completed tasks with ✅
- Add new tasks as they arise
- Maintain task priorities and phases

### Code Quality
- Use ESLint with strict rules
- Use Prettier for code formatting
- Implement pre-commit hooks
- Use TypeScript strict mode

## 🚦 Deployment & Monitoring

### Environment Configuration
- Use environment variables for configuration
- Separate configs for dev/staging/prod
- Use proper secret management
- Implement feature flags

### Monitoring
- Implement error tracking (Sentry)
- Use analytics for user behavior
- Monitor performance metrics
- Implement health checks

## ⚡ Performance Benchmarks

### Target Metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s

### Bundle Size Targets
- Initial bundle: < 200KB gzipped
- Route-based code splitting
- Lazy load non-critical components
- Optimize images and assets

## 🔍 Code Review Checklist

### Before PR Submission
- [ ] Code follows TypeScript strict mode
- [ ] Components use proper Tailwind classes
- [ ] Forms use React Hook Form + Zod validation
- [ ] State management uses Zustand appropriately
- [ ] Database queries use Prisma properly
- [ ] Images use Next/Image component
- [ ] Navigation uses Next/Router
- [ ] TODO.md is updated with completed tasks
- [ ] Tests are written and passing
- [ ] Documentation is updated

### Security Checklist
- [ ] Input validation implemented
- [ ] Authentication checks in place
- [ ] RBAC properly implemented
- [ ] Sensitive data properly handled
- [ ] SQL injection prevention
- [ ] XSS prevention measures

---

**Remember: Always update the TODO.md file after completing any task. This ensures proper project tracking and team coordination.**