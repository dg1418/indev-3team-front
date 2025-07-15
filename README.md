# Indev-Front 프로젝트

이 프로젝트는 React 기반의 프론트엔드 애플리케이션입니다.

## 프로젝트 구조

이 프로젝트는 확장성과 유지보수성을 위해 기능 기반 및 역할 기반 폴더 구조를 혼합하여 사용합니다.

```
src/
├── api/
│   └── client.js            # API 요청 클라이언트 (axios 인스턴스 등)
├── assets/
│   ├── images/
│   └── fonts/
├── components/
│   ├── common/              # 공통 재사용 컴포넌트 (Button, Input, Modal 등)
│   └── layout/              # 페이지 레이아웃 컴포넌트 (Header, Footer, Sidebar 등)
├── hooks/
│   └── useAuth.js           # 커스텀 훅 (인증, 폼 처리 등)
├── pages/
│   ├── HomePage.js
│   └── LoginPage.js
├── services/
│   ├── authService.js       # 도메인별 API 요청 함수 (인증 관련)
│   └── postService.js       # (게시글 관련)
├── styles/
│   └── global.css           # 전역 스타일
├── utils/
│   └── formatDate.js        # 순수 유틸 함수
├── App.js                   # 라우팅 및 전역 상태 관리를 위한 메인 애플리케이션 컴포넌트
└── index.js                 # 애플리케이션 진입점
```

### 폴더 설명

*   **`api/`**: 백엔드 서버와 통신하기 위한 중앙 HTTP 클라이언트(예: `axios`)를 관리합니다. 인증 토큰을 헤더에 추가하는 것과 같은 공통 로직을 여기서 처리합니다.
*   **`assets/`**: 이미지, 폰트와 같은 정적 파일을 저장합니다.
*   **`components/`**: UI 컴포넌트를 포함합니다.
    *   `common/`: `Button`, `Input` 등과 같이 범용적으로 재사용 가능한 컴포넌트.
    *   `layout/`: `Header`, `Footer`와 같이 전체 페이지 구조를 정의하는 컴포넌트.
*   **`hooks/`**: 상태 관련 로직을 캡슐화하고 재사용하기 위한 커스텀 React 훅을 저장합니다.
*   **`pages/`**: `HomePage`, `AboutPage`와 같이 전체 페이지를 나타내는 컴포넌트를 포함합니다. 이 컴포넌트들은 `components/` 디렉토리의 작은 컴포넌트들을 조립하여 구성됩니다.
*   **`services/`**: 백엔드 API를 호출하는 함수들을 도메인별로 그룹화하여 포함합니다 (NestJS의 서비스와 유사). `api/`의 클라이언트를 사용하여 실제 요청을 보냅니다.
*   **`styles/`**: `reset.css` 또는 전역 스타일 정의와 같은 전역 CSS 파일을 관리합니다.
*   **`utils/`**: 날짜 포맷팅, 유효성 검사와 같은 순수하고 프레임워크에 의존하지 않는 유틸리티 함수를 위한 폴더입니다.
*   **`App.js`**: 주로 클라이언트 사이드 라우팅 및 전역 컨텍스트 제공을 담당하는 루트 컴포넌트입니다.
*   **`index.js`**: React 앱이 DOM에 마운트되는 애플리케이션의 진입점입니다.

# Create React App으로 시작하기

이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app)으로 부트스트랩되었습니다.

## 사용 가능한 스크립트

프로젝트 디렉토리에서 다음을 실행할 수 있습니다:

### `npm start`

개발 모드에서 앱을 실행합니다.\
브라우저에서 보려면 [http://localhost:3000](http://localhost:3000)을 여세요.

변경 사항을 적용하면 페이지가 다시 로드됩니다.\
콘솔에서 린트 오류를 볼 수도 있습니다.

### `npm test`

대화형 관찰 모드에서 테스트 러너를 시작합니다.\
테스트 실행에 대한 자세한 내용은 [running tests](https://facebook.github.io/create-react-app/docs/running-tests) 섹션을 참조하세요.

### `npm run build`

프로덕션을 위해 앱을 `build` 폴더에 빌드합니다.\
React를 프로덕션 모드에서 올바르게 번들하고 최상의 성능을 위해 빌드를 최적화합니다.

빌드는 축소되고 파일 이름에는 해시가 포함됩니다.\
앱을 배포할 준비가 되었습니다!

배포에 대한 자세한 내용은 [deployment](https://facebook.github.io/create-react-app/docs/deployment) 섹션을 참조하세요.

### `npm run eject`

**참고: 이것은 단방향 작업입니다. `eject`를 한 번 실행하면 되돌릴 수 없습니다!**

빌드 도구 및 구성 선택에 만족하지 않으면 언제든지 `eject`할 수 있습니다. 이 명령은 프로젝트에서 단일 빌드 종속성을 제거합니다.

대신 모든 구성 파일과 전이 종속성(webpack, Babel, ESLint 등)을 프로젝트에 바로 복사하여 모든 것을 완벽하게 제어할 수 있습니다. `eject`를 제외한 모든 명령은 계속 작동하지만 복사된 스크립트를 가리키므로 이를 조정할 수 있습니다. 이 시점부터는 스스로 관리해야 합니다.

`eject`를 사용할 필요는 없습니다. 선별된 기능 세트는 소규모 및 중간 규모 배포에 적합하며 이 기능을 사용해야 한다는 의무감을 느낄 필요는 없습니다. 그러나 준비가 되었을 때 사용자 정의할 수 없다면 이 도구가 유용하지 않다는 것을 알고 있습니다.

## 더 알아보기

[Create React App 문서](https://facebook.github.io/create-react-app/docs/getting-started)에서 더 많은 것을 배울 수 있습니다.

React를 배우려면 [React 문서](https://reactjs.org/)를 확인하세요.

### 코드 분할

이 섹션은 [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)으로 이동했습니다.

### 번들 크기 분석

이 섹션은 [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)로 이동했습니다.

### 프로그레시브 웹 앱 만들기

이 섹션은 [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)으로 이동했습니다.

### 고급 구성

이 섹션은 [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)으로 이동했습니다.

### 배포

이 섹션은 [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)으로 이동했습니다.

### `npm run build`가 축소에 실패하는 경우

이 섹션은 [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)로 이동했습니다.
