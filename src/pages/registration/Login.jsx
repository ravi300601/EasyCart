import { Link } from 'react-router-dom'

function Login() {
   
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-sky-600 to-purple-600">
            <div className="bg-gray-900 px-10 py-10 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl text-white font-extrabold mb-6">Welcome Back</h1>
                    <p className="text-gray-400 mb-6">Login to your account</p>
                </div>
                <div className="mb-4">
                    <input 
                        type="email"
                        name="email"
                        className="bg-gray-800 px-4 py-3 w-full lg:w-[20em] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="bg-gray-800 px-4 py-3 w-full lg:w-[20em] rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                        placeholder="Password"
                    />
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div className="text-gray-400">
                        <input type="checkbox" id="remember" className="mr-2"/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <div>
                        <a href="#" className="text-yellow-500 font-bold hover:underline">Forgot Password?</a>
                    </div>
                </div>
                <div className="flex justify-center mb-4">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 w-full text-black font-bold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <h2 className="text-gray-400">Don't have an account? <Link className="text-yellow-500 font-bold hover:underline" to={'/signup'}>Sign up</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login
