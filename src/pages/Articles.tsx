import {useEffect,useState} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import styled from "styled-components";

interface Article{
  id: string,
  title: string,
  imageUrl: string,
  content: string
}

const CardsContainer = styled.div`
padding: 4rem 0;
display: flex;
`

const Card = styled.div`
height: 55rem;
width: 33%;
box-shadow: 0.1rem 0.1rem 1rem rgba(0,0,0,0.2);
padding: 2rem;
border-radius: 2rem;
margin-right: 2rem;
`

const Image = styled.img`
height: 30rem;
width: 100%;
border-radius: 2rem;
`

const Header = styled.h2`
margin-top: 1rem;
font-size: 1.5rem;
`

const Content = styled.p`
margin-top: 1rem;
font-size: 1.5rem;
`

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(()=>{
      fetchArticles()
  },[])
  const fetchArticles = async() => {
    const {data:response} = await axios.get("http://localhost:8080/articles");
    setArticles(response)
  }
  return <Container>
    {articles.length ? 
    (
      <CardsContainer>{articles.map((article,index) => (
        <Card key={index}>
          <Image src={article.imageUrl}/>
          <Header>{article.title}</Header>
          <Content>{article.content}</Content>
        </Card>
      ))}</CardsContainer>) 
    : (
      <div>you dont have a plan</div>
    )}
  </Container>;
};

export default Articles;
