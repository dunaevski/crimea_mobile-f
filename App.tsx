import React from "react";
import { Provider } from 'mobx-react';
import stores from './src/globalStores'
import AppNavigator from "./src/navigator/AppNavigator";

const App = () => (
    <Provider { ...stores }>
        <AppNavigator />
    </Provider>
);

export default App;
