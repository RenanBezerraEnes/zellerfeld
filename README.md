# Zellerfeld

Following SOLID, DRY principles and best practices.

## Architecture

The project follows a clean, modular architecture with clear separation of concerns:

src/
├── components/
│ └── table/
│ ├── FilterColumnsMenu/ # Filter dropdown components
│ └── OrdersRow/ # Table row components
├── orders/
│ ├── index.tsx # Main order component
│ ├── types.ts # TypeScript types and constants
│ └── useOrders.ts # Custom hook for business logic
├── utils/
│ ├── filterHelpers.ts # Filter utility functions
│ └── orderSort.ts # Sorting utility functions
├── styles/
│ └── buttonStyles.ts # Shared button style
└── DB/
└── db.data.ts # Mock data

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

- **React** – UI library
- **TypeScript** – Type safety
- **Tailwind CSS** – Utility-first CSS framework
- **Hero UI** – Component library
- **Lucide React** – Icon library
- **Vite** – Fast build and dev server
- **Jest** – Unit testing framework
- **Testing Library** – React hooks/component testing (`@testing-library/react`)
- **JSDOM** – Simulated DOM environment for tests
- **ts-jest** – TypeScript support for Jest
- **ESLint & Prettier** – Code quality and formatting

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

## Test

1. Tests:

   ```bash
   npm run test
   ```

2. Run tests in watch mode:

   ```bash
   npm run test:watch
   ```

🖱️ Table Interaction Instructions
Click the arrow to sort by each column header.

Click the filter options under each header (th) to add a filter.

Under OID, you can select all filters or clear all filters.

Under the other headers, you can also select all filters from that column or clear all filters as well.
