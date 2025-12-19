# Architecture & Directory Structure

## 1. Architectural Philosophy

**PLOLUX**의 아키텍처는 **Feature-Sliced Design (FSD)**의 모듈성과 **Atomic Design**의 컴포넌트 재사용성을 결합하여 설계되었습니다.
이 구조는 **확장성(Scalability)**, **유지보수성(Maintainability)**, 그리고 **명확한 책임 분리(Separation of Concerns)**를 최우선으로 합니다.

### Core Patterns

- **Feature-Sliced Design (Lite)**: 비즈니스 로직을 기능(Feature) 단위로 격리하여 도메인 복잡도를 낮춥니다.
- **Atomic Design**: UI 컴포넌트를 입자(Atom)에서 생명체(Organism)로 발전시키며 일관된 디자인 시스템을 구축합니다.
- **Next.js App Router**: 서버 컴포넌트(RSC)를 적극 활용하여 성능과 SEO를 최적화합니다.

---

## 2. Directory Structure Tree

```plaintext
packages/plolux/
├── src/
│   ├── app/                      # [Routing Layer] Next.js App Router
│   │   ├── (public)/             # 마케팅 및 랜딩 페이지 (Static/ISR)
│   │   ├── (app)/                # 실제 서비스 어플리케이션 (Auth Required)
│   │   ├── api/                  # Backend Proxy / Route Handlers
│   │   ├── layout.tsx            # Global Root Layout
│   │   └── page.tsx              # Entry Point
│   │
│   ├── components/               # [View Layer] Shared UI Components (Atomic Design)
│   │   ├── atomic/               # (Atoms) 버튼, 인풋, 아이콘 등 쪼갤 수 없는 최소 단위
│   │   ├── molecules/            # (Molecules) 검색바, 카드 등 Atom의 조합
│   │   ├── organisms/            # (Organisms) 헤더, LNB, 복잡한 폼 등
│   │   └── templates/            # (Templates) 페이지 레이아웃 스켈레톤
│   │
│   ├── features/                 # [Domain Layer] Business Logic Segments
│   │   ├── authentication/       # Auth 관련 로직, 훅, 컨텍스트
│   │   ├── showcase/             # 작품 전시/포트폴리오 도메인
│   │   └── [feature-name]/       # 추가 기능을 위한 독립적 슬라이스
│   │
│   ├── lib/                      # [Infrastructure Layer] Shared Utilities
│   │   ├── figma-mcp/            # Figma Design to Code 어댑터 및 변환기
│   │   ├── utils.ts              # cn(), date formatting 등 공용 유틸리티
│   │   └── constants.ts          # 전역 상수 관리
│   │
│   ├── styles/                   # [Design System Layer]
│   │   ├── tokens.css            # CSS Variables (Color, Typography, Spacing)
│   │   └── globals.css           # Tailwind Directives & Reset
│   │
│   └── types/                    # [Type Layer] Global TypeScript Definitions
│       └── global.d.ts
│
├── public/                       # Static Assets (Images, Fonts)
├── .eslintrc.cjs                 # Linting Configuration
├── next.config.mjs               # Next.js Configuration
├── tailwind.config.ts            # Tailwind CSS Configuration
└── tsconfig.json                 # TypeScript Configuration
```

---

## 3. Layer Details

### 3.1 Routing Layer (`src/app`)

Next.js 15+ App Router 구조를 따릅니다.

- **Route Groups**: `(public)`, `(app)`과 같이 소괄호를 사용하여 URL 경로에 영향을 주지 않고 레이아웃을 분리합니다.
  - `(public)`: 마케팅 페이지, 랜딩 등 로그인 없이 접근 가능한 영역.
  - `(app)`: 대시보드, 설정 등 인증이 필요한 어플리케이션 영역.
- **API Routes**: `api/` 디렉토리 하위에서 백엔드 로직 및 프록시 처리를 수행합니다.

### 3.2 View Layer (`src/components`)

UI 컴포넌트는 철저하게 **Atomic Design** 방법론을 따릅니다.

- **Atoms**: 상태를 가지지 않는 순수 렌더링 컴포넌트 (예: `Button.tsx`, `Icon.tsx`).
- **Molecules**: Atom들이 모여 구체적인 기능을 수행하는 단위 (예: `SearchBar.tsx`).
- **Organisms**: 비즈니스 로직이 주입될 수 있는 복합 UI (예: `Header.tsx`, `LoginForm.tsx`).
- **Templates**: 실제 콘텐츠가 채워지기 전의 페이지 구조 (Wireframe 역할).

### 3.3 Domain Layer (`src/features`)

FSD(Feature-Sliced Design)의 `features` 슬라이스에 해당합니다.

- 각 폴더는 특정 비즈니스 도메인(`auth`, `payment` 등)을 담당합니다.
- UI 컴포넌트가 아닌, **로직(Hooks, State, Types)**과 해당 기능에만 종속된 컴포넌트를 포함합니다.
- **응집도(Cohesion)**를 높이고, 도메인 간의 **결합도(Coupling)**를 낮추는 역할을 합니다.

### 3.4 Infrastructure Layer (`src/lib`)

애플리케이션 전반에서 사용되는 공통 기능을 제공합니다.

- **`figma-mcp/`**: Figma 디자인 데이터를 코드로 변환하거나 매핑하는 핵심 로직이 위치합니다.
- 외부 라이브러리 래퍼, API 클라이언트 설정 등이 포함됩니다.

### 3.5 Design System Layer (`src/styles`)

디자인의 'Truth'인 Figma와 코드를 연결하는 레이어입니다.

- **`tokens.css`**: Figma Variables와 1:1로 매핑되는 CSS 변수를 정의합니다.
- **Tailwind Config**: 이를 Tailwind 유틸리티 클래스로 확장하여 사용합니다.
