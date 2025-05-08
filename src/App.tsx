import { HeroUIProvider } from '@heroui/react';
import './App.css';
import { OrdersDashboard } from './Pages/Orders';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <main className="min-h-screen bg-gray-50 p-4">
          <h1 className="text-2xl font-bold mb-4">Zellerfeld</h1>
          <Routes>
            <Route path="/" element={<OrdersDashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
