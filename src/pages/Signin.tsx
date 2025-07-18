import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface ValidationError {
    path: string[];
    message: string;
}

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [generalError, setGeneralError] = useState<string>("");

    async function signin() {
        setLoading(true);
        setErrors([]);
        setGeneralError("");

        try {
            const username = usernameRef.current?.value?.trim();
            const password = passwordRef.current?.value?.trim();

            if (!username || !password) {
                setGeneralError("Please fill in all fields");
                setLoading(false);
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const jwt = response.data.token;

            // Ensure token is stored properly
            if (jwt) {
                localStorage.setItem("token", jwt);
                console.log("Token stored successfully"); // Debug log
                navigate("/dashboard");
            } else {
                setGeneralError("Invalid response from server");
            }
        } catch (error: any) {
            console.error("Signin error:", error);
            setLoading(false);

            if (error.response?.data?.errors) {
                // Zod validation errors
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                // Other errors (like invalid credentials)
                setGeneralError(error.response.data.message);
            } else if (error.response?.status === 401) {
                setGeneralError("Invalid username or password");
            } else if (error.response?.status === 500) {
                setGeneralError("Server error. Please try again later.");
            } else {
                setGeneralError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loading) {
            signin();
        }
    };

    const getUsernameError = () => {
        return errors.find(error => error.path.includes('username'))?.message;
    };

    const getPasswordError = () => {
        return errors.find(error => error.path.includes('password'))?.message;
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-700 via-purple-500 via-pink-500 to-purple-300 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl w-full max-w-md mx-auto p-6 md:p-8 shadow-2xl">
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">BrainLink</h1>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-600">Sign In</h2>
                </div>

                {generalError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm md:text-base">
                        {generalError}
                    </div>
                )}

                <div className="space-y-4 mb-6">
                    <div>
                        <Input
                            reference={usernameRef}
                            placeholder="Username"
                            onKeyDown={handleKeyPress}
                        />
                        {getUsernameError() && (
                            <p className="text-red-500 text-sm mt-1">{getUsernameError()}</p>
                        )}
                    </div>

                    <div>
                        <Input
                            reference={passwordRef}
                            placeholder="Password"
                            type="password"
                            onKeyDown={handleKeyPress}
                        />
                        {getPasswordError() && (
                            <p className="text-red-500 text-sm mt-1">{getPasswordError()}</p>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <Button
                        onClick={signin}
                        loading={loading}
                        variant="primary"
                        text={loading ? "Signing in..." : "Sign In"}
                        fullWidth={true}
                        disabled={loading}
                    />
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}


