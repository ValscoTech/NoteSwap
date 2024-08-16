import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SignUp from "@/components/auth/SignUp"
function SignUpPage(){
    return(
        <>
            <div className="flex flex-col flex-wrap gap-y-4">
                <Navbar/>
                <SignUp/>
                <Footer/>
            </div>
        </>)
}
export default SignUpPage;