import React, {useState} from 'react';
import styled,{ThemeProvider} from 'styled-components';
import {CodeView} from './page';
import {BrowserRouter ,Route,Switch} from 'react-router-dom';
import {lightTheme,darkTheme} from './styles/CommonTheme';



const App = () => {
  const themeMode = localStorage.getItem('theme');
  const [theme,setTheme] = useState(themeMode? themeMode:'DarkMode');
  
  return (
    <ThemeProvider
      theme={theme ==='DarkMode' ? darkTheme : lightTheme}>
    <BrowserRouter >
      <AppSwitch />
    </BrowserRouter >
    </ThemeProvider>
  )
}


function AppSwitch() {
  return (
    <>
      <Switch>
        <Route path="/codeview" component={CodeView} />
      </Switch>
    </>
  )
}
export default App;