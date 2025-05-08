# Zellerfeld

Following SOLID, DRY principles and best practices.

## Architecture

The project follows a clean, modular architecture with clear separation of concerns:

```
src/
├── components/
│   └── table/
│       ├── filterColumnsMenu/    # Filter dropdown components
│       └── ordersRow/           # Table row components
├── orders/
│   ├── index.tsx               # Main order component
│   ├── types.ts               # TypeScript types and constants
│   └── useOrders.ts           # Custom hook for business logic
├── utils/
│   ├── filterHelpers.ts       # Filter utility functions
│   └── orderSort.ts           # Sorting utility functions
└── DB/
    └── db.data.ts            # Mock data
```

## 🎯 SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

- Each component has a single responsibility
- Business logic is separated from UI components
- Utility functions are grouped by purpose

- Filter and sort logic is abstracted into reusable utilities
- Constants are used instead of magic strings

### 2. Interface Segregation

- Components receive only the props they need
- Clear type definitions for all interfaces

### 3. Dependency Inversion

- Business logic is abstracted into custom hooks

## 🛠️ Technologies

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Hero UI** - Component library
- **Vite** - Build tool

## 🎨 UI/UX Features

- Responsive table design
- Expandable rows
- Dynamic filters
- Sortable columns
- Clean, modern interface

## 📝 Code Style

- ESLint for code linting
- Prettier for code formatting
- Consistent component structure
- Clear naming conventions

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
