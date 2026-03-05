// Update the calculation table directly in the HTML
function updateCalculationTable(p: number, q: number, discriminant: number, roots: (number | string)[]): void {
  document.getElementById("p-value")!.textContent = p.toString();
  document.getElementById("q-value")!.textContent = q.toString();
  document.getElementById("discriminant-value")!.textContent = discriminant.toString();

  document.getElementById("root1-value")!.textContent = roots[0]?.toString() || "-";
  document.getElementById("root2-value")!.textContent = roots[1]?.toString() || "-";
  document.getElementById("root3-value")!.textContent = roots[2]?.toString() || "-";
}

// Update the form submission handler to use the static table
const form = document.getElementById("cubic-form");
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const a = parseFloat((<HTMLInputElement>document.getElementById("a")).value);
  const b = parseFloat((<HTMLInputElement>document.getElementById("b")).value);
  const c = parseFloat((<HTMLInputElement>document.getElementById("c")).value);
  const d = parseFloat((<HTMLInputElement>document.getElementById("d")).value);

  if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
    displaySolution("Please enter valid numbers for all coefficients.");
    return;
  }

  const p = c / a - (b ** 2) / (3 * a ** 2);
  const q = (2 * b ** 3) / (27 * a ** 3) - (b * c) / (3 * a ** 2) + d / a;
  const discriminant = (q ** 2) / 4 + (p ** 3) / 27;

  const roots = solveCubic(a, b, c, d);
  updateCalculationTable(p, q, discriminant, roots);
});
