import { isValidCurrency } from "@/utils";

export async function GET(request: Request) {
  const res = await fetch(
    `${process.env.CURRENCY_API_URL}/latest?apikey=${process.env.CURRENCY_API_KEY}&base=USD`
  );
  const data = await res.json();

  const rates = data.data;

  for (const currency of Object.keys(rates)) {
    if (!isValidCurrency(currency)) {
      delete rates[currency];
    }
  }

  return Response.json(rates);
}

export const runtime = "edge";
