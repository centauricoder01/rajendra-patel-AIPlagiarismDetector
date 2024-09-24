# AI Plagiarism Detector

This project is an AI-powered plagiarism detection tool that allows users to upload PDF or Docx files and receive a detailed report on the plagiarized content. It is built using **Next.js** with **TypeScript**, styled with **ShadCN** and **Tailwind CSS**.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Project](#running-the-project)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- **Upload PDF or Docx Files**: Upload documents to get a full plagiarism report.
- **Detailed Plagiarism Report**: Get a detailed report including the percentage of plagiarized content and highlighted sections.
- **AI-Powered Detection**: Utilizes OpenAI's API for advanced plagiarism detection.

## Tech Stack

- **Next.js** (v14)
- **TypeScript**
- **ShadCN**
- **Tailwind CSS**
- **OpenAI API**

## Getting Started

Follow the instructions below to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v16 or later): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **OpenAI API Key**: [Get an API Key](https://openai.com/api/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/centauricoder01/rajendra-patel-AIPlagiarismDetector.git
   
2. **Navigate to the project directory:**
   ```bash
   cd rajendra-patel-AIPlagiarismDetector

3. **Install dependencies:**
   ```bash
   npm install


### Configuration

Create a `.env.local` file in the root directory of your project and add the following environment variables:

  ```bash
  # OpenAI API Key
  OPENAI_API_KEY=your-openai-api-key
  
  # OpenAI URL
  OPENAI_URL=https://api.openai.com/v1/your-endpoint

```
### Running the Project

  ```bash
    npm run dev
  ```

### Build for production:
  ```bash
    npm run build
  ```
### Folder Structure

  ```ruby
ai-plagiarism-detector/
├── public/         # Static assets
├── src/            # Source files
│   ├── app/
        ├── api/     #All APIs
        ├── other_page/     #Other Pages
│   ├── components/  # Reusable components
│   ├── hooks/      # custom hooks
│   └── libs/      # Utility functions
├── .env.local      # Environment variables
├── next.config.js  # Next.js configuration
├── package.json    # Dependencies and scripts
├── README.md       # Project documentation
└── tsconfig.json   # TypeScript configuration
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

1. **Fork the repository**:

   Go to the repository on GitHub and click the "Fork" button at the top right corner.

2. **Create a feature branch**:

   ```bash
   git checkout -b feature-name

3. ***Commit your changes**:
     ```bash
     git commit -m 'Add some feature'
     
4. **Push to the branch**:
     ```bash
     git push origin feature-name
     ```

## Thank you for your contribution! If you found this project helpful, please consider giving it a star ⭐.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.




