import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ViewOrder from "./ViewOrder";

describe("<ViewOrder />", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("fetches and displays approved requisitions", async () => {
    // Sample data for the mock axios response
    const mockData = [
      {
        _id: "1",
        item: "TestItem1",
        quantity: "10",
        totalAmount: "100",
        approvalStatus: "approved",
      },
      {
        _id: "2",
        item: "TestItem2",
        quantity: "5",
        totalAmount: "50",
        approvalStatus: "rejected",
      },
    ];

    mockAxios
      .onGet("http://localhost:8080/purchase-requisition/get-all-pr")
      .reply(200, mockData);

    render(
      <MemoryRouter>
        <ViewOrder />
      </MemoryRouter>
    );

    // Wait for axios to resolve and component to re-render
    await waitFor(() => screen.getByText("TestItem1"));

    // Check that only approved requisition is rendered
    expect(screen.getByText("TestItem1")).toBeInTheDocument();
    expect(screen.queryByText("TestItem2")).not.toBeInTheDocument();

    // You can add more assertions based on the behavior you expect.
  });
});
