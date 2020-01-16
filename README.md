# Chatting Example

> Client Side

## 🚚 Installation

```sh
# git clone...
$ npm run setup
$ npm run build:server
$ npm run start:server
$ npm run start:client
```

## 🤖Environment

### Client(Web Client)

- TypeScript
- React (creat-react-app unicorn template)
- redux-toolkit(redux-thunk)
- react-router
- socket.io
- axios
- Sass

### Server(Web API backend)

- TypeScript
- Express
- Socket.io
- No Database(only memory)

## 🎨Problem

### 1. Real-time Network

- Socket.io 사용
- 채팅 메세지에만 적용 (채팅방 목록 제외)

### 2. Image stream

- Data URI format으로 string 기반 전송

### 3. Invite

- 초대라는 기능을 자신이 포함된 방만 노출되도록 구현
