# Wikitable

A modern web application for extracting and downloading tables from Wikipedia pages into multiple formats.

This tool provides a clean interface to fetch, select, and download any table from a given Wikipedia URL. It is designed to streamline the data collection process for researchers, students, and data analysts by converting HTML tables into structured file formats.

## Features

- **Multi-Format Export**: Download tables as CSV, XLSX, or JSON
- **Batch Downloads**: Select and download multiple tables simultaneously
- **Data Preview**: View table dimensions (rows and columns) before downloading
- **Modern UI**: Fully responsive interface with light and dark modes

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS & Shadcn/ui |
| Scraping | Cheerio |
| File Generation | SheetJS (xlsx) |

## Getting Started

### Prerequisites

- Node.js
- npm or a compatible package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dhaifullahr/wikitable.git
```
```bash
cd wikitable
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Enter a Wikipedia URL in the input field
2. Click "Fetch Tables" to extract all tables from the page
3. Preview tables and their dimensions
4. Select one or multiple tables
5. Choose your desired export format (CSV, XLSX, or JSON)
6. Click "Download" to save your selected tables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Wikipedia](https://wikipedia.org) for providing the data source
