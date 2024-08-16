import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Login from "@/components/auth/Login";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col flex-wrap gap-y-4">
      <Navbar/>
      <Login/>
      <Footer/>
      </div>
    </>
  )
}