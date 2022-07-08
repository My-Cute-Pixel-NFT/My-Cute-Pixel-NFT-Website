import styled from "styled-components";

import header from "./../img/TitleGifBlanco.gif";

export const Header = styled.header`
  font-family: 'Minecraftia', sans-serif;
  background-image: url(${header});
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 845px) {
    flex-direction: row;
  }
  align-items: flex-start;
  justify-content: flex-start;
  color: white;
`;

export const Body = styled.div`
  font-family: 'Minecraftia', sans-serif;
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: calc(100vh - 280px);
`;

export const Footer = styled.footer`
  font-family: 'Minecraftia', sans-serif;
  align-items: center;
  color: white;
  display: flex;
  flex-direction: row;
  font-size: calc(30px + 2vmin);
  justify-content: center;
  min-height: 100px;
  padding-bottom: 2rem;
  a {
    margin: 0px 15px;
    color: #e8f8f8;
    text-decoration: none;
  }
`;

export const Image = styled.img`
  height: 45vmin;
  margin-bottom: 12px;
  pointer-events: none;
`;

export const InventoryImage = styled.img`
  height: 20px;
  pointer-events: none;
  align-self: center;
  margin-right: 10px;
`;

export const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  font-weight: bold;
  color: #e8f8f8;
  margin-top: 10px;
`;

export const TopLeft = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: flex-start;
  z-index:98;
  @media screen and (max-width: 845px) {
    flex-direction: row;
  }
`;

export const Button = styled.button`
  font-family: 'Minecraftia', sans-serif;
  background-color: #6c718c80;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  text-align: center;
  text-decoration: none;
  padding: 12px 24px;
  margin: 6px 0 0 5px;
  @media screen and (max-width: 1025px) {
    font-size: 13px;
    padding: 5px 4px;
  }

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }
`;

export const Wallet = styled.div`
  color: #d3d3d3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 885px) {
    flex-direction: row;
    align-items: center;
    white-space: pre-wrap;
  }
`;

export const InventoryMenu = styled.div`
    background-color: #6c718c80;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    min-height: 50px;
    margin: 6px 0 0 5px;
    @media screen and (max-width: 845px) {
      height: 50px;
      padding: 5px 4px;
      flex-direction: row;
      align-items: center;
    }
`;
