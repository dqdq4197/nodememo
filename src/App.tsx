import React from 'react';
import {ThemeProvider} from 'styled-components';
import {CodeView} from './page';
import {BrowserRouter ,Route,Switch} from 'react-router-dom';
import {lightTheme,darkTheme} from './styles/CommonTheme';
import {useSelector} from 'react-redux';
import {RootState} from './modules';
import CommonTemplate from './containers/mainFixed/CommonTemplate';



const App = () => {
  const {mode} = useSelector((state: RootState)=>state.theme);
  return (
    <ThemeProvider
      theme={mode ==='DarkMode' ? darkTheme : lightTheme}>
      <CommonTemplate/>
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