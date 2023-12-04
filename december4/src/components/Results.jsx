import styles from './Results.module.css'

const Results = ({result, date}) => {
  return (
    <div>
      <h2 className={styles.content}>
        <span className={styles.numbers}>{result} </span>
        {date}
      </h2>
    </div>
  )
}

export default Results
