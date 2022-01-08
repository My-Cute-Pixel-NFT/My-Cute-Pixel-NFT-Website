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
    top: 8px;
    right: 8px;
    color: #6c718c;
    background: #e8f8f8;
    padding: .75rem;
    display: flex;
    place-items: center;
    font-size: 2rem;
    cursor: pointer;
    z-index: 98;
    height:60px;
`;

export default Toggle;