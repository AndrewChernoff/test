import './App.css'
import { useAppSelector } from './hooks/redux-hooks';
import { Router } from './router/router'
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {

  const isItemsLoading = useAppSelector(state => state.documents.isLoading)
  const isSignInLoading = useAppSelector(state => state.auth.isLoading)

  return (
    <>
     {(isItemsLoading || isSignInLoading) && <LinearProgress/>}
     <Router />
    </>
  )
}

export default App
