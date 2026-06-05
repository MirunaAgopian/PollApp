# PollApp

A simple Angular application for creating surveys and voting in real time. version 21.2.7.

# I. Features
1. Create surveys with multiple questions and options
2. Vote and see results update in real time
3. Modular, component‑based architecture
4. SUPABASE backend for data and real‑time updates

# II. Project Structure
```
poll-app/
│
├── dist/                         # Production build output (auto-generated)
├── node_modules/                 # Dependencies (auto-generated)
│
├── public/                       # Static assets served as-is
│   ├── assets/                   # Images, icons, fonts (served directly)
│   └── favicon.svg               # App favicon
│
├── src/
│   ├── app/                      # Main application code
│   │   │
│   │   ├── core/                 # Global logic and app-wide utilities
│   │   │   ├── interfaces/       # Data models (Survey, Question, Option, Vote)
│   │   │   └── services/         # CRUD services + Supabase client
│   │   │
│   │   ├── features/             # Reusable domain components
│   │   │   ├── options/          # Option-item + create-option
│   │   │   ├── questions/        # Question-item + create-question
│   │   │   ├── surveys/          # Create-survey, survey-detail, survey-list
│   │   │   └── votes/            # Vote-results
│   │   │
│   │   ├── pages/                # Routed pages
│   │   │   ├── landing-page/     # Displays survey list
│   │   │   ├── survey-create/    # Survey creation workflow
│   │   │   └── survey-page/      # Survey detail + voting
│   │   │
│   │   ├── shared/               # Reusable UI elements and utilities
│   │   │   ├── components/       # Dialog, dropdown, delete-btn
│   │   │   ├── constants/        # Survey categories
│   │   │   └── pipes/            # Percentage pipe
│   │   │
│   │   ├── app.config.ts         # App configuration
│   │   ├── app.routes.ts         # Routing setup
│   │   ├── app.component.*       # Root component
│   │   └── app.ts                # App bootstrap
│   │
│   ├── styles/                   # Global SCSS architecture
│   │   ├── abstracts/            # Colors, mixins
│   │   ├── base/                 # Reset, typography, global styles
│   │   ├── components/           # Buttons, cards, inputs, checkbox, hero
│   │   ├── layout/               # Spacing utilities
│   │   └── main.scss             # Imports all partials
│   │
│   ├── index.html                # App entry HTML
│   ├── main.ts                   # Angular bootstrap
│   └── styles.scss               # Imports main.scss
│
├── angular.json                  # Angular workspace config
├── package.json                  # Project metadata + scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

# III. Tech Stack
- Angular V21
- TypeScript
- SCSS
- SUPABASE

# IV. Development
npm run install
npm run start
npm run build

# V. License — MIT
This project is licensed under the MIT License.
You are free to use, modify, and distribute it with proper attribution.
