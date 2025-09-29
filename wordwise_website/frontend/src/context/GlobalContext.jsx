import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

export const wordwiseContext = createContext();





const GlobalContext = (props) => {
    const websiteBackendURL = "https://backend.gghimanshu333.workers.dev";

    //user's info initialization
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [allWords, setAllWords] = useState([]);
    const [userID, setUserID] = useState('');
    const [gotData, setGotData] = useState(false);
    const newWords = [];

    //navigation
    const navigate = useNavigate();

    //getting t database instance 
    // wordsDB = getFirestore(app);

    //creating a user in the database
    const signUpUser = async (name, email, password) => {
        try {
            const response = await fetch(`${websiteBackendURL}/auth/signup`, {
                method: "POST",
                body: JSON.stringify({ name, email, password })
            });
            if (response.ok) {
                const res = await response.json();
                localStorage.setItem("wordwiseToken", `Bearer ${res.token}`);

                const userData = await bcrypt.hash(res.user);
                localStorage.setItem("wordwiseUser", userData);
                return true;
            } else {
                console.log(response);
                alert(response.message || "Error signing up. Please try again.");
                return false;
            }

        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    const signInUser = async (email, password) => {
        try {
            const response = await fetch(`${websiteBackendURL}/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const res = await response.json();
                localStorage.setItem("wordwiseToken", `Bearer ${res.token}`);

                
                setUser(() => {
                    const userData = { name: res.user.name, email: res.user.email, id: res.user.id }
                    console.log("user data after login", userData);
                    return userData;
                });
                setIsLoggedIn(true);
                const userData = await bcrypt.hash(res.user,10);//  yeh yahan pe error hai 

                localStorage.setItem("wordwiseUser", userData);
                return true;
            } else {
                alert(response.message || "Error logging in. Please try again.");
                return false;
            }
        } catch (error) {
            setIsLoggedIn(false);
            console.error(error);
            return false;
        }
    }



    // //checking where the user has logged in b4 or not
    useEffect(() => {
        const token = localStorage.getItem("wordwiseToken");
        if (token) {
            setIsLoggedIn(true);
            getAllWords();
            setGotData(true);

        } else {
            setIsLoggedIn(false);
           
        }
    }, [isLoggedIn])




    useEffect(() => {
        console.log("user changed", user);
        if (!gotData && user) {
            getAllWords();
            setGotData(true);


        }
    }, [user])


    const logOut = () => {
        localStorage.removeItem("wordwiseToken");
        localStorage.removeItem("wordwiseUser");
        setIsLoggedIn(false);
        setUser(null);
        setAllWords([]);
        newWords.splice(0, newWords.length);
        navigate('/');
    }


    const getAllWords = async () => {
        try {
            const response = await fetch(`${websiteBackendURL}/wordlist/allwords`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("wordwiseToken")
                }
            });
            if (response.ok) {
                const data = await response.json();
                setAllWords(data.words);
                console.log(data.words);
            }
        } catch (error) {
            console.error("error getting all the words ", error);
        }
    }


    return (
        <wordwiseContext.Provider value={{ signUpUser, name, setName, email, setEmail, password, setPassword, isLoggedIn, user, allWords, setAllWords, userID, setUserID, avatarIndex, setAvatarIndex, logOut, signInUser, getAllWords }}>
            {props.children}
        </wordwiseContext.Provider>
    )
}

export default GlobalContext

