# IntelliMED

**IntelliMED** is a frontend application built with **React** and **Vite**.  
It provides a responsive user interface for managing patient assessments, vitals, registration, and more—designed with modern tooling and best practices.

---

## Features

- Authentication (login / registration)
- Patient management dashboard
- General and overweight assessment workflows
- Vital sign tracking page
- Mobile‑friendly, component‑based UI
- Tailwind CSS for styling
- Fast development with Vite HMR
- ESLint + Prettier for code quality

---

## Technology Stack

- **React 18** (hooks & JSX)
- **Vite** as the build tool
- **Tailwind CSS** for utility‑first styling
- **ESLint** (with recommended React rules)
- **PostCSS** configuration
- Modern JavaScript (ESM) in a Windows environment

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your‑repo‑url>
   cd intellihealth
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # opens at http://localhost:5173 by default
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview the production build**
   ```bash
   npm run serve
   ```

---

## Project Structure

```
src/
  assets/
  components/
    Header.jsx
  pages/
    GeneralAssessmentPage.jsx
    LandingPage.jsx
    LoginPage.jsx
    NotFound.jsx
    OverweightAssessmentPage.jsx
    PatientsPage.jsx
    RegisterPage.jsx
    SignupPage.jsx
    VitalsPage.jsx
  App.jsx
  main.jsx
  App.css
  index.css
```

---

## Available Scripts

| Script           | Description                          |
|------------------|--------------------------------------|
| `npm run dev`    | Start dev server with HMR            |
| `npm run build`  | Create a production build            |
| `npm run serve`  | Preview production build locally     |
| `npm run lint`   | Run ESLint on source files (if configured) |



---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feat/your-feature`).
5. Open a pull request describing your changes.

