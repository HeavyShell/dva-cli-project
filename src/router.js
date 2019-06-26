import React from 'react';
import { Router, Route, Switch, routerRedux,  } from 'dva/router';
import dynamic from 'dva/dynamic';
import utils from './utils';
import Layout from './layout';

const {config:{routeData}} =utils;

const {ConnectedRouter}=routerRedux; //将histrory 分发到所有的组件上，即store中的routing

function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/404'),
  })
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
            {
              routeData.map(({path,...dynamics},index)=>(
                <Route
                  key={index} 
                  path={path} 
                  exact 
                  component={dynamic({
                    app,
                    ...dynamics
                  })} 
                />
              ))
            }
            <Route component={error} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
}

export default RouterConfig;
