import React, { Component } from "react";
import { connect } from "react-redux";
import { get_users } from "../../store/action/index";
import firebase from "../../config/firebase";

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            chat_user: {},
            chats: [],
            message: "",
        };
    }
    chat = (user) => {
        this.setState({
            chat_user: user,
        });
        let current_user = this.props.current_user;
        let merge_uid = this.uid_marge(current_user.uid, user.uid);
        this.get_messages(merge_uid);
        console.log("this merge", merge_uid);
        console.log("this current", current_user);
        // console.log(user);
    };
    componentDidMount() {
        this.props.get_users();
    }
    uid_marge = (uid1, uid2) => {
        if (uid1 < uid2) {
            return uid1 + uid2;
        } else {
            return uid2 + uid1;
        }
    };
    sendMessage = () => {
        let user = this.props.current_user;
        let chat_user = this.state.chat_user;
        console.log("mil gai1", user);
        console.log("mil gai", chat_user);
        console.log("message", this.state.message);

        let merge_uid = this.uid_marge(user.uid, chat_user.uid);
        // console.log("this merge1", merge_uid);
        firebase.database().ref("/").child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: user.name,
            uid: user.uid,
        });
        // this.state.chats.push({
        //     message: this.state.message,
        // });
        this.setState({
            // chats: this.state.chats,
            message: "",
        });
        // console.log(this.uid_marge(user.uid, chat_user.uid));
    };
    get_messages = (uid) => {
        firebase
            .database()
            .ref("/")
            .child(`chats/${uid}`)
            .on("child_added", (message) => {
                this.state.chats.push(message.val());
                this.setState({
                    chats: this.state.chats,
                });
            });
    };
    render() {
        let user = this.props.current_user;
        console.log("firebase chat==", this.props.users);

        return (
            <div>
                <h1>Welcome! {user.name}</h1>
                <img src={user.profile} alt="" />
                <h2>Email: {user.email}</h2>
                <div style={{ display: "flex" }}>
                    <div style={{ backgroundColor: "grey" }}>
                        <h3>Chat user:</h3>
                        <ul>
                            {this.props.users.map((v, i) => {
                                return (
                                    v.uid !== user.uid && (
                                        <li key={i}>
                                            <img
                                                src={v.profile}
                                                alt=""
                                                width="20px"
                                            />
                                            {v.name}{" "}
                                            <button
                                                onClick={() => this.chat(v)}
                                            >
                                                Chat
                                            </button>
                                        </li>
                                    )
                                );
                            })}
                        </ul>
                    </div>
                    <div
                        style={{
                            marginLeft: 10,
                            width: 400,
                            backgroundColor: "yellow",
                        }}
                    >
                        <h4>Chat</h4>
                        {Object.keys(this.state.chat_user).length ? (
                            <div>
                                <h4>
                                    <img
                                        src={this.state.chat_user.profile}
                                        alt=""
                                        width="20px"
                                    />

                                    {this.state.chat_user.name}
                                </h4>
                                <ul>
                                    {this.state.chats.map((v, i) => {
                                        return (
                                            <li
                                                style={{
                                                    color:
                                                        v.uid === user.uid
                                                            ? "red"
                                                            : "green",
                                                }}
                                                key={i}
                                            >
                                                {v.message}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <input
                                    value={this.state.message}
                                    placeholder="enter your message"
                                    onChange={(e) =>
                                        this.setState({
                                            message: e.target.value,
                                        })
                                    }
                                ></input>
                                <button onClick={() => this.sendMessage()}>
                                    Send
                                </button>
                            </div>
                        ) : (
                            <h4>No user</h4>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
    get_users: () => dispatch(get_users()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
