import { screen,render } from "@testing-library/react";
import Canvas from "./Canvas";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";
describe("Canvas", () => {
  test("Should render with correct width and height", () => {
    render(
      <ThemeProvider>
        <Canvas />
      </ThemeProvider>
    );
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });
});