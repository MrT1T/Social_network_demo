import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Music from "./Components/Music/Music";
import News from "./Components/News/News";
import Settings from "./Components/Settings/Settings";
import {withRouter, Route, HashRouter, Switch} from "react-router-dom";
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import Login from "./Components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initialaizeApp} from "./Redax/app-reducer";
import Preloader from "./Components/Common/Preloader/Preloader";
import store from "./Redax/redux-store";
import ProfileContainer from "./Components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import("./Components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./Components/Users/UsersContainer"))

class App extends React.Component {

    componentDidMount() {
        this.props.initialaizeApp()
    }

    render() {
        if (!this.props.initialaized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <Header/>
                <NavbarContainer/>
                <div className='app-content'>
                    <Switch>
                        <Route exact path='/'
                               render={() => <ProfileContainer/>}/>
                        <Route path='/Login'
                               render={() => <Login/>}/>
                        <Route path='/Profile/:userId?'
                               render={() => <ProfileContainer/>}/>
                        <React.Suspense fallback={<Preloader/>}>
                            <Route path='/Dialogs'
                                   render={() => <DialogsContainer/>}/>
                            <Route path='/Users'
                                   render={() => <UsersContainer/>}/>
                        </React.Suspense>

                        <Route path='/News' component={News}/>
                        <Route path='/Music' component={Music}/>
                        <Route path='/Settings' component={Settings}/>
                        <Route path='*'
                               render={() => <div> 404 NOT FOUND</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialaized: state.app.initialaized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initialaizeApp}))(App);

const AppStart = () => {
    return (<HashRouter>
        <Provider store={store}>
            <AppContainer/>,
        </Provider>,
    </HashRouter>)
}

export default AppStart;