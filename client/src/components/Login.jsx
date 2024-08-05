import { useState } from 'react'; // Import React hooks
import axios from "axios"; // Import Axios for HTTP requests
import { API_END_POINT } from '../utils/constant'; // Import API endpoint
import toast from "react-hot-toast"; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // Import navigate hook from React Router
import { useDispatch } from 'react-redux'; // Import dispatch hook from Redux
import { setUser, setLoading } from '../redux/userSlice'; // Import actions from userSlice
import { MdMovieCreation } from "react-icons/md"; // Import icon

const Login = ({ onLogin }) => {
    // Local state management using React hooks
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup mode
    const [fullName, setFullName] = useState(""); // State for full name input (used only in signup)
    const [email, setEmail] = useState(""); // State for email input
    const [password, setPassword] = useState(""); // State for password input
    const [isLoading, setLoadingState] = useState(false); // State to manage loading indicator

    const navigate = useNavigate(); // Hook to programmatically navigate
    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

    const getInputData = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        dispatch(setLoading(true)); // Set loading state in Redux store
        setLoadingState(true); // Set local loading state

        if (isLogin) { // Logic for login
            const user = { email, password }; // Create user object for login
            try {
                // Send login request to the server
                const res = await axios.post(`${API_END_POINT}/login`, user, {
                    headers: {
                        'Content-Type': 'application/json' // Set content type to JSON
                    },
                    withCredentials: true // Include credentials for cross-site requests
                });
                if (res.data.success) { // Check if login was successful
                    toast.success(res.data.message); // Show success notification
                    localStorage.setItem('token', res.data.token); // Store JWT token in local storage
                    dispatch(setUser(res.data.user)); // Update user state in Redux store
                    onLogin(); // Notify parent component about successful login
                    navigate('/home'); // Navigate to the home page
                }
            } catch (error) { // Handle errors
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message); // Show error message from server
                } else {
                    toast.error("An unexpected error occurred."); // Show generic error message
                }
                console.log(error); // Log error for debugging
            } finally {
                dispatch(setLoading(false)); // Reset loading state in Redux store
                setLoadingState(false); // Reset local loading state
            }
        } else { // Logic for registration
            const user = { fullName, email, password }; // Create user object for registration
            try {
                // Send registration request to the server
                const res = await axios.post(`${API_END_POINT}/register`, user, {
                    headers: {
                        'Content-Type': 'application/json' // Set content type to JSON
                    },
                    withCredentials: true // Include credentials for cross-site requests
                });
                if (res.data.success) { // Check if registration was successful
                    toast.success(res.data.message); // Show success notification
                    setIsLogin(true); // Switch to login mode after successful registration
                }
            } catch (error) { // Handle errors
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message); // Show error message from server
                } else {
                    toast.error("An unexpected error occurred."); // Show generic error message
                }
                console.log(error); // Log error for debugging
            } finally {
                dispatch(setLoading(false)); // Reset loading state in Redux store
                setLoadingState(false); // Reset local loading state
            }
        }

        // Reset form fields after submission
        setFullName("");
        setEmail("");
        setPassword("");
    }

    // Function to toggle between login and signup mode
    const toggleLoginMode = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div className="min-h-available bg-[#10141E] flex items-center justify-center">
            {/* App Icon at the top of the page */}
            <div className="absolute top-0 left-0 right-0 flex justify-center mt-8">
                <div className="w-12 h-12 mr-10 flex items-center justify-center">
                    <MdMovieCreation className="text-red-600 mx-auto" size={35}/>
                </div>
            </div>

            {/* Login/Signup form */}
            <div className="bg-[#1E2535] p-8 mt-8 rounded-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{isLogin ? "Login" : "Signup"}</h2>
                <form onSubmit={getInputData}>
                    {/* Fullname field (visible only in signup mode) */}
                    {!isLogin &&
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2" htmlFor="fullName">Fullname</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)} // Update state on input change
                                className="w-full px-3 py-2 bg-[#10141E] text-white border border-gray-700 rounded focus:outline-none focus:border-red-500"
                                autoComplete='username'
                                required
                            />
                        </div>
                    }
                    {/* Email field */}
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update state on input change
                            className="w-full px-3 py-2 bg-[#10141E] text-white border border-gray-700 rounded focus:outline-none focus:border-red-500"
                            autoComplete='email'
                            required
                        />
                    </div>
                    {/* Password field */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update state on input change
                            className="w-full px-3 py-2 bg-[#10141E] text-white border border-gray-700 rounded focus:outline-none focus:border-red-500"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {/* Submit button with loading indicator */}
                    <button
                        type="submit"
                        className={`w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-100 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading} // Disable button during loading
                    >
                        {isLoading ? "Loading..." : (isLogin ? "Login" : "Signup")}
                    </button>
                </form>
                {/* Toggle link to switch between login and signup */}
                <p className="text-center text-gray-400 mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={toggleLoginMode} className="text-red-500 hover:underline cursor-pointer ml-1">
                        {isLogin ? "Signup" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
