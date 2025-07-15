import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ValidationError {
    path: string[];
    message: string;
}

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [generalError, setGeneralError] = useState<string>("");

    async function signup() {
        setLoading(true);
        setErrors([]);
        setGeneralError("");

        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                setGeneralError("Please fill in all fields");
                setLoading(false);
                return;
            }

            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });

            navigate("/signin");
            alert("You have signed up successfully!");
        } catch (error: any) {
            setLoading(false);

            if (error.response?.data?.errors) {
                // Zod validation errors
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                // Other errors (like duplicate username)
                setGeneralError(error.response.data.message);
            } else {
                setGeneralError("An unexpected error occurred. Please try again.");
            }
        }
    }

    const getUsernameError = () => {
        return errors.find(error => error.path.includes('username'))?.message;
    };

    const getPasswordError = () => {
        return errors.find(error => error.path.includes('password'))?.message;
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-700 via-purple-500 via-pink-500 to-purple-300 flex justify-center items-center">
            <div className="bg-white rounded-xl min-w-96 max-w-md p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">BrainLink</h1>
                    <h2 className="text-xl font-semibold text-gray-600">Sign In</h2>
                </div>

                {generalError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {generalError}
                    </div>
                )}

                <div className=" pl-12 justify-center mb-4">
                    <Input reference={usernameRef} placeholder="Username" />
                    {getUsernameError() && (
                        <p className="text-red-500 text-sm mt-1">{getUsernameError()}</p>
                    )}
                </div>

                <div className="pl-12 justify-center mb-4">
                    <Input reference={passwordRef} placeholder="Password" type="password" />
                    {getPasswordError() && (
                        <p className="text-red-500 text-sm mt-1">{getPasswordError()}</p>
                    )}
                </div>

                <div className="flex justify-center pt-4">
                    <Button
                        onClick={signup}
                        loading={loading}
                        variant="primary"
                        text="Sign Up"
                        fullWidth={true}
                    />
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/signin")}
                            className="text-purple-600 hover:text-purple-800 font-medium"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}





