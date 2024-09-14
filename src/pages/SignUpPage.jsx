import SignUp from "@/components/auth/SignUp";
import Character from "@/components/auth/Character";

function SignUpPage() {
    return (
        <>
            <div className="flex flex-col flex-wrap gap-y-4 px-4 md:px-16 lg:px-32">
                <SignUp />
                <Character />
            </div>
        </>
    );
}

export default SignUpPage;
