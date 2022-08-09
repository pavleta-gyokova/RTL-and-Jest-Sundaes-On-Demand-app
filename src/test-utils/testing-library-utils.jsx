import { render } from "@testing-library/react";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from "@testing-library/react";

//override render method
export { renderWithContext as render };
