/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useRef} from 'react';
import {validateCreditReport} from '../services/llmService.js';
import './AskGemini.css';

function AskGemini() {
  const [creditData, setCreditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setCreditData(null);
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
    setCreditData(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setLoading(true);
    setError('');
    setCreditData(null);

    try {
      const parsedData = await validateCreditReport(file, fileDataUrl);
      setCreditData(parsedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h1>Credit Validator</h1>
      <p className="feature-description">
        Upload a credit report to validate and analyze all sections including personal information, accounts, payment history, and more.
      </p>

      <form onSubmit={handleValidate}>
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
              <span>Upload Credit Report</span>
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
            className="validate-btn"
            disabled={!file || loading}
          >
            {loading ? 'Validating...' : 'Validate Credit Report'}
          </button>
          {creditData && (
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

      {loading && (
        <div className="credit-report-container">
          <LoadingDisplay />
        </div>
      )}

      {creditData && !loading && (
        <div className="credit-report-container">
          <CreditReportDisplay data={creditData} />
        </div>
      )}
    </div>
  );
}

function LoadingDisplay() {
  return (
    <div className="credit-sections">
      {/* Loading Skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="credit-section">
          <div className="section-header">
            <h2>
              <span className="skeleton skeleton-icon"></span>
              <span className="skeleton skeleton-text" style={{ width: '200px' }}></span>
            </h2>
          </div>
          <div className="section-content">
            <div className="loading-grid">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="skeleton skeleton-item"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreditReportDisplay({ data }) {
  return (
    <div className="credit-sections">
      {/* Personal Information */}
      <Section title="Personal Information" icon="👤">
        <InfoGrid>
          <InfoItem label="Name" value={data.personalInfo.name} />
          <InfoItem label="SSN" value={data.personalInfo.ssn} />
          <InfoItem label="Date of Birth" value={data.personalInfo.dateOfBirth} />
          <InfoItem label="Current Address" value={data.personalInfo.currentAddress} fullWidth />
          <InfoItem label="Employment" value={data.personalInfo.employmentInfo} fullWidth />
        </InfoGrid>
        {data.personalInfo.previousAddresses?.length > 0 && (
          <div className="subsection">
            <h4>Previous Addresses</h4>
            <ul>
              {data.personalInfo.previousAddresses.map((addr, i) => (
                <li key={i}>{addr}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Credit Summary */}
      <Section title="Credit Summary" icon="📊">
        <InfoGrid>
          <InfoItem label="Credit Score" value={data.creditSummary.creditScore} highlight />
          <InfoItem label="Score Date" value={data.creditSummary.scoreDate} />
          <InfoItem label="Total Accounts" value={data.creditSummary.totalAccounts} />
          <InfoItem label="Open Accounts" value={data.creditSummary.openAccounts} />
          <InfoItem label="Closed Accounts" value={data.creditSummary.closedAccounts} />
          <InfoItem label="Derogatory Marks" value={data.creditSummary.derogatoryMarks} />
          <InfoItem label="Total Inquiries" value={data.creditSummary.totalInquiries} />
          <InfoItem label="Oldest Account" value={data.creditSummary.oldestAccount} />
          <InfoItem label="Average Account Age" value={data.creditSummary.averageAccountAge} />
          <InfoItem label="Total Credit Limit" value={data.creditSummary.totalCreditLimit} />
          <InfoItem label="Total Balance" value={data.creditSummary.totalBalance} />
          <InfoItem label="Credit Utilization" value={data.creditSummary.creditUtilization} highlight />
        </InfoGrid>
      </Section>

      {/* Payment History */}
      <Section title="Payment History" icon="💳">
        <InfoGrid>
          <InfoItem label="On-Time Payments" value={data.paymentHistory.onTimePayments} highlight />
          <InfoItem label="30 Days Late" value={data.paymentHistory.latePayments30Days} />
          <InfoItem label="60 Days Late" value={data.paymentHistory.latePayments60Days} />
          <InfoItem label="90+ Days Late" value={data.paymentHistory.latePayments90Days} />
          <InfoItem label="Total Missed" value={data.paymentHistory.totalMissedPayments} />
        </InfoGrid>
      </Section>

      {/* Credit Accounts */}
      <Section title="Credit Accounts" icon="🏦" count={data.creditAccounts?.length}>
        <Table>
          <thead>
            <tr>
              <th>Creditor</th>
              <th>Type</th>
              <th>Account #</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Credit Limit</th>
              <th>Monthly Payment</th>
              <th>Opened</th>
              <th>Payment History</th>
            </tr>
          </thead>
          <tbody>
            {data.creditAccounts?.map((account, i) => (
              <tr key={i}>
                <td>{account.creditorName}</td>
                <td>{account.accountType}</td>
                <td>****{account.accountNumber}</td>
                <td><Badge type={account.status === 'Open' ? 'success' : 'secondary'}>{account.status}</Badge></td>
                <td>{account.balance}</td>
                <td>{account.creditLimit}</td>
                <td>{account.monthlyPayment}</td>
                <td>{account.openedDate}</td>
                <td><Badge type={account.paymentHistory.includes('Current') ? 'success' : 'error'}>{account.paymentHistory}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      {/* Credit Inquiries */}
      <Section title="Credit Inquiries" icon="🔍" count={data.creditInquiries?.length}>
        {data.creditInquiries?.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Creditor</th>
                <th>Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.creditInquiries.map((inquiry, i) => (
                <tr key={i}>
                  <td>{inquiry.creditor}</td>
                  <td>{inquiry.date}</td>
                  <td><Badge type={inquiry.type === 'Hard' ? 'warning' : 'info'}>{inquiry.type}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No credit inquiries found" />
        )}
      </Section>

      {/* Public Records */}
      <Section title="Public Records" icon="⚖️" count={data.publicRecords?.length}>
        {data.publicRecords?.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Court Info</th>
              </tr>
            </thead>
            <tbody>
              {data.publicRecords.map((record, i) => (
                <tr key={i}>
                  <td>{record.type}</td>
                  <td>{record.date}</td>
                  <td>{record.amount}</td>
                  <td><Badge type="error">{record.status}</Badge></td>
                  <td>{record.courtInfo && record.courtInfo !== 'Not available' ? record.courtInfo : '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No public records found" icon="✓" isPositive />
        )}
      </Section>

      {/* Collections */}
      <Section title="Collections" icon="⚠️" count={data.collections?.length}>
        {data.collections?.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Creditor</th>
                <th>Collection Agency</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.collections.map((collection, i) => (
                <tr key={i}>
                  <td>{collection.creditor}</td>
                  <td>{collection.collectionAgency}</td>
                  <td>{collection.amount}</td>
                  <td>{collection.date}</td>
                  <td><Badge type={collection.status === 'Paid' ? 'success' : 'warning'}>{collection.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No collections found" icon="✓" isPositive />
        )}
      </Section>

      {/* Validation Issues */}
      <Section title="Validation Issues" icon="🔴" count={data.validationIssues?.length}>
        {data.validationIssues?.length > 0 ? (
          data.validationIssues.map((issue, i) => (
            <IssueCard key={i} issue={issue} />
          ))
        ) : (
          <EmptyState message="No validation issues found" icon="✓" isPositive />
        )}
      </Section>
    </div>
  );
}

// Helper Components
function Section({ title, icon, count, children }) {
  return (
    <div className="credit-section">
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

function IssueCard({ issue }) {
  const severityColors = {
    High: 'error',
    Medium: 'warning',
    Low: 'info'
  };

  return (
    <div className={`issue-card severity-${issue.severity.toLowerCase()}`}>
      <div className="issue-header">
        <h4>{issue.section}</h4>
        <Badge type={severityColors[issue.severity]}>{issue.severity}</Badge>
      </div>
      <div className="issue-content">
        <p className="issue-description">{issue.issue}</p>
        <div className="issue-recommendation">
          <strong>Recommendation:</strong> {issue.recommendation}
        </div>
      </div>
    </div>
  );
}

function Table({ children }) {
  return <table className="data-table">{children}</table>;
}

function Badge({ type, children }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

function EmptyState({ message, icon = 'ℹ️', isPositive = false }) {
  return (
    <div className={`empty-state ${isPositive ? 'empty-state-positive' : ''}`}>
      <span className="empty-state-icon">{icon}</span>
      <p className="empty-state-message">{message}</p>
    </div>
  );
}

export default AskGemini;
