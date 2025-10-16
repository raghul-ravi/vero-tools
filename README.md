# Vero Tools

AI-powered mortgage document analysis platform built with React 19 and Google Gemini 2.5 Flash. Streamline your mortgage workflow with intelligent document processing for credit reports, appraisals, and title documents.

## Features

### 🏦 Credit Report Validator
- **Comprehensive Analysis**: Extract and validate personal information, credit summary, payment history, and more
- **Structured Data**: Parse credit reports into organized JSON format
- **Risk Assessment**: Identify validation issues with severity levels (High/Medium/Low)
- **Account Details**: View credit accounts, collections, public records, and inquiries in clean table format
- **Smart Insights**: Get recommendations for each validation issue

### 🏠 Appraisal Analysis
- **Property Details**: Extract address, type, square footage, lot size, and year built
- **Valuation Summary**: Understand appraised value and market trends
- **Comparables**: Review comparable properties and their features
- **Condition Assessment**: Identify property condition and repair needs
- **Risk Factors**: Highlight red flags and concerns
- **Market Analysis**: Get insights on local market conditions

### 📜 Title Validation
- **Property Identification**: Extract address, legal description, and parcel information
- **Ownership Analysis**: Verify current owners and title holding structure
- **Liens & Encumbrances**: Identify mortgages, liens, and judgments
- **Easements & Restrictions**: List easements, covenants, and deed restrictions
- **Legal Issues**: Flag clouds on title and legal concerns
- **Risk Assessment**: Rate title risk as LOW, MEDIUM, or HIGH
- **Title Insurance**: Summarize coverage and exclusions

## Technology Stack

- **React 19** - Modern UI with hooks
- **Vite** - Fast development and build tool
- **Google Gemini 2.5 Flash** - AI-powered document analysis
- **CSS Custom Properties** - Professional styling system
- **Centralized Services** - Clean architecture with separated concerns

## UI/UX Features

- **Loading States**: Skeleton animations with shimmer effects
- **Empty States**: Friendly messages for sections with no data
- **Responsive Tables**: Horizontal scrolling for wide data tables
- **Table-Based Display**: Clean, scannable data presentation
- **Sidebar Navigation**: Collapsible sidebar for easy feature switching
- **Professional Design**: Enterprise-grade UI with smooth transitions
- **Mobile Responsive**: Works seamlessly on all device sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/raghul-ravi/vero-tools.git
cd vero-tools
```

2. Install dependencies:
```bash
npm install
```

3. Configure your Google Gemini API key:
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your API key
# VITE_API_KEY=your_google_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173` (or the URL shown in terminal)

## Usage

### Credit Report Validator

1. Click "Credit Validator" in the sidebar
2. Upload a credit report (PDF or XML)
3. Click "Validate Credit Report"
4. Review the structured analysis with:
   - Personal Information
   - Credit Summary
   - Payment History
   - Credit Accounts (table view)
   - Credit Inquiries
   - Public Records
   - Collections
   - Validation Issues with recommendations

### Appraisal Analysis

1. Click "Appraisal Analysis" in the sidebar
2. Upload an appraisal document (PDF or XML)
3. Click "Analyze Appraisal"
4. Review comprehensive analysis including property details, valuation, comparables, and risk factors

### Title Validation

1. Click "Title Validation" in the sidebar
2. Upload a title document (PDF or XML)
3. Click "Validate Title"
4. Review detailed validation including ownership, liens, easements, and risk assessment

### Supported File Types

- **PDF**: Portable Document Format
- **XML**: Structured XML documents

## Project Structure

```
src/
├── components/
│   ├── CreditAnalysis.jsx       # Credit report validator component
│   ├── CreditAnalysis.css       # Credit validator styles
│   ├── AppraisalAnalysis.jsx    # Appraisal analysis component
│   ├── AppraisalAnalysis.css    # Appraisal analysis styles
│   ├── TitleValidation.jsx      # Title validation component
│   ├── TitleValidation.css      # Title validation styles
│   ├── Sidebar.jsx              # Navigation sidebar
│   └── Sidebar.css              # Sidebar styles
├── services/
│   ├── llmService.js            # Centralized LLM API calls
│   └── prompts.js               # AI prompts configuration
├── App.jsx                      # Main application
├── App.css                      # App layout styles
├── main.jsx                     # React entry point
└── index.css                    # Global styles & CSS variables
```

## Architecture

### Service Layer

All AI interactions are centralized in the service layer:

- **`llmService.js`**: Contains all Google Gemini API calls
  - `validateCreditReport()` - Process credit reports
  - `analyzeAppraisal()` - Analyze appraisals
  - `validateTitle()` - Validate title documents

- **`prompts.js`**: Centralized prompt configuration
  - All AI prompts in one place for easy maintenance
  - Structured prompts for consistent outputs

### Component Architecture

- **Separation of Concerns**: UI components focus on presentation
- **Reusable Components**: Table, Badge, Section, EmptyState
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error messages and recovery

## Development

### Build for Production

```bash
npm run build
```

Production files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Privacy & Security

- **Secure API Keys**: API keys stored in `.env` file (never committed)
- **Direct Communication**: App communicates directly with Google Gemini
- **Client-Side Only**: All processing happens in the browser
- **No Data Storage**: Documents are not stored, only processed
- **HTTPS Only**: Secure communication with AI services

## Important Notes

- API usage may incur costs. Check [Google AI Pricing](https://ai.google.dev/pricing)
- **Never commit `.env` file** - it's in `.gitignore` for security
- Documents are base64-encoded for transmission to Gemini API
- Ensure stable internet connection for optimal performance
- Large documents may take longer to process

## Environment Variables

Required environment variables (in `.env`):

```bash
VITE_API_KEY=your_google_gemini_api_key_here
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Apache-2.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- **Issues**: Open an issue on [GitHub](https://github.com/raghul-ravi/vero-tools/issues)
- **Google Gemini API**: Visit [Google AI Documentation](https://ai.google.dev/docs)

## Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- Developed with [Vite](https://vitejs.dev/)

---

**Note**: This application is designed for mortgage professionals to streamline document analysis workflows. Always verify AI-generated insights with original documents.
