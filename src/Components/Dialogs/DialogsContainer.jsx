import React from 'react';
import {addMessage} from "../../Redax/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
}

export default compose(connect(mapStateToProps, {addMessage}), withAuthRedirect)(Dialogs);