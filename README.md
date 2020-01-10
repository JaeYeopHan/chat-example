# 프론트 엔드 개발자 사전 과제

## 과제

- 채팅 어플리케이션 만들기

## 기능

- 사용자는 첫 진입 시, ID를 입력하여 접속할 수 있다.
- 채팅방 리스트에서 채팅방을 선택하여 들어갈 수 있다.
- 채팅방에 다른 사용자를 초대할 수 있다.
- 사용자는 채팅방에서 텍스트를 입력할 수 있다.
- 사용자는 채팅방에서 이미지를 입력할 수 있다.

## 과제 요구사항

- Client side rendering으로 개발
- 언어에 대한 제한은 없음
- 서버 구현 방법에 대한 제한 없음 (REST API, Long Polling, Socket...)
- 프론트엔드 구현 방법은 제한 없음 (Angular, React, Preact, Vue, jQuery...)
- UI 구현에 대한 제약은 없음
- 단위 테스트 필수, UI 테스트(Storybook, Selenium)와 통합 테스트는 선택
- README.md 파일에 문제해결 전략 및 프로젝트 빌드, 실행 방법 명시

## 예시 및 설명

- 위 언급되지 않은 내용에 대해서는 자유롭게 작성할 수 있다.

## 설계

### Client

#### /

> 사용자가 로그인을 할 수 있다.

- [x] input
- [x] button

#### /list/{id}

> 채팅방 목록을 볼 수 있다.
> 자신이 만든 방 그리고 초대된 방의 리스트가 노출된다.

- [x] chatting list
  - [x] item
    - [x] title
    - [x] created time
    - [x] button(join)
- [x] button(create chat room)
- [x] title(Chat List)

#### /chat/{id}

> 채팅방 화면

- [x] title
- [ ] input(message)
- [ ] button(send)
- [ ] button(image)
- [ ] message element(div)
- [ ] profile element(span)

### Server

- [ ] `/login`
- [ ] socket on 'id'

### common

```ts
interface ILoginRequest {
  id: number
}
interface ILoginResponse {
  success: boolean
}
interface ChatRoom {
  id: number
  title: string
  createdTime: number
  messages: Message[]
}
interface Message {
  userId: number
  type: 'text' | 'image'
  contents: string
}
```
