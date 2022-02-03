import {useEffect,useState,useContext, useRef} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { UserContext } from '../context';

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

const NoArticlesContainer = styled.div`
display:flex;
justify-content: center;
align-items:center;
flex-direction: column;
text-align: center;
padding: 20rem 0;
& a{
  font-size: 2rem;
  text-decoration: none;
}
`

const ErrorHeader = styled.h2`
font-size: 3rem;
`

const Content = styled.p`
margin-top: 1rem;
font-size: 1.5rem;
`

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [state,setState] = useContext(UserContext);


  useEffect(()=>{
      fetchArticles()
  },[])
  const fetchArticles = async() => {
    const {data:response} = await axios.get("http://localhost:8080/articles");
    setArticles(response)
  }

  if(state.loading) {
    console.log("was here");
    return <></>
  }

  return <Container>{articles.length ? 
        (
          <CardsContainer>{articles.map((article,index) => (
            <Card key={index}>
              <Image src={article.imageUrl}/>
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}</CardsContainer>) 
        : (
          <NoArticlesContainer>
            <ErrorHeader>
              You do not have access yet.
            </ErrorHeader>
            <Link to="/article-plans">
              Buy a plan
            </Link>
          </NoArticlesContainer>
        )}
  </Container>;
};

export default Articles;
