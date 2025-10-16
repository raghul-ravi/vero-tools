# Ask Gemini

A simple, modern chat interface powered by Google's Gemini 2.5 Flash AI model. Send text messages, attach images or PDFs, and get real-time streaming responses.

## Features

- **Google Gemini 2.5 Flash**: Powered by Google's latest AI model
- **Text Chat**: Ask questions and get intelligent responses
- **File Upload**: Attach images (PNG, JPG, WEBP) or PDFs to your messages
- **Streaming Responses**: See the AI's response appear in real-time
- **Clean UI**: Modern, Google-inspired interface with smooth interactions
- **File Preview**: Preview attached files before sending
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd credit-report-reviewer
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
# Replace 'your_google_gemini_api_key_here' with your actual API key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

1. **Text-only messages**: Type your question in the input field and click "Send"
2. **With file attachment**:
   - Click the attachment icon (paperclip) to select an image or PDF
   - Add your message in the text field
   - Click "Send"
3. **Remove attachment**: Click the X button on the file preview to remove it
4. Watch the AI's response stream in real-time in the response container

### Supported File Types

- Images: PNG, JPEG, WEBP
- Documents: PDF

## Development

### Project Structure

```
src/
├── App.jsx              # Main chat application
├── App.css              # Application styles
├── main.jsx             # React entry point
├── index.css            # Global styles
└── assets/              # Static assets
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Privacy & Security

- **Environment variables**: Your API key is stored securely in a `.env` file (not in the browser)
- **Direct communication**: The app communicates directly with Google Gemini - no intermediary servers
- **Client-side only**: All processing happens in your browser
- **No data storage**: Messages and files are not stored - they're sent directly to Gemini

## Important Notes

- API usage may incur costs from Google. Check their [pricing page](https://ai.google.dev/pricing) for details.
- **Never commit your `.env` file to version control** - it's already in `.gitignore` for security.
- Files are converted to base64 and sent with your message to the Gemini API
- Streaming responses provide a better user experience but require a stable internet connection

## Technologies Used

- React 19
- Vite
- Google Generative AI SDK (@google/genai)
- Modern CSS with responsive design

## License

Apache-2.0

## Support

For issues or questions about this application, please open an issue on the project repository.

For Google Gemini API support, visit the [Google AI documentation](https://ai.google.dev/docs).
