import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {useHttp} from "../../hooks/http.hook"

type Article = {
   id: number;
   imageUrl: string;
   title: string;
   publishedAt: string;
   summary: string;
}

type ArticleState = {
   articles: Array<Article>,
   singleArticle: Array<Article>,
   filterArticle: Array<Article>,
   term: string,
   photosLoadingStatus: string,
}

const initialState: ArticleState = {
   articles: [],
   singleArticle: [],
   filterArticle: [],
   term: "",
   photosLoadingStatus: 'idle',
}

export const getArticles = createAsyncThunk(
   "article/readMessages",
   async () => {
      const {request} = useHttp()
      const res = await request("https://api.spaceflightnewsapi.net/v3/articles")
      return res
   }
)

const newsSlice = createSlice({
   name: "news",
   initialState,
   reducers: {
      singleArticle: (state, action: PayloadAction<object>) => {
         state.singleArticle = action.payload
      },
      filteredArticle: (state, action: PayloadAction<string>) => {
         let arr = state.articles.filter(item => item.title.toLowerCase().includes(action.payload.trim().toLowerCase()))
         let arr2 = state.articles.filter(item => item.summary.toLowerCase().includes(action.payload.trim().toLowerCase()))
         let arr3 = [...arr, arr2]
         //state.filterArticle = [...new Set([...arr, ...arr2])]
         if (arr3){
            state.filterArticle = arr3.filter((item, index) => index === arr3.indexOf(item))
         }
      },
      searchFrom: (state, action) => {
         state.term = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getArticles.pending, state => {state.photosLoadingStatus = 'loading'})
         .addCase(getArticles.fulfilled, (state, action) => {
               state.photosLoadingStatus = 'idle';
               state.articles = action.payload
            })
         .addCase(getArticles.rejected, state => {state.photosLoadingStatus = 'error'})
         .addDefaultCase(() => {})
   }
})

const {actions, reducer} = newsSlice

export default reducer;

export const {
   singleArticle,
   searchFrom,
   filteredArticle
} = actions