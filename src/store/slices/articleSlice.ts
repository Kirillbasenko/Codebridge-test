import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook"

type Article = {
   id: number;
   imageUrl: string;
   title: string;
   publishedAt: string;
   summary: string;
}

type ArticleState = {
   articles: Array<Article>,
   singleArticle: Article | null,
   filterArticle: Array<Article>,
   term: string,
   articlesLoadingStatus: string,
}

const initialState: ArticleState = {
   articles: [],
   singleArticle: null,
   filterArticle: [],
   term: "",
   articlesLoadingStatus: 'idle',
}

export const getArticles = createAsyncThunk(
   "article/readMessages",
   async () => {
      const { request } = useHttp()
      const res = await request("https://api.spaceflightnewsapi.net/v3/articles?_limit=6")
      return res
   }
)

const newsSlice = createSlice({
   name: "news",
   initialState,
   reducers: {
      singleArticle: (state, action: PayloadAction<Article>) => {
         state.singleArticle = action.payload
      },
      filteredArticle: (state, action: PayloadAction<String>) => {
         let arr = state.articles.filter(item => item.title.toLowerCase().includes(action.payload.trim().toLowerCase()))
         let arr2 = state.articles.filter(item => item.summary.toLowerCase().includes(action.payload.trim().toLowerCase()))
         let arr3 = [...arr, ...arr2]
         state.filterArticle = arr3.filter((item, index) => index === arr3.indexOf(item)) as Article[]
      },
      searchFrom: (state, action) => {
         state.term = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getArticles.pending, state => { state.articlesLoadingStatus = 'loading' })
         .addCase(getArticles.fulfilled, (state, action) => {
            state.articlesLoadingStatus = 'idle';
            state.articles = action.payload
         })
         .addCase(getArticles.rejected, state => { state.articlesLoadingStatus = 'error' })
         .addDefaultCase(() => { })
   }
})

const { actions, reducer } = newsSlice

export default reducer;

export const {
   singleArticle,
   searchFrom,
   filteredArticle
} = actions