import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}