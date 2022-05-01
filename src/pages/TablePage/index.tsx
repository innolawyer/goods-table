import Table from '../../components/Table';
import './style.scss';

const TablePage = () => {
  const getToday = () => {
    const today = new Date();
    return `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`;
  }

  return (
    <div className="container">
      <h5>Заказ #123</h5>
      <div className="details">
        <span>Адрес: СПб, пр. Ленина, д. 3, кв. 1</span>
        <span>Дата: {getToday()}</span>
      </div>
      <h5>Детали заказа</h5>
      <Table />
    </div>
  )
}

export default TablePage;