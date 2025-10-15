import styles from './WorkSectionHeader.module.css';

interface WorkSectionHeaderProps {
  icon?: string;
  title: string;
  subtitle: string;
  description: string;
  team?: string;
  categories: string[];
  role: string;
  timeline: string;
  outcomes?: string[];
}

export default function WorkSectionHeader({
  icon,
  title,
  subtitle,
  description,
  team,
  categories,
  role,
  timeline,
  outcomes = [],
}: WorkSectionHeaderProps) {
  return (
    <div className={styles.header}>
      {/* Left Column: Icon, Title, Description, Button */}
      <div className={styles.leftColumn}>
        <div className={styles.titleGroup}>
          {icon && (
            <div className={styles.iconWrapper}>
              <img src={icon} alt={`${title} logo`} className={styles.icon} />
            </div>
          )}
          <div className={styles.titleText}>
            <h2 className="heading-4" style={{ color: 'white' }}>
              {title} <span style={{ color: 'var(--color-label-secondary)' }}>{subtitle}</span>
            </h2>
          </div>
        </div>
        
        <p className={`${styles.description} body-medium`}>
          {description}
        </p>
        
        <button className={styles.button}>
          <span className="button-text-large">BUTTON</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.33331 8H12.6666M8 3.33334L12.6666 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Middle Column: Team, Category, Role, Timeline */}
      <div className={styles.middleColumn}>
        {team && (
          <div className={styles.metaRow}>
            <span className={`${styles.metaLabel} label-large`}>TEAM</span>
            <p className={`${styles.metaValue} body-medium`}>{team}</p>
          </div>
        )}
        
        <div className={styles.metaRow}>
          <span className={`${styles.metaLabel} label-large`}>CATEGORY</span>
          <div className={styles.categoryChips}>
            {categories.map((category, index) => (
              <span key={index} className={styles.chip}>
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <div className={styles.metaRow}>
          <span className={`${styles.metaLabel} label-large`}>ROLE</span>
          <p className={`${styles.metaValue} body-medium`}>{role}</p>
        </div>
        
        <div className={styles.metaRow}>
          <span className={`${styles.metaLabel} label-large`}>TIMELINE</span>
          <p className={`${styles.metaValue} body-medium`}>{timeline}</p>
        </div>
      </div>

      {/* Right Column: Outcomes */}
      {outcomes.length > 0 && (
        <div className={styles.rightColumn}>
          <div className={styles.outcomesSection}>
            <span className={`${styles.metaLabel} label-large`}>OUTCOME</span>
            <ul className={styles.outcomesList}>
              {outcomes.map((outcome, index) => (
                <li key={index} className="heading-4" style={{ color: 'white' }}>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
