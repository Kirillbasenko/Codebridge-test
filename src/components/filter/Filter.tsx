import { useAppDispatch, useAppSelector } from "../../hooks/hook";

import { searchFrom, filteredArticle } from "../../store/slices/articleSlice"

import "./filter.scss"

const Filter = () => {
   const dispatch = useAppDispatch()

   function handleInput(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) {
      dispatch(filteredArticle(e.target.value));
      dispatch(searchFrom(e.target.value));
   }

   return(
      <div className="filter">
         <div className="filter__title">
            Filter by keywords
         </div>
         <div className="filter__content">
            <input 
               onChange={(e) => handleInput(e)} 
               className="filter__input" 
               placeholder="Search" 
               type="text" />
         </div>
      </div>
   )
}

export default Filter