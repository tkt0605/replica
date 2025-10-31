import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from '../pages/Home.jsx'
import About from '../pages/About.jsx'
import Library from '../pages/Library.jsx'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/library' element={<Library />}/>
            </Routes>
        </BrowserRouter>
    )
}