/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useRef} from 'react';
import {analyzeAppraisal} from '../services/llmService.js';
import './AppraisalAnalysis.css';

function AppraisalAnalysis() {
  const [appraisalData, setAppraisalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAppraisalData(null);
      setError('');
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
    setAppraisalData(null);
    setError('');
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
    setError('');
    setAppraisalData(null);

    try {
      const parsedData = await analyzeAppraisal(file, fileDataUrl);
      setAppraisalData(parsedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
          {appraisalData && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleRemoveFile}
            >
              Clear & New Report
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {appraisalData && !loading && (
        <div className="analysis-container">
          <AppraisalDisplay data={appraisalData} />
        </div>
      )}
    </div>
  );
}

function AppraisalDisplay({ data }) {
  return (
    <div className="appraisal-sections">
      {/* Property Details */}
      <Section title="Property Details" icon="🏠">
        <InfoGrid>
          <InfoItem label="Address" value={data.propertyDetails.address} fullWidth />
          <InfoItem label="Property Type" value={data.propertyDetails.propertyType} />
          <InfoItem label="Square Footage" value={data.propertyDetails.squareFootage} />
          <InfoItem label="Lot Size" value={data.propertyDetails.lotSize} />
          <InfoItem label="Year Built" value={data.propertyDetails.yearBuilt} />
          <InfoItem label="Bedrooms" value={data.propertyDetails.bedrooms} />
          <InfoItem label="Bathrooms" value={data.propertyDetails.bathrooms} />
          <InfoItem label="Garage" value={data.propertyDetails.garageSpaces} />
        </InfoGrid>
      </Section>

      {/* Valuation */}
      <Section title="Valuation" icon="💰">
        <InfoGrid>
          <InfoItem label="Appraised Value" value={data.valuation.appraisedValue} highlight />
          <InfoItem label="Purchase Price" value={data.valuation.purchasePrice} />
          <InfoItem label="Price per Sq Ft" value={data.valuation.pricePerSqFt} />
          <InfoItem label="Market Trend" value={data.valuation.marketTrend} />
          <InfoItem label="Appraisal Date" value={data.valuation.appraisalDate} />
          <InfoItem label="Effective Date" value={data.valuation.effectiveDate} />
          <InfoItem label="Days on Market" value={data.valuation.daysOnMarket} />
        </InfoGrid>
      </Section>

      {/* Comparables */}
      <Section title="Comparable Properties" icon="📊" count={data.comparables?.length}>
        {data.comparables?.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Sale Price</th>
                <th>Sale Date</th>
                <th>Sq Ft</th>
                <th>Bed/Bath</th>
                <th>Price/Sq Ft</th>
                <th>Proximity</th>
                <th>Adjustments</th>
              </tr>
            </thead>
            <tbody>
              {data.comparables.map((comp, i) => (
                <tr key={i}>
                  <td>{comp.address}</td>
                  <td>{comp.salePrice}</td>
                  <td>{comp.saleDate}</td>
                  <td>{comp.squareFootage}</td>
                  <td>{comp.bedrooms}/{comp.bathrooms}</td>
                  <td>{comp.pricePerSqFt}</td>
                  <td>{comp.proximity}</td>
                  <td>{comp.adjustments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No comparable properties found" />
        )}
      </Section>

      {/* Condition Assessment */}
      <Section title="Condition Assessment" icon="🔍">
        <InfoGrid>
          <InfoItem label="Overall Condition" value={data.conditionAssessment.overallCondition} highlight />
          <InfoItem label="Exterior" value={data.conditionAssessment.exteriorCondition} />
          <InfoItem label="Interior" value={data.conditionAssessment.interiorCondition} />
          <InfoItem label="Roof" value={data.conditionAssessment.roofCondition} />
          <InfoItem label="Foundation" value={data.conditionAssessment.foundationCondition} />
          <InfoItem label="Estimated Repair Cost" value={data.conditionAssessment.estimatedRepairCost} />
        </InfoGrid>
        {data.conditionAssessment.repairsNeeded?.length > 0 && (
          <div className="subsection">
            <h4>Repairs Needed</h4>
            <ul>
              {data.conditionAssessment.repairsNeeded.map((repair, i) => (
                <li key={i}>{repair}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Risk Assessment */}
      <Section title="Risk Assessment" icon="⚠️">
        <InfoGrid>
          <InfoItem label="Overall Risk" value={data.riskAssessment.overallRisk} highlight />
        </InfoGrid>
        {data.riskAssessment.riskFactors?.length > 0 && (
          <div style={{ marginTop: 'var(--spacing-lg)' }}>
            {data.riskAssessment.riskFactors.map((risk, i) => (
              <RiskCard key={i} risk={risk} />
            ))}
          </div>
        )}
      </Section>

      {/* Market Analysis */}
      <Section title="Market Analysis" icon="📈">
        <InfoGrid>
          <InfoItem label="Market Conditions" value={data.marketAnalysis.marketConditions} highlight />
          <InfoItem label="Median Sale Price" value={data.marketAnalysis.medianSalePrice} />
          <InfoItem label="Avg Days on Market" value={data.marketAnalysis.averageDaysOnMarket} />
          <InfoItem label="Price Appreciation" value={data.marketAnalysis.priceAppreciation} />
          <InfoItem label="Inventory" value={data.marketAnalysis.inventory} />
          <InfoItem label="Supply & Demand" value={data.marketAnalysis.supplyDemand} fullWidth />
        </InfoGrid>
      </Section>

      {/* Recommendations */}
      {data.recommendations?.length > 0 && (
        <Section title="Recommendations" icon="💡" count={data.recommendations.length}>
          <div className="recommendations-list">
            {data.recommendations.map((rec, i) => (
              <div key={i} className="recommendation-item">
                <span className="rec-number">{i + 1}</span>
                <p>{rec}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

// Helper Components
function Section({ title, icon, count, children }) {
  return (
    <div className="appraisal-section">
      <div className="section-header">
        <h2>
          <span className="section-icon">{icon}</span>
          {title}
          {count !== undefined && <span className="section-count">({count})</span>}
        </h2>
      </div>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
}

function InfoGrid({ children }) {
  return <div className="info-grid">{children}</div>;
}

function InfoItem({ label, value, highlight, fullWidth }) {
  return (
    <div className={`info-item ${highlight ? 'highlight' : ''} ${fullWidth ? 'full-width' : ''}`}>
      <span className="info-label">{label}</span>
      <span className="info-value">{value || 'Not available'}</span>
    </div>
  );
}

function Table({ children }) {
  return <table className="data-table">{children}</table>;
}

function RiskCard({ risk }) {
  const severityColors = {
    High: 'error',
    Medium: 'warning',
    Low: 'info'
  };

  return (
    <div className={`risk-card severity-${risk.severity.toLowerCase()}`}>
      <div className="risk-header">
        <h4>{risk.factor}</h4>
        <Badge type={severityColors[risk.severity]}>{risk.severity}</Badge>
      </div>
      <p className="risk-description">{risk.description}</p>
    </div>
  );
}

function Badge({ type, children }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

function EmptyState({ message, icon = 'ℹ️' }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">{icon}</span>
      <p className="empty-state-message">{message}</p>
    </div>
  );
}

export default AppraisalAnalysis;
