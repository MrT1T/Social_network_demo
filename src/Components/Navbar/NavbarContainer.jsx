import React from 'react';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {logout} from "../../Redax/auth-reducer";


class NavbarContainer extends React.Component {

    render() {
        return <Navbar {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps,{logout})(NavbarContainer);