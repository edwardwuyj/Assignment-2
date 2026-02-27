/**
 * Solves a cubic equation of the form ax^3 + bx^2 + cx + d = 0
 * and displays the roots in the solution div.
 */

document.getElementById("cubic-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get coefficients from the form
  const a = parseFloat((<HTMLInputElement>document.getElementById("a")).value);
  const b = parseFloat((<HTMLInputElement>document.getElementById("b")).value);
  const c = parseFloat((<HTMLInputElement>document.getElementById("c")).value);
  const d = parseFloat((<HTMLInputElement>document.getElementById("d")).value);

  // Validate input
  if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
    displaySolution("Please enter valid numbers for all coefficients.");
    return;
  }

  // Solve the cubic equation
  const roots = solveCubic(a, b, c, d);

  // Display the roots
  displaySolution(`Roots: ${roots.join(", ")}`);
});

/**
 * Solves a cubic equation using Cardano's method.
 * @param a Coefficient of x^3
 * @param b Coefficient of x^2
 * @param c Coefficient of x
 * @param d Constant term
 * @returns An array of roots (real and complex)
 */
function solveCubic(a: number, b: number, c: number, d: number): (number | string)[] {
  // Normalize coefficients
  const p = c / a - (b ** 2) / (3 * a ** 2);
  const q = (2 * b ** 3) / (27 * a ** 3) - (b * c) / (3 * a ** 2) + d / a;
  const discriminant = (q ** 2) / 4 + (p ** 3) / 27;

  if (discriminant > 0) {
    // One real root and two complex roots
    const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
    const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
    const root1 = u + v - b / (3 * a);
    return [root1];
  } else if (discriminant === 0) {
    // All roots are real and at least two are equal
    const u = Math.cbrt(-q / 2);
    const root1 = 2 * u - b / (3 * a);
    const root2 = -u - b / (3 * a);
    return [root1, root2];
  } else {
    // Three distinct real roots
    const r = Math.sqrt(-p ** 3 / 27);
    const phi = Math.acos(-q / (2 * r));
    const root1 = 2 * Math.cbrt(r) * Math.cos(phi / 3) - b / (3 * a);
    const root2 = 2 * Math.cbrt(r) * Math.cos((phi + 2 * Math.PI) / 3) - b / (3 * a);
    const root3 = 2 * Math.cbrt(r) * Math.cos((phi + 4 * Math.PI) / 3) - b / (3 * a);
    return [root1, root2, root3];
  }
}

/**
 * Displays the solution in the #solution div.
 * @param message The message to display
 */
function displaySolution(message: string): void {
  const solutionDiv = document.getElementById("solution");
  if (solutionDiv) {
    solutionDiv.textContent = message;
  }
}