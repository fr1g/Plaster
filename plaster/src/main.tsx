import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Routes, BrowserRouter, Route } from 'react-router'
import Entrance from './Entrance.tsx'
import Error from './Error.tsx'
import Encoder from './Encoder.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path='/tool' element={<Encoder />} />
            <Route path='/app/:props' element={<Entrance />} />
            <Route path='/app/:props/*' element={<Entrance />} />
            <Route path='/*' element={<Error />} />
        </Routes>
    </BrowserRouter>,
)
