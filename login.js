import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { auth, provider } from './firebase'

function Login() {
  const signIn = ()=>{
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>
        <LoginContainer>
            <Logo
            src="https://res.cloudinary.com/chuckmaster/image/upload/v1667902139/myportfolio_img/favicon_xsd7f9.png"
                alt="logo"                
            />
            <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;

`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius: 10px;
 box-shadow: 0 4px 14px -3px rgba(0,0,0,0.7);

`;
const Logo = styled.img`
width: 200px;
height: 200px;
object-fit: contain;
box-shadow: 20px;
margin-bottom: 50px;

`;

const Button = styled.button`
  display: inline-block;
`