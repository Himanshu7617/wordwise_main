import { useContext, useEffect } from "react";
import { Card, Input,  Button,  Typography } from "@material-tailwind/react";
import { wordwiseContext } from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";

 
const SignUp = () => {

  //using the context api here
  const wordwiseCtxt = useContext(wordwiseContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if(wordwiseCtxt.name === '' || wordwiseCtxt.email === '' || wordwiseCtxt.password === ''){
      alert("Please fill all the fields");
      return;
    }
    
    
   
    const success = wordwiseCtxt.signUpUser( wordwiseCtxt.name , wordwiseCtxt.email, wordwiseCtxt.password);
    if(!success){
      // wordwiseCtxt.addUserIntoDatabase(wordwiseCtxt.name, wordwiseCtxt.email, "German", wordwiseCtxt.avatarIndex);
      navigate('/home');
    }
    //navigate('/dashboard');
    wordwiseCtxt.setEmail('');
    wordwiseCtxt.setName('');
    wordwiseCtxt.setPassword('');
    //
    
  
  }

  
  useEffect(() => {
    if(wordwiseCtxt.isLoggedIn){
      navigate('/dashboard');
    }
  },[wordwiseCtxt, navigate])

  return (
    <div className=" w-full h-[100vh] flex justify-center items-center">
     <Card color="transparent" shadow={false}>
      <Typography  variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={wordwiseCtxt.name}
            onChange= {(e) => wordwiseCtxt.setName(e.target.value)}
          />
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
            value={wordwiseCtxt.email}
            onChange={(e) => wordwiseCtxt.setEmail(e.target.value)}
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
            value={wordwiseCtxt.password}
            onChange={(e) => wordwiseCtxt.setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleSignUp} className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <p className="font-medium text-gray-900">
          <Link to={'/login'}>Sign In</Link>
          
          </p>
        </Typography>
      </form>
    </Card>
    </div>
  );
}

export default SignUp;