import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, AccountPage, NotesPage, OfferNotesPage, RentNotesPage, BlogsPage, LoginPage, EditAccountPage,SignUpPage } from '@/pages';

import { SignedIn, SignedOut, SignInButton, UserButton, SignIn, SignUp } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <div className='font-clash bg-black text-white min-h-screen'>
        <SignedOut>
          <main className='h-screen flex items-center justify-center'>
            <BrowserRouter>
              <Routes>
                <Route path="/sign-up" element={<SignUp routing="hash" />} />
                <Route path="/sign-in" element={<SignIn routing="hash" />} />
              </Routes>
            </BrowserRouter>
          </main>
        </SignedOut>
        <SignedIn>
          <BrowserRouter>
            {/* <UserButton/> */}
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
          </BrowserRouter>
        </SignedIn>
      </div>
    </>
  );
}

export default App;
