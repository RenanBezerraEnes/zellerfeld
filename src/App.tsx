import { HeroUIProvider } from '@heroui/react';
import './App.css';
import { OrdersDashboard } from './orders';

function App() {
  return (
    <HeroUIProvider>
      <main className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4">Zellerfeld</h1>
        <OrdersDashboard />
      </main>
    </HeroUIProvider>
  );
}

export default App;
