import React,{useState} from 'react'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth, db} from '../../firebase';
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from '../components/Message';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import firebase from 'firebase/compat/app';
import getRecipientEmail from '../../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';
import { useRef } from 'react';



function Chatscreen({chat, messages}) {
    
    

    const[user]= useAuthState(auth);
    const  [inputChat, setInputchat]=useState('');  //input state for the chats
    const EndOfMessagesRef = useRef(null)
    const router = useRouter('');
    const [messagesSnapshot] = useCollection(
        db
        .collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp', 'acs')
        );
        const [recipientSnapshot] = useCollection(
            db
            .collection('users')
            .where('email', '==', getRecipientEmail(chat.users, user))        
        );

    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                key={message.id}
                user={message.data().user}
                message={{...message.data(),
                timestamp: message.data().timestamp?.toDate().getTime(),
            }}
            />
            ));
        }else{
            return JSON.parse(messages).map((message) => (
                <Message
                key={message.id}
                user={message.user}
                message={message.message}
                />
            ));
        }
    };

    const ScrollBottom = () =>{
        EndOfMessagesRef.current.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})

    }

    const sendMessage = (i)=> {
        i.preventDefault();
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

        },{merge: true})
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: inputChat,
            user: user.email, 
            photoURL: user.photoURL,
        });
        setInputchat('');
        ScrollBottom();
    };

    const recipient = recipientSnapshot?.doc?.[0]?.data();
    
    const recipientEmail =  getRecipientEmail(chat.users, user);

    

  return (
    <Container>
        <Header>
            {
                recipient ? (
                    <Avatar src={recipient?.photoURL} alt={recipient.name} />
                ) : (
                    <Avatar>{recipientEmail[0]} </Avatar>
                )
            }
            
            <HeaderInfo>
                <h3>{recipientEmail}</h3>
                {recipientSnapshot ? (
                    <p>Last active: {" "} {recipient?.lastSeen?.toDate() ? (
                        <TimeAgo  datetime={recipient?.lastSeen?.toDate()}  locale='vi'/>
                    ):("Unavailable")}</p>
                ):(
                    <p>Loading Last active ...</p>
                )
                }
              
            </HeaderInfo>
            <HeaderIcons>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                  <MoreVertIcon/>
                </IconButton>                                
            </HeaderIcons>
        </Header>
            <MessageSpace>
                {showMessages()}                
                <EndOfMessages ref={EndOfMessagesRef}/>
            </MessageSpace>

            <InputContainer>
                <EmojiEmotionsIcon/>
                <Input value={inputChat} onChange={e=> setInputchat(e.target.value)}/>
                <button hidden disabled={!inputChat} type='submit' onClick={sendMessage}> send</button>
                <MicOutlinedIcon/>
            </InputContainer>
        

    </Container>
  )
}

export default Chatscreen

const Container = styled.div`
  
`
const Header = styled.div`
position: sticky;
background-color: white;
z-index: 20;
top: 0;
display: flex;
padding: 10px;
align-items:center;
border-bottom: 2px solid whitesmoke;

`;
const HeaderInfo = styled.div`
margin-left: 15px;
flex: 1;
>h3{
    margin-bottom: 3px;
}
>p{
    font-size: 14px;
    color: gray;
}
`;
const HeaderIcons = styled.div`
`;
const MessageSpace = styled.div`
padding:30px;
background-color: #000a03;
background-image: url(/black-thread-light.png);

min-height: 85vh;
`;
const EndOfMessages = styled.div`
`;
const InputContainer = styled.form`
    display: flex;
    align-items:center;
    padding: 10px;
    position: sticky;
    bottom:0;
    background-color: white;
    z-index: 20;
`;
const Input = styled.input`
flex: 1;
align-items: center;
padding: 10px;
position: sticky;
bottom:0;
background-color: whitesmoke;
border:none;
`