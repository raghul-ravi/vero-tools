/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useRef} from 'react';
import {analyzeAppraisal} from '../services/llmService.js';
import './AppraisalAnalysis.css';

function AppraisalAnalysis() {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFileDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileDataUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setLoading(true);
    setAnalysis('');

    try {
      const analysisText = await analyzeAppraisal(file, fileDataUrl);
      setAnalysis(analysisText);
    } catch (error) {
      setAnalysis(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAnalysis('');
    handleRemoveFile();
  };

  return (
    <div className="feature-container">
      <h1>Appraisal Analysis</h1>
      <p className="feature-description">
        Upload an appraisal document to get a comprehensive analysis including property details, valuation, comparables, and risk factors.
      </p>

      <form onSubmit={handleAnalyze}>
        <div className="upload-area">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf, text/xml, application/xml"
            style={{ display: 'none' }}
            aria-hidden="true"
          />

          {!file ? (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="upload-btn"
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Upload Appraisal Document</span>
              <small>PDF or XML</small>
            </button>
          ) : (
            <div className="file-preview">
              <div className="pdf-preview">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>{file.name}</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="remove-file-btn"
                aria-label="Remove file"
              >
                &times;
              </button>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button
            type="submit"
            className="analyze-btn"
            disabled={!file || loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Appraisal'}
          </button>
          {analysis && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
            >
              Clear & New Upload
            </button>
          )}
        </div>
      </form>

      {analysis && (
        <div className="analysis-container">
          <h2>Analysis Results</h2>
          <div className="analysis-content">
            <p>{analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppraisalAnalysis;
