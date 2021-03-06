import React from 'react';
import Tada from 'react-reveal/Tada';
import styled from 'styled-components';

import { FaRegHeart } from 'react-icons/fa';

const Toggle = ({style, handleNavToggle, handleButColorEnter, handleButColorLeave}) => {
    return (
            <StyledToggle style={style} onClick={handleNavToggle} onMouseEnter={handleButColorEnter} 
            onMouseLeave={handleButColorLeave}>
                <Tada>
                    <FaRegHeart style={{"marginTop":"-10px"}}/>
                </Tada>
            </StyledToggle>
    )
};

const StyledToggle = styled.button`
    position: fixed;
    top: 6px;
    right: 6px;
    color: #6c718c;
    background: #e8f8f8;
    padding: .75rem;
    display: flex;
    place-items: center;
    font-size: 2rem;
    z-index: 98;
    height:60px;

    @media(max-width: 350px) {
        top: 4rem;
    }
`;

export default Toggle;