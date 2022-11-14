import React from 'react'
import styled from 'styled-components';
import { Avatar} from '@mui/material';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {useRouter} from 'next/router';



function Chat({id, users}) {
  const router = useRouter();
  const [user]= useAuthState(auth)
  //get the users image from login 
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)));
  
  const enterTheChat = (e) => {
    e.preventDefault();
    router.push(`/chat/${id}`);
  }
  
  const recipientEmail = getRecipientEmail(users, user);
  //console.log(recipientEmail);
  const recipient = recipientSnapshot?.docs[0]?.data();
  
  return (
    <Container onClick={enterTheChat} >
      {recipient ? (
        <Avatar src={recipient?.photoURL} />
      ): (
        <UserAvatar> {recipientEmail[0]} </UserAvatar>
      )}
      
        <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15;
word-break: break-word;
:hover{
  background-color: #e9eaeb;
}
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;