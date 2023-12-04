import Results from './Results';
import logo from '../assets/icon-arrow.svg';
import styles from './Main.module.css';
import { useState } from 'react';

const Main = () => {

  const [age, setAge] = useState({ years: '-', months: '-', days: '-' });

  const [inputDay, setInputDay] = useState('')
  const [inputMonth, setInputMonth] = useState('')
  const [inputYear, setInputYear] = useState('')

  const [dayError, setDayError] = useState(false)
  const [monthError, setMonthError] = useState(false)
  const [yearError, setYearError] = useState(false)

  const currentYear = new Date().getFullYear()

  const changeHandler = (event) => {
    const { selected, value } = event.target;

    if (selected === 'day') {
      if (value > 0 && value < 32) {
        setInputDay(value);
        setDayError(false);
      } else {
        setDayError(true);
      }
    } else if (selected === 'month') {
      if (value > 0 && value < 13) {
        setInputMonth(value);
        setMonthError(false);
      } else {
        setMonthError(true);
      }
    } else if (selected === 'year') {
      if (value <= currentYear) {
        setInputYear(value);
        setYearError(false);
      } else {
        setYearError(true);
      }
    }
  };

  const calculateHandler = (event) => {
    event.preventDefault();
    if (inputYear <= currentYear && inputMonth > 0 && inputMonth < 13 && inputDay > 0 && inputDay < 32  && inputYear > 0) {

      let monthCurrent = new Date(inputYear, inputMonth, 0).getDate()

      if (inputDay <= monthCurrent) {

        let birth = new Date(`${inputYear}-${inputMonth}-${inputDay}`)
        let today = new Date()

        let calcMonths = today.getMonth() - birth.getMonth()
        let calcDays = today.getDate() - birth.getDate()
        let calcYears = today.getFullYear() - birth.getFullYear()

        if (calcDays < 0) {
          const last = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
          calcDays = last + calcDays
          calcMonths = calcMonths - 1
        }

        if (calcMonths < 0) {
          calcMonths = 12 + calcMonths
          calcYears = calcYears - 1
        }

        setAge({ years: calcYears, months: calcMonths, days: calcDays })



 
      } else {
        alert('Invalid Month Dates')
        console.log('Invalid Month Dates')
      }
    } else {
      alert('Invalid dates')
      console.log('Invalid Dates')
    }
  }

  return (
    <div name='main' className={styles['cards']}>
      <form className={styles['form']} onSubmit={calculateHandler}>
        <div className={styles['inputs']}>
          <h1>DAY</h1>
          <input type='number' min={1} max={31} placeholder='DAY' onChange={changeHandler} selected='day' value={inputDay}/>
          {dayError && <span className={styles['errorText']}>Invalid day</span>}
        </div>

        <div className={styles['inputs']}>
          <h2>MONTH</h2>
          <input type='number' min={1} max={31} placeholder='MONTH' onChange={changeHandler} selected='month' value={inputMonth}/>
          {monthError && <span className={styles['errorText']}>Invalid month</span>}
        </div>

        <div className={styles['inputs']}>
          <h3>YEAR</h3>
          <input type='number' min={1} max={currentYear} placeholder='YEAR' onChange={changeHandler} selected='year' value={inputYear}/>
          {yearError && <span className={styles['errorText']}>Invalid year</span>}
        </div>

        <button className={styles['button']} id='btn'>
          <img src={logo}/>
        </button>
      </form>
      <div className={styles['results']}>
        <Results result={age.years} date={'years'} />
        
        <Results result={age.months} date={'months'} />
        <Results result={age.days} date={'days'} />
      </div>
    </div>
  );
};

export default Main;
