import { useState } from "react";

import {auth} from "../firebase"
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input, Switcher, Title, Wrapper,Error,Form } from "../components/auth-components";

export default function Login () {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target:{name, value} } = e;
        if(name === 'email') setEmail(value);
        if( name === 'password') setPassword(value);
    };

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        if(isLoading &&  email === '' || password === '') return
        try {
                setLoading(true)
                await signInWithEmailAndPassword( auth, email,password)
                navigate('/')
        } catch (e){
            if(e instanceof FirebaseError) {
                setError(e.message)
            }
            //console.log(e)

        } finally {
            setLoading(false);
        }
    }
    
    
    return(
        <Wrapper>
            <Title>Log in</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required/>
                <Input onChange={onChange} name="password" value={password} placeholder="PassWord" type="password" required/>
                <Input type="submit" value={isLoading ? "Loading..." : "Log in"}/>
            </Form>
            {error !== '' ? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an account ?{" "} <Link to="/create-account"> Create one &rarr;</Link>
            </Switcher>
        </Wrapper>
    )
}