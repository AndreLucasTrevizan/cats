import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Components
import Header from '../Components/Header';

//Pages
import Home from '../pages/Home';

const router = () => {
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default router;