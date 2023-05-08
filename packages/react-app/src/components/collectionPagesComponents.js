import styled from 'styled-components';
import sea from "./../img/sea.png";

export const StyledCollection = styled.div`
    min-height: 100vh;
    width: 95%;
`;

export const Heading = styled.h1`
    font-family: 'Ice Pixel7', sans-serif;
    font-size: clamp(3rem, 5vw, 6vw);
    text-align: center;
    color: #f0a5ad;
    font-weight: 500;
    margin: 2.5rem 0 1.6rem 0;
    padding: 0;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: justify;
    width: 100%;
    margin: 20px 0;
    color: #e8f8f8;
    font-family: 'Minecraftia', sans-serif;
    font-size: clamp(1.25rem, 1.7vw, 3vw);
    a {
        color: #ffbbc2;
        text-decoration: none;
    }
`;

export const OpenSea = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const PokkoRoadmap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

export const DivTextImage = styled.div`
    display: flex;
    background-image: url(${sea});
    background-position: 50% 70%;
    width: 105.3%;
    height: 216px;
    margin-left: -2.7%;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 845px) {
        flex-direction: column;
    }
`;

export const DivTextTransparency = styled.div`
    display: flex;
    width: 105.3%;
    height: 210px;
    margin-left: -2.7%;
    margin-top: 1rem;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 2rem;
    background-color: #6c718c40;

    @media screen and (max-width: 1024px) {
      height: 180px;
    }
  
    @media screen and (max-width: 700px) {
      height: 150px;
    }
  
    @media screen and (max-width: 640px) {
      height: 130px;
    }
`;

export const DivImage = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center;
`;

export const NavigateMsg = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    color: #6c718c; 
    margin: 0 15px 20px 15px;
    font-weight: bold;
`;

export const Paragraph = styled.p`
    margin: 1rem 0;
`;

export const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const InsideItem = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media(max-width: 1080px) {
    font-size: 15px;
  }
  @media(max-width: 860px) {
    flex-direction: column;
  }
  @media(max-width: 620px) {
    font-size: 11px;
  }
`;

export const EnumItem = styled.li`
  text-align: left;
`;

export const Pokko = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  @media(max-width: 860px) {
    flex-direction: column;
  }
`;

export const CarrouselImage = styled.img`
  width: 21%; 
  height: auto; 
  margin: 0 2.5% 0 2.5%;
  pointer-events: none;
  @media(max-width: 860px) {
    width: 45%;
  }
`;

export const CarrouselText = styled.div`
  display: flex; 
  flex-direction: column; 
  margin-bottom: 1.3rem;
`