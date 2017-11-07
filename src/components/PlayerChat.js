import firebase from 'firebase';
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatBackend from '../ChatBackend';

export default class Chat extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    const { currentUser } = firebase.auth();
    this.name = currentUser.displayName;
  }

  componentDidMount() {
    ChatBackend.loadMessages(this.props.uid, (message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }

  componentWillUnmount() {
    ChatBackend.closeChat();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => ChatBackend.sendMessage(message)}
        user={{
          _id: ChatBackend.getUid(),
          name: this.name
        }}
      />
    );
  }
}
