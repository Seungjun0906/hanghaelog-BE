# ν­ν΄λ‘ (Hanghaelog) π’
ν­ν΄λ‘(Hanghaelog)μ μΌμκΈ°λ‘μ΄ κ°λ₯ν μμ λ―Έλμ΄ μΉμ±μλλ€.

## μ μ κΈ°κ° λ° νμ μκ°
2021-12-06 ~ 2021-12-11

`FE`
 * μ΄νμ
 * μ₯μ£Όν
 * κΉμμ΄
 
 `BE`
 * μ‘λ―Όμ§
 * κΈΈμ¬μ
 * κΉμΉμ€
 
## μμ΄μ΄ νλ μ 
<img width="70%" height="70%" src = "https://user-images.githubusercontent.com/87404676/145561904-430547cf-73d3-4897-8150-aa1d243262be.jpeg"/>


## μΉμ¬μ΄νΈ
λ§ν¬: http://hanghaelog.shop/
s3λ§ν¬: http://mini--hanghaelog.s3-website.ap-northeast-2.amazonaws.com/

## λ°λͺ¨ μμ
λ§ν¬:

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
| DELETE COMMENT  | DELETE | /api/posts/:postId/comments           | {  comment }                                  | {  comment,  code:201, }                
## κΈ°μ  μ€ν λ° κ°λ° νκ²½
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



