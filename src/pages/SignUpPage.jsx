
import SignUp from "@/components/auth/SignUp"
import Character from "@/components/auth/Character";
function SignUpPage(){
    return(
        <>
            <div className="flex flex-col flex-wrap gap-y-4">
                
                <SignUp/>
                <Character/>
                
            </div>
        </>)
}
export default SignUpPage;