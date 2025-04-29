import { useContext, useEffect, useState } from 'react';
import { Card, Input, Button, Typography, } from "@material-tailwind/react";
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate,Link } from 'react-router-dom';
   
const Login = () => {

    const firebase = useContext(useFirebase);
    const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        firebase.signInUser(firebase.email, firebase.password);
    }

    const handleResetPasswordRequest = (e) => {

      e.preventDefault();
    

      firebase.resetUserPassword();
      setPasswordResetEmailSent(true);
    }

    useEffect(() => {
        if( firebase.isLoggedIn ) { 
            navigate('/dashboard');
        }
    }, [firebase, navigate])
  

    if(passwordResetEmailSent){

      return (
        <div className='w-full h-[100vh] flex justify-center flex-col items-center text-2xl '>
          <p>Resent password email has been sent to {firebase.email}</p>
          <p>please login after reseting the password</p>
        </div>
      );
    }else{

      return (
        <div className=" w-full h-[100vh] flex justify-center items-center">
    
       
         <Card color="transparent" shadow={false}>
          <Typography className=" flex justify-center underline"  variant="h4" color="blue-gray">
            Login Up
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={firebase.email}
                onChange={(e) => firebase.setEmail(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value = { firebase.password }
                onChange = {(e) => firebase.setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleLogin} type='submit' className="mt-6" fullWidth>
              sign in
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don&apos;t have an account?{" "}
              <p className=" font-medium text-gray-900">
                        <Link to={'/signup'}>Sign Up</Link>
                        
                        </p>
            </Typography>
            <Typography color="gray" className="mt-4 text-center font-normal">
              {" "}
              <a onClick={handleResetPasswordRequest} className="font-medium cursor-pointer text-gray-900">
                Forgot password?
              </a>
            </Typography>
          </form>
        </Card>
        </div>
      );
    }

  }



export default Login;