import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Routes, BrowserRouter, Route } from 'react-router'
import Entrance from './Entrance.tsx'
// import Error from './Error.tsx'
import Encoder from './Encoder.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Entrance />} />
            {/* should this jump to About? */}
            <Route path='/tool' element={<Encoder />} />
            <Route path='/about' element={<App />} />
            <Route path='/:props' element={<Entrance />} />
            <Route path='/:props/*' element={<Entrance />} />
            {/* <Route path='/*' element={<Error />} /> */}
            {/* Not found should be handled by Entrance after processing */}
        </Routes>
    </BrowserRouter>,
)
