import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Converter from "./Converter.tsx";
import axios from "axios";
import { vi } from "vitest";

const mocks = {
  data: {
    rates: {
      EUR: 0.85,
      USD: 1,
      GBP: 0.75,
    },
  },
};

describe("Converter", () => {
  it("renders the converter title", () => {
    render(<Converter />);
    const title = screen.getByText("Конвертер валют");
    expect(title).toBeDefined();
  });

  it("loads currencies and displays them", async () => {
    vi.mock("axios");

    axios.get = vi.fn().mockResolvedValue(mocks);
    render(<Converter />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const startValue = screen.getByDisplayValue("USD");
    const endValue = screen.getByDisplayValue("EUR");

    expect(startValue).toBeDefined();
    expect(endValue).toBeDefined();
  });

  it('calculates and displays value', async () => {
    axios.get = vi.fn().mockResolvedValue(mocks);

    render(<Converter />);
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    const input = screen.getByPlaceholderText('Введите сумму');

    fireEvent.change(input, { target: { value: '100' } });
    const result = screen.getByText('85 EUR');
    expect(result).toBeDefined();

    fireEvent.change(input, { target: { value: '1111' } });
    const result2 = screen.getByText('944.35 EUR');
    expect(result2).toBeDefined();
  });
});
