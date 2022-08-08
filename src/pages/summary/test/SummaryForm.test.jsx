import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});
test("checking the checkbox enables the button and unchecking the checkbox disable it again", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
test("popover response to hover", async () => {
  render(<SummaryForm />);
  // popover starts hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  const termsAndCondition = screen.getByText(/terms and conditions/i);
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears upon mouseover of checkbox label
  userEvent.hover(termsAndCondition);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // popover disappears when we mouse out
  userEvent.unhover(termsAndCondition);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
