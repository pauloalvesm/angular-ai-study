<h1 align="center">AI Study</h1>

<p align="center">
  <a href="https://angular.io/"><img alt="Angular" src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" /></a>
</p>

## 💻 Project

A repository with a single-page application designed for use with artificial intelligence; this application connects to the project
[DotNet AI API](https://github.com/pauloalvesm/dotnet-ai-api)

## 📘 Business Rule

The application allows for separate API interactions within components designed for specific purposes:

- Asking questions and obtaining answers.
- Generating food recipes based on the country.
- Creating images based on descriptions.

## 🚀 Technologies and Tools

This project was developed using the following technologies:

- **Frontend:**  
  - `Angular CLI v19.2.19`
  - `Node.js v22.13.1`
  - `NPM v11.1.0`
  - `Bootstrap v5.3.8`
  - `Bootstrap Icons v1.13.1`
    
- **Testing:**  
  - `Jasmine`
  - `Karma`
 
## 💾 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/pauloalvesm/angular-ai-study.git

# Navigate to the project folder
cd angular-ai-study

# Restore dependencies
npm install

# Run the project
ng s -o

```

## ℹ️ Implement API key

Inside the `src` folder, there is another folder called `environments`. In that folder, I created the `environment.ts` file and added the [Backend URL](https://github.com/pauloalvesm/dotnet-ai-api) to enable communication with the frontend, using the following structure:

```bash
export const environment = {
  production: false,
  apiKey: 'URL_API',
};
```

## 📷 Screenshots

<p align="center"> <img src="https://github.com/pauloalvesm/angular-ai-study/blob/master/public/images/screenshot-1.png?raw=true"/></p>
<p align="center"> <img src="https://github.com/pauloalvesm/angular-ai-study/blob/master/public/images/screenshot-2.png?raw=true"/></p>
<p align="center"> <img src="https://github.com/pauloalvesm/angular-ai-study/blob/master/public/images/screenshot-3.png?raw=true"/></p>

## 👤 Author

**[Paulo Alves](https://github.com/pauloalvesm)**
