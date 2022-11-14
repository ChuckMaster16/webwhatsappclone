// 404.js
import Link from 'next/link'
import styled from 'styled-components'

export default function Custom404() {
  return <HostingError>
    <img
    src='404 Error Page not.png'
    width={400}
    height={400}
    alt={'Error Page not.png'}
    />

    <h1>404 - Sorry this page does not exsist</h1>
  </HostingError>
}

const HostingError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 justify-content: center;
 height: 100vh;
 
`;