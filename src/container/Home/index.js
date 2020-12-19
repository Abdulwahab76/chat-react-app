import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { set_data } from "../../store/action";
// import Auth from "";
import { facebooklogin } from "../../store/action/index";

class Home extends React.Component {
    render() {
        console.log("props===", this.props);
        return (
            <div>
                <h1>Home</h1>

                <button
                    onClick={() => this.props.facebooklogin(this.props.history)}
                >
                    Facebook Login
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    UseRs: state.users,
});
const mapDispatchToProps = (dispatch) => ({
    facebooklogin: (history) => dispatch(facebooklogin(history)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
