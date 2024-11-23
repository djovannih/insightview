# InsightView

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A powerful web application that streamlines the journalism workflow by automating interview transcription, highlights extraction, and article generation. Built for the dev.to [AssemblyAI Challenge](https://dev.to/challenges/assemblyai).

## 📑 Table of Contents

- [InsightView](#insightview)
  - [📑 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [✨ Features](#-features)
    - [Interview Transcription](#interview-transcription)
    - [Content Analysis](#content-analysis)
    - [Article Generation](#article-generation)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [💻 Usage](#-usage)
    - [Development](#development)
    - [Production](#production)
  - [⚙️ Configuration](#️-configuration)
    - [Environment Variables](#environment-variables)
  - [📄 License](#-license)
  - [🙏 Acknowledgments](#-acknowledgments)

## 🎯 Overview

InsightView revolutionizes the journalism workflow by providing an integrated platform for managing interview content. It leverages AI technology to automate time-consuming tasks, allowing journalists to focus on crafting compelling stories.

## ✨ Features

### Interview Transcription

- **Audio/Video Upload**: Support for multiple media formats
- **Real-time Preview**: Preview uploads before processing
- **Advanced Transcription**: Powered by AssemblyAI Speech Recognition
- **Speaker Identification**: Automatic speaker detection and naming using LeMUR
- **Export Options**: Download transcripts in VTT format

### Content Analysis

- **Smart Highlights**: Automatic extraction of key interview moments
- **Context Preservation**: View highlights within the original interview context

### Article Generation

- **AI-Powered Drafting**: Generate article drafts using LeMUR
- **HTML-Ready Format**: Export articles in ready-to-publish HTML format

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Code Quality**:
  - Prettier for formatting
  - ESLint for linting
- **AI Integration**: AssemblyAI API

## 🚀 Getting Started

### Prerequisites

- Node.js
- AssemblyAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/insightview.git
cd insightview
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy the environment variables file:

```bash
cp .env.example .env.local
```

4. Add your AssemblyAI API key to `.env.local`:

```plaintext
NEXT_PUBLIC_ASSEMBLYAI_API_KEY=<YOUR_API_KEY>
```

## 💻 Usage

### Development

Start the development server:

```bash
pnpm dev
```

### Production

Build and start the production server:

```bash
pnpm build
pnpm start
```

## ⚙️ Configuration

### Environment Variables

| Variable                         | Description             | Required |
| -------------------------------- | ----------------------- | -------- |
| `NEXT_PUBLIC_ASSEMBLYAI_API_KEY` | Your AssemblyAI API key | Yes      |

See `.env.example` for reference.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [AssemblyAI](https://www.assemblyai.com/) for providing the AI capabilities
- [Shadcn](https://ui.shadcn.com/) for the excellent UI components
- The [dev.to](https://dev.to) community for organizing the challenge

---

Made with ❤️ by Giovanni Improta
