import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Components
import Header from '../Components/Header';

//Pages
import Home from '../pages/Home';
import Cat from '../pages/Cat';
import Login from '../pages/Login';
import Favorites from '../pages/Favorites';

const router = () => {
    return(
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cats/:id" component={Cat} />
                <Route exact path="/sign_in" component={Login} />
                <Route exact path="/favorites/:id_user" component={Favorites} />
            </Switch>
        </BrowserRouter>
    );
};

export default router;