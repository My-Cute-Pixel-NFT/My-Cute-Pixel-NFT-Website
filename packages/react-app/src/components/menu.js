import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FaRegStar } from 'react-icons/fa';

const Menu = ({style, handleNavToggle, handleButColorEnter, handleButColorLeave}) => {
    if (style.color === "#6c718c") style.color = "#e8f8f8";
    return (
        <StyledMenu>
            <StyledLink onClick={handleNavToggle} to="/">
                Home
            </StyledLink>
            <StyledLink onClick={handleNavToggle} to="/Lunians">
                Lunians
            </StyledLink>
            <StyledLink onClick={handleNavToggle} to="/TheMoeGirls">
                The Moe Girls
            </StyledLink>
            <StyledLink onClick={handleNavToggle} to="/PixelCryptoPuppies">
                Pixel Crypto Puppies
            </StyledLink>
            <StyledLink onClick={handleNavToggle} to="/Commissions">
                Commissions
            </StyledLink>
            <CloseToggle style={style} onClick={handleNavToggle} onMouseEnter={handleButColorEnter} 
            onMouseLeave={handleButColorLeave}>
                <FaRegStar />
            </CloseToggle>
        </StyledMenu>
    )
};

const StyledMenu = styled.div`
    position: fixed;
    border: none;
    border-radius: 20px 0px 0px 20px;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    @media screen and (min-width: 790px) {
        width: 50%;
    }
    @media screen and (min-width: 1040px) {
        width: 37%;
    }
    @media screen and (min-width: 1150px) {
        width: 33%;
    }
    background-color: #e8f8f8;
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    color: #c5d7e0;
    text-decoration: none;
    text-align: center;
    font-size: clamp(3rem, 4vw, 6vw);
    font-family: 'Ice Pixel7', sans-serif;
    transition: .2s all ease-in-out;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
    &:hover {
        transition: .2s all ease-in-out;
        color: #6c718c;
    }
`;

/*const Label = styled.div`
    color: #c5d7e0;
    text-decoration: none;
    font-size: clamp(2rem, 3vw, 5vw);
    font-family: 'Ice Pixel7', sans-serif;
    transition: .2s all ease-in-out;
    user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
    &:hover {
        transition: .2s all ease-in-out;
        color: #6c718c;
    }
`;*/

const CloseToggle = styled.button`
    position: fixed;
    top: 8px;
    right: 8px;
    background: #6c718c;
    color: #e8f8f8;
    padding: .75rem;
    display: flex;
    place-items: center;
    font-size: 2rem;
    cursor: pointer;
`;

export default Menu;