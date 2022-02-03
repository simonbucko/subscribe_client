import axios from 'axios';
import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { Container, Card, Button } from 'react-bootstrap';

const CardsContainer = styled.div`
display: flex;
height: 75vh;
align-items: center;
justify-content: center;
`
const CardHeader = styled.div`
height: 30rem;
background-color: blue;
display: flex;
align-items: center;
justify-content: center
`

const PriceCircle = styled.div`
border: 0.5rem solid white;
width: 12.5rem;
height: 12.5rem;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0.1rem 0.1rem 1rem rgba(19,20,19,0.342)
`

const PriceText = styled.p`
font-size: 3rem;
color: white;
text-shadow: 0.1rem 0.1rem 1rem rgba(19,20,19,0.342)
`


const ArticlesPlan = () => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices()
  }, []);

  const fetchPrices = async() => {
    const {data: response} = await axios.get("http://localhost:8080/subs/prices")
    setPrices(response.data)
  }

  const backgroundColors:any = {
    Basic: "rgb(104,219,204)",
    Standard: "rgb(185,42,23,0.835)",
    Premium: "pink"
  }

  const createSession = async(priceId:string) => {
    const {data:response} = await axios.post("http://localhost:8080/subs/session",{
      priceId
    })

    window.location.href = response.url
  }
  

  return <Container>
    <CardsContainer>
      {prices.map((price:any) => (
        <Card style={{width: "18rem", marginRight:"2rem"}}> 
          <CardHeader style={{backgroundColor: backgroundColors[price.nickname]}}>
            <PriceCircle>
              <PriceText>
              ${price.unit_amount/100}
              </PriceText>
            </PriceCircle>
          </CardHeader>
          <Card.Body>
            <Card.Title style={{fontSize: "2rem"}}>
              {price.nickname}
            </Card.Title>
            <Button variant="primary" className="mt-2" onClick={() => createSession(price.id)}>
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      ))}
    </CardsContainer>
  </Container>;
};

export default ArticlesPlan;
