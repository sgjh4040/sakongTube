# SakongTube

Youtue 채널 클로닝

## pages:

- [x] 홈(Home)
- [x] 가입(Join)
- [x] 로그인(Login)
- [x] 검색(Search)
- [x] 회원 상세(User Detail)
- [x] 프로필 수정(Edit Profile)
- [x] 비밀번호 번경(Change Password)
- [x] 업로드(Upload)
- [x] 비디오 상세(Videol Detial)
- [x] 비디오 수정(Edit Video)
- [x] 게시판 (Board)
- [x] 게시판 상세(Board detail))


## 개요
* YOUTUBE 홈페이지를 모티브로 하여 동영상을 올리고 같이 공유할수 있는 사이트 입니다.
동영상이 재밌거나 맘에 들 경우 좋아요를 눌려 추천을 할 수 있습니다. 다양한 동영상을 
함께 즐길수 있습니다.


## 개발 환경
* 언어 : javascript(node.js)
## 데이터 베이스 설계
* mongoDB

## 주요 기능
### 1.소셜 로그인 기능 
* passport npm을 활용하여 github, kakaotalk 로그인 기능을 구현하였습니다.
* local login기능을 구현하여 동일한 email이 있는지 판단 후 추가또는 생성하였습니다.
### 2. 마이페이지 관리
* multer npm 을 활용하여 프로필 사진을 업로드 할 수 있습니다.
* 현재 비밀번호 일치 여부를 확인하여 비밀번호 변경이 가능하도록 하였습니다.
### 3. 사진, 동영상 업로드
* multer npm 을 활용하여 원하는 동영상을 업로도 할 수 있습니다
* ajax 통신을 통해 업로드시 업로드 progress 를 추적하여 업로드 %를 표시 하였습니다.
### 4. 댓글 추가, 삭제 기능
* 동영상에 대한 댓글을 추가 또는 삭제 할수 있습니다.
* 좋아요 기능을 구현하였습니다.
### 5. 게시판 기능
* 페이징을 통하여 페이지당 10개의 글을 출력할수 있게 하였습니다.
* 게시글 추가 수정 삭제를 할 수 있습니다.