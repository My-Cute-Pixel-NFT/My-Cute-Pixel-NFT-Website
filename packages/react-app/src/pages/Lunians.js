import React from 'react';
import styled from 'styled-components';

const Lunas = () => {
    return (
        <StyledLunas>
            <Heading>Lunians!</Heading>
            <Content>
            <h1>👋 Hey there </h1>
            <p>Like what you see?</p>
            </Content>
        </StyledLunas>
    )
}

const StyledLunas = styled.div`
    min-height: 100vh;
    width: 100vw;
    background-color: #282c34;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Heading = styled.h1`
    text-align: center;
    font-family: 'Minecraftia', sans-serif;
    font-size: clamp(3rem, 5vw, 7vw);
    color: #ffbbc2;
    font-weight: 500;
    margin: 0;
    padding: 0;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
`;

const Content = styled.div`
    margin: 20 0;
    color: #ffbbc2;
    font-family: 'Minecraftia', sans-serif;
    font-size: clamp(1.5rem, 2vw, 4vw);
    a {
        color: #e8f8f8;
        text-decoration: none;
    }
`;

export default Lunas