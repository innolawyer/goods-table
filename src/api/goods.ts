export interface IData {
    id: string;
    title: string;
    price: number;
  }
  
  export const getData = (): IData[] => [
    {
      id: '1',
      title: 'Наименование 1',
      price: 100
    },
    {
      id: '2',
      title: 'Наименование 2',
      price: 147
    },
    {
      id: '3',
      title: 'Наименование 3',
      price: 23
    },
    {
      id: '4',
      title: 'Наименование 4',
      price: 156
    },
    {
      id: '5',
      title: 'Наименование 5',
      price: 789
    }
  ];