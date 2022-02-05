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
flex-wrap: wrap;
gap: 32px;
`

const Card = styled.div`
height: 41rem;
width: 48%;
box-shadow: 0.1rem 0.1rem 1rem rgba(0,0,0,0.2);
padding: 2rem;
border-radius: 2rem;
background: #fdfdfd;
`

const Image = styled.img`
height: 20rem;
width: 100%;
border-radius: 1rem;
object-fit: cover;
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
display: -webkit-box;
-webkit-line-clamp: 6;
-webkit-box-orient: vertical;
overflow: hidden;
padding: 0;
word-break: break-word;
`

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [state,setState] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  console.log(state)

  useEffect(()=>{
      fetchArticles()
  },[])
  const fetchArticles = async() => {
    const {data:response} = await axios.get("http://localhost:8080/articles");
    setArticles(response)
    setIsLoading(false)
  }

  if(isLoading) {
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
