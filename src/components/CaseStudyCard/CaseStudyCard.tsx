import styles from './CaseStudyCard.module.css';

interface CaseStudyCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  onViewCaseStudy?: () => void;
}

export default function CaseStudyCard({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  onViewCaseStudy,
}: CaseStudyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.header}>
            <p className={`${styles.title} label-large`}>{title}</p>
            <p className={`${styles.subtitle} body-medium`}>{subtitle}</p>
          </div>
          <button 
            className={styles.button}
            onClick={onViewCaseStudy}
            aria-label={`View ${title} case study`}
          >
            <span className="button-text-small">view case study</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.33331 8H12.6666M8 3.33334L12.6666 8L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt={imageAlt} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
