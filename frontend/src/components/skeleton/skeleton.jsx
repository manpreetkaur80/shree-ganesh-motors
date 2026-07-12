import styles from "./skeleton.module.css"

// Base shimmer block
export function SkeletonBlock({ width = "100%", height = "16px", radius = "6px", style = {} }) {
  return (
    <div
      className={styles.shimmer}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  )
}

// Full car card skeleton — matches CarCard shape exactly
export function CarCardSkeleton() {
  return (
    <div className={styles.card}>
      {/* Image placeholder */}
      <div className={styles.imgPlaceholder} />

      {/* Body */}
      <div className={styles.body}>
        {/* Brand + year row */}
        <div className={styles.row}>
          <SkeletonBlock width="80px" height="12px" />
          <SkeletonBlock width="44px" height="20px" radius="20px" />
        </div>

        {/* Title */}
        <SkeletonBlock width="75%" height="22px" style={{ marginTop: "10px" }} />
        <SkeletonBlock width="50%" height="22px" style={{ marginTop: "6px" }} />

        {/* Meta row */}
        <div className={styles.metaRow}>
          <SkeletonBlock width="60px" height="12px" />
          <SkeletonBlock width="70px" height="12px" />
          <SkeletonBlock width="75px" height="12px" />
        </div>

        {/* Price + button */}
        <div className={styles.footer}>
          <SkeletonBlock width="110px" height="26px" />
          <SkeletonBlock width="80px" height="34px" radius="8px" />
        </div>
      </div>
    </div>
  )
}

// Car detail page skeleton
export function CarDetailSkeleton() {
  return (
    <div className={styles.detailLayout}>
      {/* Left - gallery */}
      <div className={styles.detailLeft}>
        <div className={styles.detailMainImg} />
        <div className={styles.thumbRow}>
          {[1,2,3,4].map(i => <div key={i} className={styles.thumb} />)}
        </div>
        <div className={styles.detailDesc}>
          <SkeletonBlock width="140px" height="18px" style={{marginBottom:"12px"}}/>
          <SkeletonBlock width="100%" height="13px" style={{marginBottom:"8px"}}/>
          <SkeletonBlock width="100%" height="13px" style={{marginBottom:"8px"}}/>
          <SkeletonBlock width="80%"  height="13px" />
        </div>
      </div>

      {/* Right - info */}
      <div className={styles.detailRight}>
        <div className={styles.detailInfoCard}>
          <SkeletonBlock width="80px"  height="12px" style={{marginBottom:"10px"}}/>
          <SkeletonBlock width="70%"   height="28px" style={{marginBottom:"6px"}}/>
          <SkeletonBlock width="50%"   height="28px" style={{marginBottom:"16px"}}/>
          <SkeletonBlock width="130px" height="32px" style={{marginBottom:"20px"}}/>
          <div className={styles.specsGrid}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className={styles.specItem}>
                <SkeletonBlock width="60px"  height="11px" style={{marginBottom:"6px"}}/>
                <SkeletonBlock width="80px"  height="16px"/>
              </div>
            ))}
          </div>
          <SkeletonBlock width="100%" height="44px" radius="8px" style={{marginTop:"20px"}}/>
          <SkeletonBlock width="100%" height="44px" radius="8px" style={{marginTop:"10px"}}/>
        </div>
      </div>
    </div>
  )
}

// Grid of car skeletons (for Cars page and Home featured)
export function CarGridSkeleton({ count = 6 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  )
}
