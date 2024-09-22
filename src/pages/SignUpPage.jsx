import SignUp from "@/components/auth/SignUp";
import Character from "@/components/auth/Character";
import { useContext } from "react";
import "../styles/ThemeContext.css";
import { ThemeContext } from './ThemeContext';

function SignUpPage() {
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <div className={theme}>
                <div className="flex flex-col flex-wrap gap-y-4 px-4 md:px-16 lg:px-32">
                    <SignUp />
                    <Character />
                </div>
            </div>
        </>
    );
}

export default SignUpPage;
