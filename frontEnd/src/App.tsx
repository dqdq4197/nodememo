import React from 'react';
import {ThemeProvider} from 'styled-components';
import {CodeViewPage,HomePage} from './page';
import {BrowserRouter ,Route,Switch, useLocation} from 'react-router-dom';
import {lightTheme,darkTheme} from './styles/CommonTheme';
import {useSelector} from 'react-redux';
import {RootState} from './modules';
import CommonTemplate from './containers/mainFixed/CommonTemplate';
import './App.css';



const App = () => {
  const {mode} = useSelector((state: RootState)=>state.theme);
  return (
    <ThemeProvider
      theme={mode ==='DarkMode' ? darkTheme : lightTheme}>
      <BrowserRouter >
        <CommonTemplate/>
        <AppSwitch />
      </BrowserRouter >
    </ThemeProvider>
  )
}


function AppSwitch() {
  const location = useLocation();
  return (
    <>
      <Switch location={location}>
        <Route path="/" exact component={HomePage}/>
        <Route path="/codeview" component={CodeViewPage} />

      </Switch>
    </>
  )
}
export default App;