import { useState } from "react";
import bgImage from "../assets/repair-bg.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center
                 bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* White Card */}
      <div
        className="w-full max-w-md rounded-xl shadow-lg
                   bg-fixhub-bgWhite/80 backdrop-blur-md
                   border border-white/30
                   p-10 min-h-[350px] font-poppins"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-fixhub-textDark">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-4">
          {/* SIGN UP FIELDS */}
          {!isLogin && (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 px-4 py-2 border rounded-md
                             focus:outline-none
                             focus:ring-2 focus:ring-fixhub-primary"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 px-4 py-2 border rounded-md
                             focus:outline-none
                             focus:ring-2 focus:ring-fixhub-primary"
                />
              </div>

              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full px-4 py-2 border rounded-md
                           focus:outline-none
                           focus:ring-2 focus:ring-fixhub-primary"
              />
            </>
          )}

          {/* COMMON FIELDS */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md
                       focus:outline-none
                       focus:ring-2 focus:ring-fixhub-primary"
          />

          <input
            type="password"
            placeholder={isLogin ? "Password" : "Create Password"}
            className="w-full px-4 py-2 border rounded-md
                       focus:outline-none
                       focus:ring-2 focus:ring-fixhub-primary"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md
                         focus:outline-none
                         focus:ring-2 focus:ring-fixhub-primary"
            />
          )}

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-fixhub-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-fixhub-primary
                       hover:bg-fixhub-dark
                       text-white py-2 rounded-md
                       font-semibold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-sm text-fixhub-textMuted mt-6">
          {isLogin ? "Do not have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-fixhub-primary font-semibold ml-1 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
