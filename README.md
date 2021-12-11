# 항해록 (Hanghaelog) 🚢
항해록(Hanghaelog)은 일상기록이 가능한 소셜 미디어 웹앱입니다.

## 제작 기간 및 팀원 소개
2021-12-06 ~ 2021-12-11

`FE`
 * 이한샘
 * 장주혜
 * 김자운
 
 `BE`
 * 송민지
 * 길재원
 * 김승준
 
## 와이어 프레임 
<img width="70%" height="70%" src = "https://user-images.githubusercontent.com/87404676/145561904-430547cf-73d3-4897-8150-aa1d243262be.jpeg"/>


## 웹사이트
링크: http://hanghaelog.shop/
s3링크: http://mini--hanghaelog.s3-website.ap-northeast-2.amazonaws.com/

## 데모 영상
링크:

## API
|                | Method | URL                                    | REQ                                           | RES                                                                                                          |
|----------------|--------|----------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| REGISTER       | POST   | /api/auth/register                     | {  email  nickname  password  passwordCheck } | code 201                                                                                                     |
| LOGIN          | POST   | /api/auth/login                        | {  email  password }                          | {  token  user{       id,       nickname       } }                                                           |
| GET USER       | GET    | /api/auth                              | headers:{  authorization:token }              | {  id:user.id  nickname }                                                                                    |
| GET POSTS      | GET    | /api/posts                             |                                               | post{      id,      userId      nickname      createdAt      content      imgUrl      numOfComments      }   |
| WRITE POST     | POST   | /api/posts                             | {  imgUrl,  content }                         | {  post  code:201 }                                                                                          |
| EDIT POST      | PUT    | /api/posts/:postId                     | {  content,  imgUrl }                         | code:204                                                                                                     |
| DELETE POST    | DELETE | /api/posts/:postId                     |                                               | code:204                                                                                                     |
| GET COMMENTS   | GET    | /api/posts/:postId/comments            |                                               | comment {          id,          userId          postId,          comment,          nickname,          }      |
| WRTIE COMMENT  | POST   | /api/posts/:postId/comments            | {  comment }                                  | {  comment,  code:201, }                                                                                     |

## 기술 스택 및 개발 환경
`FE`
 * React.js
 * Redux
 * React-router-dom
 * Material UI
 * Axios
 
 `BE`
 * Node.js
 * Express.js
 * Passport.js
 * JsonWebToken
 * Multer

`DBMS`
 * My SQL
 * Sequelize
 * Sequelize-cli

`Deploy`
 * AWS EC2 (Ubuntu 18.04LTS)
 * AWS S3



