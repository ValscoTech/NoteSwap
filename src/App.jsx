import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, AccountPage, NotesPage, OfferNotesPage, RentNotesPage, BlogsPage, LoginPage, EditAccountPage, SignUpPage } from '@/pages';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { ThemeProvider } from '../src/pages/ThemeContext';
import { NoteProvider } from './components/common/NoteContext';
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";

function App() {
  return (
    <ThemeProvider>
      <div className='font-clash bg-black text-white min-h-screen'>
        <BrowserRouter>
          <NoteProvider>
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/offer" element={<OfferNotesPage />} />
              <Route path="/rent" element={<RentNotesPage />} />
              <Route path="/blog" element={<BlogsPage />} />
              <Route path="/edit-account" element={<EditAccountPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<div>404 Page Not Found</div>} />
            </Routes>
            <Footer />
          </NoteProvider>

          {/* Uncomment this block if using authentication */}
          {/* <SignedIn>
            <NoteProvider>
              <Navbar />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/offer" element={<OfferNotesPage />} />
                <Route path="/rent" element={<RentNotesPage />} />
                <Route path="/blog" element={<BlogsPage />} />
                <Route path="/edit-account" element={<EditAccountPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
              <Footer />
            </NoteProvider>
          </SignedIn> */}

          {/* <SignedOut>
            <main className='h-screen flex items-center justify-center'>
              <Routes>
                <Route path="/sign-up" element={<SignUp routing="hash" />} />
                <Route path="/sign-in" element={<SignIn routing="hash" />} />
              </Routes>
            </main>
          </SignedOut> */}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
