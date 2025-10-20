import { generatePasswordFromRandom } from "../lib/generate-passwd";

describe("generatePasswordFromRandom - tests exhaustivos", () => {
  it("debe generar contraseña cuando min == max (longitud fija)", () => {
    const pw = generatePasswordFromRandom(12, 12, true, true, true, true, "", () => 0.5);
    expect(pw.length).toBe(12);
  });

  it("debe lanzar error si las longitudes no son enteros", () => {
    expect(() => generatePasswordFromRandom(8.5 as any, 12, true, true, true, true, "", Math.random)).toThrow(
      "Las longitudes deben ser enteros."
    );
    expect(() => generatePasswordFromRandom(8, 12.2 as any, true, true, true, true, "", Math.random)).toThrow(
      "Las longitudes deben ser enteros."
    );
  });

  it("debe ser determinista con randomFn fijo", () => {
    // randomFn that cycles through predetermined values
    const seq = [0.1, 0.2, 0.3, 0.4];
    let idx = 0;
    const rnd = () => {
      const v = seq[idx % seq.length];
      idx++;
      return v;
    };
    const a = generatePasswordFromRandom(5, 10, true, true, true, true, "", rnd);
    // reset idx and generate again
    idx = 0;
    const b = generatePasswordFromRandom(5, 10, true, true, true, true, "", rnd);
    expect(a).toBe(b);
  });
});
