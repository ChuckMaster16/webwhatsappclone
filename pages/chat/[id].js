import Head from 'next/head';
import React from 'react'
import styled from 'styled-components'
import Chatscreen from '../components/Chatscreen';
import Sidebar from '../components/Sidebar';
import {auth, db} from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';


function Chat({chat, messages}) {
    console.log(chat);
    console.log(messages);
    const[user] = useAuthState(auth);
  return (
    <Container>
        <Head>
            <title> Chat with {getRecipientEmail(chat.users, user)}</title>
        </Head>
        <Sidebar/>
        <ChatContainer>
            <Chatscreen chat={chat} messages={messages}/>
        </ChatContainer>
    </Container>
  )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);

    //prep the messages on the server side
    const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();
    const messages = messagesRes.docs
    .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp,
    }))
    .map((messages) => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }));

    //prep the chats in the server
    const chatsRes = await ref.get();
    const chat = {
        id: chatsRes.id,
        ...chatsRes.data()
    };
//console.log(chat, messages);
    return {
        props: {
            messages: JSON.stringify(messages),
            chat:chat,

        }

    }
    
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100%;
  ::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none; /*IE AND EDGE*/
  scrollbar-width: none;/*Firebase*/
  
`;