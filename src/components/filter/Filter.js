import { useDispatch } from "react-redux";

import { searchFrom, filteredArticle } from "../../store/slices/articleSlice"

import "./filter.scss"

const Filter = () => {
   const dispatch = useDispatch()

   return(
      <>
         <section className="filter">
            <div className="filter__title">
               Filter by keywords
            </div>
            <div className="filter__content">
               <input 
                  onChange={(e) => {
                     dispatch(searchFrom(e.target.value))
                     dispatch(filteredArticle(e.target.value))
                  }} 
                  className="filter__input" 
                  placeholder="Search" 
                  type="text" />
            </div>
         </section>
      </>
   )
}

export default Filter