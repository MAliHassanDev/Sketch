import { screen,render } from "@testing-library/react";
import Button from "./Button";


describe("Button", () => {
  test("Should render with correct text", () => {
    render(<Button />);
    expect(screen.getByText("Click")).toBeInTheDocument();
  });
});