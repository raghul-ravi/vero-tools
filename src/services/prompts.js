/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Prompts configuration for all AI-powered features
 */

export const CREDIT_VALIDATOR_PROMPT = `Analyze this credit report and extract the following information in JSON format. Be thorough and accurate.

Return ONLY valid JSON in this exact structure (no markdown, no code blocks, just pure JSON):

{
  "personalInfo": {
    "name": "Full Name",
    "ssn": "XXX-XX-1234 (last 4 only)",
    "dateOfBirth": "MM/DD/YYYY",
    "currentAddress": "Full address",
    "previousAddresses": ["address1", "address2"],
    "employmentInfo": "Current employer or employment status"
  },
  "creditSummary": {
    "creditScore": "Score if available",
    "scoreDate": "Date of score",
    "totalAccounts": "Number",
    "openAccounts": "Number",
    "closedAccounts": "Number",
    "derogatoryMarks": "Number",
    "totalInquiries": "Number",
    "oldestAccount": "Date or years",
    "averageAccountAge": "Years/months",
    "totalCreditLimit": "$X,XXX",
    "totalBalance": "$X,XXX",
    "creditUtilization": "XX%"
  },
  "creditAccounts": [
    {
      "creditorName": "Name of creditor",
      "accountType": "Revolving/Installment/Mortgage/etc",
      "accountNumber": "Last 4 digits",
      "status": "Open/Closed/Paid",
      "balance": "$X,XXX",
      "creditLimit": "$X,XXX",
      "monthlyPayment": "$XXX",
      "openedDate": "MM/YYYY",
      "lastReported": "MM/YYYY",
      "paymentHistory": "Current/30 days late/60 days late/etc"
    }
  ],
  "paymentHistory": {
    "onTimePayments": "XX%",
    "latePayments30Days": "Number",
    "latePayments60Days": "Number",
    "latePayments90Days": "Number",
    "totalMissedPayments": "Number"
  },
  "creditInquiries": [
    {
      "creditor": "Name",
      "date": "MM/DD/YYYY",
      "type": "Hard/Soft"
    }
  ],
  "publicRecords": [
    {
      "type": "Bankruptcy/Tax Lien/Judgment/etc",
      "date": "MM/DD/YYYY",
      "amount": "$X,XXX",
      "status": "Filed/Discharged/Satisfied/etc",
      "courtInfo": "Court information if available"
    }
  ],
  "collections": [
    {
      "creditor": "Original creditor",
      "collectionAgency": "Agency name",
      "amount": "$X,XXX",
      "date": "MM/DD/YYYY",
      "status": "Unpaid/Paid/Disputed/etc"
    }
  ],
  "validationIssues": [
    {
      "section": "Section name",
      "issue": "Description of issue",
      "severity": "High/Medium/Low",
      "recommendation": "What to do about it"
    }
  ]
}

If certain information is not available in the document, use "Not available" or empty arrays. Be precise and thorough.`;

export const APPRAISAL_ANALYSIS_PROMPT = `Analyze this appraisal document and extract the following information in JSON format.

Return ONLY valid JSON in this exact structure (no markdown, no code blocks, just pure JSON):

{
  "propertyDetails": {
    "address": "Full property address",
    "propertyType": "Single Family/Condo/Townhouse/etc",
    "squareFootage": "X,XXX sq ft",
    "lotSize": "X,XXX sq ft or X acres",
    "yearBuilt": "YYYY",
    "bedrooms": "Number",
    "bathrooms": "Number",
    "garageSpaces": "Number"
  },
  "valuation": {
    "appraisedValue": "$XXX,XXX",
    "appraisalDate": "MM/DD/YYYY",
    "effectiveDate": "MM/DD/YYYY",
    "purchasePrice": "$XXX,XXX (if available)",
    "pricePerSqFt": "$XXX",
    "marketTrend": "Increasing/Stable/Declining",
    "daysOnMarket": "XX days"
  },
  "comparables": [
    {
      "address": "Property address",
      "salePrice": "$XXX,XXX",
      "saleDate": "MM/DD/YYYY",
      "squareFootage": "X,XXX sq ft",
      "bedrooms": "Number",
      "bathrooms": "Number",
      "pricePerSqFt": "$XXX",
      "proximity": "X.X miles",
      "adjustments": "$X,XXX"
    }
  ],
  "conditionAssessment": {
    "overallCondition": "Excellent/Good/Average/Fair/Poor",
    "exteriorCondition": "Description",
    "interiorCondition": "Description",
    "roofCondition": "Description",
    "foundationCondition": "Description",
    "repairsNeeded": ["List of repairs needed"],
    "estimatedRepairCost": "$X,XXX"
  },
  "riskAssessment": {
    "overallRisk": "Low/Medium/High",
    "riskFactors": [
      {
        "factor": "Risk factor name",
        "severity": "Low/Medium/High",
        "description": "Detailed description"
      }
    ]
  },
  "marketAnalysis": {
    "marketConditions": "Strong/Moderate/Weak",
    "supplyDemand": "Description",
    "medianSalePrice": "$XXX,XXX",
    "averageDaysOnMarket": "XX days",
    "priceAppreciation": "X.X% annually",
    "inventory": "XX months"
  },
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ]
}

If certain information is not available in the document, use "Not available" or empty arrays. Be precise and thorough.`;

export const TITLE_VALIDATION_PROMPT = `Please review this title document and provide a comprehensive validation analysis:

1. Property Identification: Extract property address, legal description, parcel/lot number
2. Ownership: Current owner(s) and how title is held
3. Liens & Encumbrances: Identify any mortgages, liens, judgments, or encumbrances
4. Easements & Restrictions: List any easements, covenants, or deed restrictions
5. Legal Issues: Flag any clouds on title, disputes, or legal concerns
6. Chain of Title: Comment on title history and any gaps or issues
7. Exceptions: Note any standard or special exceptions in the title policy
8. Title Insurance: Summarize coverage amount and any exclusions
9. Risk Assessment: Rate the title risk as LOW, MEDIUM, or HIGH
10. Recommendations: Provide guidance for buyer/lender on proceeding

Please be thorough and highlight any red flags or concerns that require attention.`;
