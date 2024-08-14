import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, AccountPage, NotesPage, OfferNotesPage, RentNotesPage, BlogsPage, LoginPage } from '@/pages'

function App() {
  return (
    <>
      <div className='font-clash bg-black text-white min-h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<><LoginPage /></>} />
            <Route path="/home" element={<><HomePage /></>} />
            <Route path="/account" element={<><AccountPage /></>} />
            <Route path="/notes" element={<><NotesPage /></>} />
            <Route path="/offer" element={<><OfferNotesPage /></>} />
            <Route path="/rent" element={<><RentNotesPage /></>} />
            <Route path="/blog" element={<><BlogsPage /></>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
