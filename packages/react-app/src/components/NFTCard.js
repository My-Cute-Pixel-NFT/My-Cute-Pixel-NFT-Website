import styled from "styled-components"

const NFTCard = (props) => {
    let nft = props.nft;

    let boxShadow = "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff";
    if (nft.copies > 0) {
      boxShadow = "8px 8px 16px #f0a5ad, -8px -8px 16px #ffbbc2";
    }
  
    return (
      <NftCard onClick={() => props.toggleModal() } style={{"boxShadow":boxShadow}}> 
        <NftPhoto style={{ backgroundImage: `url(${nft && nft.image_url})`, 
        "backgroundSize":"100%", "backgroundRepeat":"no-repeat" }} />
        <div style={{ "margin": "5px 8px" }}>
          <div style={{"display":"flex", "justifyContent":"space-between"}}>
            <NftCollectionText> {nft && nft.symbol} </NftCollectionText>
            <NftName style={{ float: "right" }}> {`x${nft && nft.copies}`}</NftName>
          </div>
          <NftName> {nft && nft.name}</NftName>
        </div>
      </NftCard>
    )
  }
  
  const NftCollectionText = styled.div`
    font-size: 12px;
    color: #6c718c;
  `
  const NftName = styled.div`
    font-size: 12px;
    font-weight: bold;
    display: inline;
  `
  const NftPhoto = styled.div`
    display: block;
    width: 200px;
    height: 200px;
    background-position: center center;
    background-size: cover;
    border-radius: 10px;
    margin: auto;
  `
  const NftCard = styled.div`
    width: 205px;
    height: 280px;
    margin: auto 12px;
    border-radius: 10px;
    padding: 0px;
    &:hover {
      width: 225px;
      height: 308px;
    }
  `

export { NFTCard, NftPhoto }