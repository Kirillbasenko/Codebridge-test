import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Keywords from 'react-keywords';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Article } from "../../types/data";

import { getArticles, singleArticle } from "../../store/slices/articleSlice"

import "./articlesList.scss"

const NewList: React.FC = () => {
   const dispatch = useAppDispatch()

   const { articles, filterArticle, term } = useAppSelector(state => state.article)

   useEffect(() => {
      dispatch(getArticles())
   }, [])

   function renderItems(arr: Array<Article>){
      const items = arr.map((item, index) => {
            /*return(
               <div key={item.id} className="news__item">
                  <img className="news__image" src={item.imageUrl} alt={item.title} />
                  <div className="news__content">
                     <div className="news__date">{item.publishedAt}</div>
                     
                        <div className="news__title">
                           <Keywords value={term}>
                              {item.title}
                           </Keywords>
                        </div>
                        <div className="news__text">
                           <Keywords value={term}>
                              {item.summary.length < 100 ? item.summary : `${item.summary.slice(0, 100)}...`}
                           </Keywords>
                        </div>
                     
                     <Link 
                        to={`/${item.id}`}
                        onClick={() => dispatch(singleArticle(articles[index]))}
                        className="news__button">Read more </Link>
                  </div>
               </div>
            )*/
            return(
               <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                  component="img"
                  alt={item.title}
                  height="217"
                  image={item.imageUrl}
                  />
                  <CardContent sx={{ minHeight: 250, padding: 3, paddingBottom: 2}}>
                     <Typography className="date" sx={{fontFamily: 'Montserrat', marginBottom: 2}} variant="body2" color="text.secondary">
                        {item.publishedAt}
                     </Typography>
                     <Typography sx={{fontFamily: 'Montserrat', marginBottom: 2}} gutterBottom variant="h5" component="div">
                        <Keywords value={term}>
                           {item.title}
                        </Keywords>
                     </Typography>
                     <Typography sx={{fontFamily: 'Montserrat', fontSize: 16}} variant="body2" >
                        <Keywords value={term}>
                           {item.summary.length < 100 ? item.summary : `${item.summary.slice(0, 100)}...`}
                        </Keywords>
                     </Typography>
                     
                  </CardContent>
                  <CardActions sx={{paddingLeft: 3, paddingBottom: 3, paddingTop: 0}}>
                        <Link 
                           className="button" 
                           to={`/${item.id}`}
                           onClick={() => dispatch(singleArticle(articles[index]))}>Read more</Link>
                     </CardActions>
               </Card>
            )
      })
      return(
         <ul className="grid">
            {items}
         </ul>
      )
   }

   const items = renderItems(articles)
   const filters = renderItems(filterArticle)

   return(
      <section className="newList">
         <div className="newList__title">Results: {term ? filterArticle.length : articles.length}</div>
         <div className="newList__decor"></div>
         <div className="news">
            {term ? filters : items}
         </div>
      </section>
   )
}

export default NewList