/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import './Sidebar.css';

function Sidebar({ activeFeature, onFeatureChange, isCollapsed, onToggleCollapse }) {

  const features = [
    {
      id: 'ask-gemini',
      name: 'Credit Validator',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      id: 'appraisal-analysis',
      name: 'Appraisal Analysis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
      )
    },
    {
      id: 'title-validation',
      name: 'Title Validation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      )
    }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>{!isCollapsed && 'Vero Tools'}</h2>
        <button
          className="collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isCollapsed ? (
              <path d="M9 18l6-6-6-6"/>
            ) : (
              <path d="M15 18l-6-6 6-6"/>
            )}
          </svg>
        </button>
      </div>
      <nav className="sidebar-nav">
        {features.map((feature) => (
          <button
            key={feature.id}
            className={`sidebar-item ${activeFeature === feature.id ? 'active' : ''}`}
            onClick={() => onFeatureChange(feature.id)}
            title={isCollapsed ? feature.name : ''}
          >
            <span className="sidebar-icon">{feature.icon}</span>
            {!isCollapsed && <span className="sidebar-label">{feature.name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
