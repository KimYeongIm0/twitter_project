import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

import {auth} from "../firebase"
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Input, Switcher, Title, Wrapper,Error,Form } from "../components/auth-components";


export default function CreateAccount () {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target:{name, value} } = e;
        if(name === 'name') setName(value);
        if(name === 'email') setEmail(value);
        if( name === 'password') setPassword(value);
    };

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")
        if(isLoading && name === '' || email === '' || password === '') return
        try {
                setLoading(true)
                const credentails = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(credentails.user, {
                    displayName:name
                });
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
            <Title>Join x</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required/>
                <Input onChange={onChange} name="password" value={password} placeholder="PassWord" type="password" required/>
                <Input type="submit" value={isLoading ? "Loading..." : "Create Account"}/>
            </Form>
            {error !== '' ? <Error>{error}</Error> : null}
            <Switcher>
               Already have an account ?{" "} <Link to="/login">Log in&rarr;</Link>
            </Switcher>
        </Wrapper>
    )
}