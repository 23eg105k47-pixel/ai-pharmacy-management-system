export function formatCurrency(amountInCents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amountInCents / 100);
}

export function formatDateTime(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(input));
}

export function formatDate(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium"
  }).format(new Date(input));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
