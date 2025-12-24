import styles from './page.module.scss';

export default function StyleGuidePage() {
  const colors = [
    { name: 'Primary (Deep Sapphire)', hex: '#00FFC2', className: styles.bgPrimary },
    { name: 'Secondary (Muted Gold)', hex: '#0A192F', className: styles.bgSecondary },
    { name: 'Text Main', hex: '#333333', className: styles.bgTextMain },
    { name: 'Text Sub', hex: '#666666', className: styles.bgTextSub },
  ];

  return (
    <div className={styles.guideContainer}>
      <h1 className={styles.title}>PLOLUX Design System Guide</h1>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Color Palette</h2>
        <div className={styles.grid}>
          {colors.map((color) => (
            <div key={color.name} className={styles.colorCard}>
              <div className={`${styles.preview} ${color.className}`}></div>
              <div className={styles.info}>
                <div className={styles.name}>{color.name}</div>
                <div className={styles.hex}>{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>Typography</h2>
        <div className="space-y-4">
          <div>
            <h1>Heading 1 - 기술과 감성으로 완성하는 당신의 웹사이트</h1>
          </div>
          <div>
            <h2>Heading 2 - 서브 타이틀 예시</h2>
          </div>
          <div>
            <h3>Heading 3 - 섹션 타이틀 예시</h3>
          </div>
           <div>
            <p>
              Body Text - PLOLUX는 브랜드의 가치를 높이는 프리미엄 웹 에이전시입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
