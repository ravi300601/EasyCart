import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };
      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      toast.success("Signup Succesfully");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-sky-600 to-purple-600">
      {loading && <Loader />}
      <div className="bg-gray-900 px-10 py-12 rounded-2xl shadow-2xl w-96">
        <div className="text-center mb-6">
          <h1 className="text-3xl text-white font-extrabold">
            Create an Account
          </h1>
          <p className="text-gray-400">Join us today!</p>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={signup}
            className="bg-red-600 hover:bg-red-700 transition-colors duration-300 w-full text-white font-bold px-4 py-3 rounded-lg shadow-md ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              className="text-red-500 font-bold hover:underline"
              to={"/login"}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
