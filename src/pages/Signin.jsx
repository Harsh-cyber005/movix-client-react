import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { Card, CardContent } from '../components/ui/card'; // Update paths if needed
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Button } from '../components/ui/button';

const LOGIN_URL = "/user/signin";

function Signin() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ name: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const { access_token, email, plan, favourites, recentSearches } = response.data;
      if (access_token) {
        setAuth({ user, pwd, access_token, email, plan, favourites, recentSearches });
      }
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No response from server');
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid username or password');
      } else if (err.response?.status === 401) {
        setErrMsg('Invalid username or password');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handleCheckboxChange = () => {
    setPersist(!persist);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 font-semibold bg-black flex justify-center items-center min-h-screen">
      <div className="container px-6 mx-auto">
        <div className="space-y-4 text-center text-white">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sign In</h1>
        </div>
        <div className="mt-12 flex justify-center">
          <Card className="w-full text-white max-w-md bg-white shadow-lg rounded-lg">
            <CardContent className="space-y-4 p-6">
              <p ref={errRef} className="text-red-500">{errMsg}</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-primary">Username:</Label>
                  <Input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    required
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    className="border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-primary">Password:</Label>
                  <Input
                    type="password"
                    id="password"
                    value={pwd}
                    required
                    onChange={(e) => setPwd(e.target.value)}
                    className="border-primary focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="persist"
                      onClick={handleCheckboxChange}
                      checked={persist}
                      className="text-primary"
                    />
                    <Label htmlFor="persist" className="text-primary">Trust this device</Label>
                  </div>
                  <Link to="/signup" className="text-sm text-primary hover:underline">Sign Up</Link>
                </div>
                <Button
                  type="submit"
                  variant="link"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Signin;
