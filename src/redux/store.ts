import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from '../features/auth/auth'
import  documentsReducer  from '../features/documents/documents'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch