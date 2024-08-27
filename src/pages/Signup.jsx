import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { Card, CardContent } from '../components/ui/card'; // Update paths if needed
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGISTER_URL = "/user/signup";

function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [isValidMatchPwd, setIsValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setIsValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setIsValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = pwd.length >= 5 && pwd.length <= 24;
    setIsValidPwd(result);
    const match = pwd === matchPwd;
    setIsValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = pwd.length >= 5 && pwd.length <= 24;
    if (!v1 || !v2) {
      setErrMsg("Invalid entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ name: user, password: pwd, email: email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="w-full py-12 md:py-24 lg:py-20 font-semibold bg-black flex flex-col justify-center items-center min-h-screen text-white">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-10">Sign Up</h1>
      {success ? (
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg text-center">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold">Success!</h1>
            <p className="mt-2">Your account has been created.</p>
            <Link to="/signin" className="text-primary hover:underline mt-4 block">Login</Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
          <CardContent className="p-6">
            <p ref={errRef} className="text-red-500 text-center">{errMsg}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-primary">Username:</Label>
                <Input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="text-black border-primary focus:ring-primary"
                />
                {userFocus && !isValidName && <p className="text-red-500">4-24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="text-black border-primary focus:ring-primary"
                />
                {emailFocus && !isValidEmail && <p className="text-red-500">Invalid email address.</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="text-black border-primary focus:ring-primary"
                />
                {pwdFocus && !isValidPwd && <p className="text-red-500">Password must contain 5-24 characters.</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="match-password" className="text-primary">Confirm Password:</Label>
                <Input
                  type="password"
                  id="match-password"
                  autoComplete="off"
                  required
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  onFocus={() => setMatchPwdFocus(true)}
                  onBlur={() => setMatchPwdFocus(false)}
                  className="text-black border-primary focus:ring-primary"
                />
                {matchPwdFocus && !isValidMatchPwd && <p className="text-red-500">Passwords must match.</p>}
              </div>

              <Button
                type="submit"
                variant="link"
                disabled={!isValidName || !isValidPwd || !isValidMatchPwd}
                className={`w-full mt-4 ${!isValidName || !isValidPwd || !isValidMatchPwd ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"} text-primary-foreground`}
              >
                Sign-Up
              </Button>
            </form>
            <p className="mt-4 text-center text-black">
              Already have an account?&nbsp;
              <Link to="/signin" className="text-primary hover:underline">Sign In</Link>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Signup;
