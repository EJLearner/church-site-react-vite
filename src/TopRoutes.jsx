import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Admin from './main/Admin/Admin';
import MainWrapper from './main/MainWrapper';
import RemovedPage from './main/RemovedPage';
import ScrollToTop from './main/commonComponents/ScrollToTop';
import routePaths from './routePaths';

const TopRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route component={MainWrapper} exact path={routePaths.MAIN_HOME} />
        <Route path="/ce/">
          <RemovedPage />
        </Route>
        <Route path={routePaths.ADMIN}>
          <Admin />
        </Route>
        <Route component={MainWrapper} path={routePaths.MAIN_HOME} />
      </Switch>
    </BrowserRouter>
  );
};

export default TopRoutes;
