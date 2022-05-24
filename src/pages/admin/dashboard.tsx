import { ChangeEvent, useEffect, useState } from "react";
import { Content, Section, Form, Table } from "react-bulma-components";
import { Loading } from "../../components/loading";
import { apiAgent } from "../../services/adminApi";
import { StripePayments } from "../../types/stripe-payments";
import { StripeCustomerUser } from "../../types/user";

const START_DATE = new Date("2022-05-01");
const START_DATE_NUMBER = 202205;

type Sales = {
  [key: string]: StripePayments<Date> & { user: StripeCustomerUser | null };
};

const getYearMonthJoinNumber = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return Number(`${year}${month}`);
};

const getNowDateDiff = () => {
  const date = new Date();
  const dateNumber = getYearMonthJoinNumber(date);
  return dateNumber - START_DATE_NUMBER;
};

const createNowFromStartDateList = () => {
  let diff = getNowDateDiff();
  const dateList = [];
  if (diff) {
    while (diff >= 0) {
      const baseDate = new Date(START_DATE.getTime());
      baseDate.setMonth(baseDate.getMonth() + diff);
      const dateNumber = getYearMonthJoinNumber(baseDate);
      dateList.push(dateNumber);
      diff--;
    }
  } else {
    dateList.push(START_DATE_NUMBER);
  }
  return dateList;
};

const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${year}-${month}-${day} ${hour}:${min}`;
};

const labelDateFormat = (date: number) => {
  const year = date.toString().slice(0, 4);
  const month = date.toString().slice(4);
  return `${year}年${month}月`;
};

const Dashboard = () => {
  const [salesList, setSalesList] = useState<Sales[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dateList = createNowFromStartDateList();
  const [date, setDate] = useState<string | number>(dateList[0]);

  useEffect(() => {
    (async () => {
      setSalesList([]);
      setIsLoading(true);
      const result = await apiAgent.get("/sales", { date });
      if (result != null) {
        setSalesList(result);
      }
      setIsLoading(false);
    })();
  }, [date]);

  const onChangeDate = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDate(value);
  };

  return (
    <Content>
      <Form.Select onChange={onChangeDate}>
        {dateList.map((date, i) => (
          <option key={i} value={date}>
            {labelDateFormat(date)}
          </option>
        ))}
      </Form.Select>
      <Section>
        {salesList.length ? (
          <SalesListTable salesList={salesList} />
        ) : (
          <Loading isLoading={isLoading} />
        )}
      </Section>
    </Content>
  );
};

interface SalesListProps {
  salesList: Sales[]
}

const SalesListTable = ({ salesList }: SalesListProps) => (
  <>
    <h2>売上一覧</h2>
    <Table>
      <thead>
        <tr>
          <th>購入日</th>
          <th>購入者</th>
          <th>品名</th>
          <th>キャスト</th>
          <th>金額</th>
        </tr>
      </thead>
      <tbody>
        {salesList.map((salse) => {
          const key = Object.keys(salse)[0];
          const payment = salse[key];
          return (
            <tr key={key}>
              <td>{dateFormat(new Date(payment.updatedDate))}</td>
              <td>{payment.user?.name}</td>
              <td>{payment.productName}</td>
              <td>{payment.staff}</td>
              <td>{payment.price}円</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </>
);

export default Dashboard;
