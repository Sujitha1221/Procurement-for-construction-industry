import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import ViewOrder from "../OrderLayout/ViewOrder";

// Mocking the axios module
jest.mock("axios");

describe("ViewOrder Component", () => {
  beforeEach(() => {
    // setting up a fake response for the API call
    axios.get.mockResolvedValue({ data: [] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders ViewOrder component without crashing", async () => {
    await act(async () => {
      render(<ViewOrder />);
    });
  });

  it("has the correct table headers", async () => {
    await act(async () => {
      render(<ViewOrder />);
    });

    expect(screen.getByText("Requisition ID")).toBeInTheDocument();
    expect(screen.getByText("Item")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Total Amount")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("makes an API call on render", async () => {
    await act(async () => {
      render(<ViewOrder />);
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });
});
