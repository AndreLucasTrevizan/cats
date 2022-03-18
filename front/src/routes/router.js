import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Components
import Header from '../Components/Header';

//Pages
import Home from '../pages/Home';
import Cat from '../pages/Cat';
import Login from '../pages/Login';
import Favorites from '../pages/Favorites';
import Register from '../pages/Register';

const router = () => {

    let user = JSON.parse(localStorage.getItem('user'));
    let token = JSON.parse(localStorage.getItem('token'));

    return(
        <BrowserRouter>
            <Header user={user} token={token} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cats/:id" component={Cat} />
                <Route exact path="/sign_in" component={Login} />
                <Route exact path="/favorites/:id_user" component={Favorites} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </BrowserRouter>
    );
};

export default router;