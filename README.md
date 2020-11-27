# YOU OUT! (하지현, 박경우) 죽을 지(현)경(우)
---
<img src='https://lh5.googleusercontent.com/X8wZyUyagmtojMgxcA9cW2l5xm1znCU76LrgaxMcY7ccT9T40-vRiIL4NhNT0V7QL6EK-Vuq0c8aWo4EyraB=w1125-h2436' width='600'></img>

### table of contents
1. [What is youout?](#what-is-youout)
2. [Who are we?](#who-are-we)
3. [Schedule](#schedule)
4. [Simulation!](#simulation)
5. [Feature](#feature)
6. [How to run?](#how-to-run)
7. [Tech stack](#tech-stack)
    - Core stack
      MERN ( Mongo DB, Express, React & React-native, Node JS )
    - third party
      Redux, React-redux, Redux-toolkit, Redux-thunk, React-router,
      Jest, React-testing-library, Mocha, Chai, Sinon
8. [Task tools](#task-tools)
    - Figma
    - Lucid chart
    - Notion
9. [Work flow](#work-flow)
10. [Daily retrospective ( TIL )](#daily-retrospective-t-i-l)
    - Diary [link]
    - Difficulties
11. [Before and After](#before-and-after)
12. [Future plan](#future-plan)

## What is youout?
웹 소켓과 웹 뷰를 활용하여 native app 환경과 모바일 웹에서 동시에 친구들과 방탈출을 해볼수 있는 플랫폼 입니다.

## Who are we?
- 박경우: 작곡을 하고 싶었으나 현재는 바닐라 코딩 부트캠프 8기 수료생.[repo link]()
- 하지현: 기획을 하며 개발을 배우고 싶어서 현재는 바닐라 코딩 부트캠프 8기 수료생.[repo link]()

## Schedule
- Planning: [2020. 11. 9 - 2020. 11. 15]
- Task: [2020. 11. 16 - 2020. 11. 27]

## Simulation!
<img src='https://lh3.googleusercontent.com/fife/ABSRlIrk85I9Yyob5lRFgt9OxBXv_yVtys5eofObg4jcHnmZkRli7og9qGPmClBL8hwFs8l_A0hI8864FrWX9xJoRmj_JWAttJ4B_ZHSw92AUC9CkuRtXXA1v6ujE2WTrs8XsUvEcg15vS_Md4FHPRYAwX2OQULyJnNAO6iq8CB8nqDgzkMHqcjF5qX_BKpLC-ajNQeFcQMGBeEh4eBVdB4hYL4cj-Y7TuIUnyMyPmtNR7SOBiDPEbkeDhjJyi_inax56U9Oy_VHozzF0DcJNcYQk-eveQ3UoQcbdmfbslA0ycZII--ABtle24m-qyDmuSKBC-bBCd0Rr4-9FsDKKvy9e9aOrzzNWXNIn3TP7HfemwVJTdFaH4CDUUVL8LyRe9jcYIOYKupTfUxgvV9xDg5uiVl1dgyO7crsjp7XAyqsxnygn8S4Ma69YeEJJjdIyNutNUW-UQy1DW5uOFbGsEoaRVeqsd7NyJKAJAs926FCbwMZY125y83zx5D1_5rcxsgbMOTexbJq0OgKN0DMeeOQxfus2wtywzfsTDw0jTYp70Z5BGu6VkAdm5CosPal6erI4lwsngRoGH8juNMSoSNK3rGYaR5n1PEfkTFU49lnOYbn86u0KSCXiNM1YlrWhcXiGxA2mkn81ydR7ddjas9HtXZZDsG95TVfsjHv1hxHOx3nhc_eoA9yZMSKtzk7NGmiAK9I1U1n_2iIS4PRqszMuHsw7rSbV7c=w1125-h2436-ft' width='600'></img>

[👍 Youtube Url](https://youtu.be/BMAh4Z3Gr54)

## Feature
- 구글 로그인을 통한 로그인이 필요합니다.
- 최초 입장시 자신의 현재 위치 기반으로 주위 반경에 만들어진 게임이 있는지 가까운 순서대로 정렬해서 보여줍니다.
- 해당하는 방을 최대 4명까지 동시에 들어갈수 있습니다.
- 게임이 시작되면 제시된 키워드를 사진으로 찍어야 합니다.
- 해당 키워드를 찍으면 문제로 넘어갑니다.
- 문제를 맞추면 다시 키워드로 넘어갑니다.
- 왼쪽위에 힌트 버튼이 있습니다.
- 오른쪽웨에 해당 게임을 나갈수 있는 버튼이 있습니다.
- 다른 유저나 내가 문제를 맞추면 모든 유저의 화면 상단에 맞춘 유저의 이름을 실시간으로 보여줍니다.
- 해당 게임이 끝나면 결과 페이지로 이동되면서 게임 결과가 데이터 베이스에 저장됩니다.
- 유저페이지에 들어가면 자신이 만든 게임과 그동안 플레이 했던 게임을 볼 수 있습니다.
- 자신이 만든 게임은 수정과 삭제가 가능합니다.
- 플레이 했던 게임을 누르면 해담 게임의 기록을 볼 수 있습니다.
- 자신이 원하는대로 문제를 만들수 있습니다.


## How to run?
Frontend github url: [Frontend](https://github.com/Youout2020/youout-frontend)
Backend github url: [Backend](https://github.com/Youout2020/youout-backend)
Native github url: [Native](https://github.com/Youout2020/youout-native)

> ✅ 해당 repo에서 코드를 받아온 뒤 .env.sample 파일의 형식에 맞게 환경 변수를 넣어줍니다.
> ❗️ backend code는 항상 필요하고, nanive를 확인하려면 frontend와 backend 모두 필요합니다.
> ❗️ native를 확인하려면 expo 설치가 필요합니다.


1. 해당하는 repo를 한폴더에 받아줍니다.
2. 환경 변수를 sample에 맞게 작성해 줍니다.

🔶 sample script
```
cd ./frontend && npm run dev
cd ./backend && npm run dev
```

3. 터미널창 두개를 열고 sample script를 실행시켜 줍니다.
4. react server 에 들어가 줍니다. default server https://localhost:3000

## Tech stack

- ### Core stack MERN
  - Mongo DB
    toy project로 간편한 DB수정과 빠른 목업이 가능하다는 점에서 이번 프로젝트에서 사용하였습니다.
    - mongoose
      mongo db를 더욱 강력하게 사용할수 있는 Object-Document Mapper.
    - mongoose-paginate
      pagination 기능을 사용하기 위한 mongoose plugin입니다. 대기방에서 infinity scroll을 구현하기 위해 사용하기로 결정했습니다.
  - Express
    express는 nodejs 진영에서 대체할수 없는 가장 강력한 프레임 워크중 하나입니다. express의 가장 큰 장점은 frontend와 같은 언어를 사용하여 빠르고 코드를 작성할수 있고 로직을 공유할수 있다는 점입니다. 실제로 이번 프로젝트에서 frontend에서 처리하는 aws-sdk service를 secret key가 노출되는 이슈로 해당 로직을 backend로 옮길 필요가 있었는데 같은 언어를 사용한다는 점에서 간편하게 로직을 옮길수 있었습니다.
    - jsonwebtoken
      로그인 서비스는 클라이언트와 토큰을 주고 받으며 진행됩니다. 토큰을 encoding 하는 방식은 가장 대중적인 jsonwebtoken을 사용했습니다.
    - socket.io
      실시간으로 주변의 친구들과 통신을 주고 받아야 하기때문에 websocket을 사용할 필요가 있었습니다. socket.io는 websocket을 구현하기위해 사용되는 가장 대중적인 라이브러리 입니다.
  - React & React-native
    react는 vue와 더불어 frontend진영에서 사용되는 강력한 프레임워크중 하나입니다. 이번 프로젝트에서 저희는 모든 플랫폼을 지원하려는 목표가 있었기 때문에 한가지 문법으로 두가지 코드는 쉽게 병행 할수있는 프레임 워크가 필요했습니다. 따라서 react 와 react-native는 저희에게 가장 적합한 선택이었습니다.
    - redux, react-redux, redux-thunk, @reduxjs/toolkit
      redux는 mobx와 더불어 react 프레임워크 진영에서 상태관리를 하기위한 툴중 가장 유명한툴중 하나입니다. 이번 프로젝트에서 새로운 기술은 react native를 사용하기 때문에 상태관리 라이브러리는 이미 익숙한 redux를 사용하기로 했습니다.
  - Node JS
    nodejs는 javascript로 실행하는 서버사이드 플랫폼입니다. react를 이용한 frontend 개발과 express를 이용한 backend개발을 위해서 사용되었습니다.

- ### Third party stack
  - Git
    version controller
  - Jest, React-testing-library, Mocha, Chai, Sinon
    - jest, react-testing-library를 이용하여 유닛 단위의 컴포넌트 테스트를 진행하였습니다.
    - Mocha, Chai, Sinon을 이용하여 backend middleware, controller 테스트를 진행하였습니다.

## Task tools
- Figma [link]()
  mockup 디자인을 위한 디자인 툴
- Lucid chart [link]()
  mockup schema를 위한 schema 툴
- Notion [link]()
  task card를 분배하기 위한 노트

## Work flow
- Planning: [2020. 11. 9 - 2020. 11. 15]
계획 주때는 tast tool들을 활용하여 목업 디자인과 스키마를 짬

- Task: [2020. 11. 16 - 2020. 11. 27]

## Daily retrospective T-I-L
test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test

## Before and After
Git을 혼자서만 사용해봤는데 누군가와 협업을 해본다는 것이 정말 상상이 가지 않았습니다.. 특히, merge나 pull을 하는 과정에서 타인의 작업을 망칠 수도 있다는 생각이 들어서 더 두려움이 있었습니다. 지금은 처음과는 다르게 협업툴로서의 Git을 경험할 수 있었고, 이후 프로젝트부터는 더 계획적인 Git 활용이 가능할 것 같고, 더 많은 Git 공부를 할 필요를 느꼈습니다.

프로젝트 수립부터 구현까지 모든 과정을 적용해 본것은 처음이고 협업도 처음이었기 때문에 걱정이 앞섰습니다. 초기 계획을 꼼꼼하게 짜고 시작해서 괜찮을거라 생각했지만, Git을 다루는 작업이나 서로의 태스크를 나눠서 가져가는 부분이 막상 시작하고나니 많이 꼬였습니다. 협업이라는건 상대방을 배려하고 대화를 많이 나누면서 의견을 맞춰 나가야 된다고 생각했습니다.

## Future plan
- 이미지 인식률 향상
  처음 접근 방향은 텐서플로우를 활용하여 사물을 인식하려고 하였으나 인식률이 낮은 문제가 있어서 aws rekognition 인식 서비스를 사용하였습니다. 하지만 aws rekognition도 인식률이 좋지 않아서 해당 부분을 사용자가 낸 키워드를 잘 인식할수 있게끔 유도가 필요합니다.

- 친구 초대 기능 추가

- 문제 유형 다양화
  aws rekognition 서비스를 사용하므로 해당 api의 다양한 기능을 활용할수 있습니다. 다양한 기능으로 추가적인 문제 다양화를 하면 좋을것 같습니다.

- 백엔드 env.sample 만들어주세요...
