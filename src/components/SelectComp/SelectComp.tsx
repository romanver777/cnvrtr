import styled from "styled-components";

const Selector = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 2px solid lightgray;
  color: grey;
`;

type TProps = {
  currencies: string[];
  selectedCurrency: string;
  onChangeCurrency: (value: string) => void;
};
const SelectComp = ({
  currencies,
  selectedCurrency,
  onChangeCurrency,
}: TProps) => {
  return (
    <Selector
      value={selectedCurrency}
      onChange={(e) => onChangeCurrency(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </Selector>
  );
};

export default SelectComp;
