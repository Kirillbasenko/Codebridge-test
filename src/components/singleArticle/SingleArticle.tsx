import { useAppSelector } from "../../hooks/hook";
import { Link } from "react-router-dom";

import "./singleArticle.scss"

export interface Article {
   id: number;
   imageUrl: string;
   title: string;
   publishedAt: string;
   summary: string;

}

const SingleArticle: React.FC<Article> = () => {

   const {singleArticle} = useAppSelector(state => state.article)

   //const { imageUrl, title, summary } = singleArticle

   return(
      <section className="single">
         <img className="single__back" src={singleArticle.imageUrl} alt={singleArticle.title} />
         <div className="content">
            <div className="content__title">{singleArticle.title}</div>
            <div className="content__text">{singleArticle.summary}</div>
         </div>
         <Link to={"/"} className="single__button">Back to homepage</Link>
      </section>
   )
}

export default SingleArticle