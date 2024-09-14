import Login from "@/components/auth/Login";
import Character from "@/components/auth/Character";

export default function LoginPage() {
    return (
        <>
            <div className="flex flex-col flex-wrap gap-y-4 px-4 md:px-16 lg:px-32">
                <Login />
                <Character />
            </div>
        </>
    );
}
