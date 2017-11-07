import firebase from 'firebase';

class ChatBackend {
  uid = '';
  messagesRef = null;
  // initialize Firebase Backend
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  setName(value) {
    this.name = value;
  }
  getName() {
    return this.name;
  }
  // retrieve the messages from the Backend
  loadMessages(friendUid, callback) {
    this.messagesFriendRef = firebase.database()
    .ref(`users/${friendUid}/messages/${this.getUid()}`);
    this.messagesFriendRef.off();

    this.messagesRef = firebase.database().ref(`users/${this.getUid()}/messages/${friendUid}`);
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend. We want to push the messagesRef
  // for both participants in the chat.
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
      this.messagesFriendRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
      this.messagesFriendRef.off();
    }
  }
}

export default new ChatBackend();
