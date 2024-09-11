import { useEffect, useState } from "react";
import SelectComp from "../SelectComp/SelectComp";
import { useFetch } from "../../hooks/useFetch";
import * as SC from "./Converter.style";

const Converter = () => {
  const [startCurrency, setStartCurrency] = useState(
    navigator.languages[0] === "ru" ? "RUB" : "USD"
  );
  const [endCurrency, setEndCurrency] = useState("EUR");
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState("");

  const url = `https://api.exchangerate-api.com/v4/latest/${startCurrency}`;

  const [data, loading, error] = useFetch(url);

  useEffect(() => {
    if (value && data) {
      const converted = (+value * data[endCurrency]).toFixed(4).toString();
      const filtered = converted.includes(".")
        ? converted.replace(/[.]?0+$/, "")
        : converted;

      setResult(`${filtered} ${endCurrency}`);
    } else {
      setResult("");
    }
  }, [value, startCurrency, endCurrency, data]);

  return (
    <SC.Container>
      <SC.Title>Конвертер валют</SC.Title>
      {error && <div>Что-то пошло не так..</div>}
      {loading && !error && <SC.Loader />}
      {!loading && !error && (
        <>
          <SelectComp
            currencies={Object.keys(data as { [key: string]: number })}
            selectedCurrency={startCurrency}
            onChangeCurrency={setStartCurrency}
          />
          <SC.Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, 10))}
            placeholder="Введите сумму"
          />
          <SelectComp
            currencies={Object.keys(data as { [key: string]: number })}
            selectedCurrency={endCurrency}
            onChangeCurrency={setEndCurrency}
          />
          <SC.Result>{result}</SC.Result>
        </>
      )}
    </SC.Container>
  );
};

export default Converter;
