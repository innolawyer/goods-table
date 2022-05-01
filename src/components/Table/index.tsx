import React from 'react';
import { getData, IData } from '../../api/goods'
import Modal from '../Modal';
import './style.scss';

interface IGoods extends IData {
  amount: number;
}


const transform = (data: IData[]): Record<string, IGoods> => {
  const obj: Record<string, IGoods> = {}
  for (let elem of data) {
    obj[elem.id] = { ...elem, amount: 1 };
  }
  return obj as Record<string, IGoods>; // это для того, чтобы не перебирать массив каждый раз в поиске нужного id
}

const Table = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [idUnderDelete, setIdUnderDelete] = React.useState<string | undefined>();
  const [data, setData] = React.useState<Record<string, IGoods>>({});

  React.useEffect(() => {
    const resp = getData();
    setData(transform(resp));
  }, [])

  const deleteWitId = (id: string) => {
    delete data[id];
    setData({ ...data });
  }

  const onDelete = (id: string) => {
    setIsModal(true);
    setIdUnderDelete(id)
  }

  const onOk = (id: string) => {
    setIsModal(false);
    if (idUnderDelete) {
      deleteWitId(idUnderDelete);
    }
  }

  const calculateSum = () => {
    let sum = 0;
    Object.keys(data).forEach((id: string) => {
      sum += data[id].price * data[id].amount;
    })
    
    return sum;
  }

  const inc = (id: string) => {
    data[id].amount += 1;

    // To update state
    setData({ ...data }) //обновление ссылки для обновления компонента
  }

  const dec = (id: string) => {
    data[id].amount -= 1;

    // To update state
    setData({ ...data })
  }

  const isDecDisabled = (id: string): boolean => {
    if (data[id].amount <= 1) {
      return true;
    }
    return false;
  }
  
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Наименование товара</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Цена за шт.</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(data).map((id: string, i) => ( //формируем массив из ключей объектов
              <tr key={data[id].id}>
                <th scope="row">{i+1}</th>
                <td>{data[id].title}</td>
                <td>{data[id].amount}</td>
                <td>{data[id].price} р</td>
                <td>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm minus-btn"
                      disabled={isDecDisabled(id)}
                      onClick={() => dec(data[id].id)}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => inc(data[id].id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td><button type="button" className="btn btn-primary btn-sm" onClick={() => onDelete(data[id].id)}>x</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="sum-container">
        <h4>ИТОГО: </h4>
        <span>{calculateSum()} р</span>
      </div>

      {isModal &&  (
        <Modal title="Вы действительно хотите удалить элемент?" onOk={onOk} onCancel={() => setIsModal(false)} />
      )}
    </div>

  )
}

export default Table;
