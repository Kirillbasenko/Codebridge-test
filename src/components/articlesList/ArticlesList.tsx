import * as React from 'react';
import { useEffect } from "react"
import { Link } from "react-router-dom";
import Keywords from 'react-keywords';
import Card from '@mui/material/Card';
import { format } from "date-fns";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2'

import { getArticles, singleArticle, searchFrom } from "../../store/slices/articleSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Article } from "../../types/data";
import "./articlesList.scss"

const NewList: React.FC = () => {
   const dispatch = useAppDispatch()

   const { articles, articlesLoadingStatus, filterArticle, term } = useAppSelector(state => state.article)

   useEffect(() => {
      dispatch(getArticles())
      dispatch(searchFrom(""))
   }, [])

   const style = {
      fontFamily: 'Montserrat',
      color: "#363636"
   }

   if (articlesLoadingStatus === "loading"){
      return (
         <Box fontSize={"small"} sx={{ display: 'flex', justifyContent: "center" }}>
            <CircularProgress />
         </Box>
      );
   } else if (articlesLoadingStatus === "error"){
      
   }

   function renderItems(arr: Array<Article>){
      const items = arr?.map(item=> {
         let elem = articles.filter(i => i.id === item.id)
            return(
               <Card key={item.id} sx={{ 
                  maxWidth: 400, 
                  marginBottom: 3,
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)", 
                  }}>
                  <CardMedia
                     component="img"
                     alt={item.title}
                     height="217"
                     image={item.imageUrl}
                     />
                  <CardContent sx={{
                     minHeight: 250, 
                     padding: 3, 
                     paddingBottom: 2}}>
                     <Typography  className="date" sx={{ 
                        fontFamily: 'Montserrat', 
                        marginBottom: 2 }} 
                        variant="body2">
                        {format(new Date(item.publishedAt), "PPP")}
                     </Typography>
                     <Typography sx={{ 
                        ...style, 
                        marginBottom: 2 }} 
                        gutterBottom 
                        variant="h5" 
                        component="div">
                        <Keywords value={term}>
                           {item.title}
                        </Keywords>
                     </Typography>
                     <Typography sx={{ 
                        ...style, 
                        fontSize: 16}} 
                        variant="body2" >
                        <Keywords value={term}>
                           {item.summary.length < 100 ? item.summary : `${item.summary.slice(0, 100)}...`}
                        </Keywords>
                     </Typography>
                     
                  </CardContent>
                  <CardActions sx={{
                     paddingLeft: 3, 
                     paddingBottom: 3, 
                     paddingTop: 0}}>
                        <Link 
                           className="button" 
                           to={`/article/${item.id}`}
                        onClick={() => dispatch(singleArticle(elem[0]))}>Read more</Link>
                     </CardActions>
               </Card>
            )
      })
      return(
         <Grid2
            container
            rowSpacing={"45px"}
            justifyContent="space-around"
            mt={6.25}
         >
            {items}
         </Grid2>
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