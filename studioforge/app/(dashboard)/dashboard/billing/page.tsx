import { redirect } from "next/navigation";
import { InvoiceForm } from "@/components/dashboard/invoice-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getBookings, getCustomers, getInvoices, getLatestProject } from "@/lib/db/queries";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function BillingPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [invoices, customers, bookings, latestProject] = await Promise.all([
    getInvoices(user.id),
    getCustomers(user.id),
    getBookings(user.id),
    getLatestProject(user.id)
  ]);

  return (
    <div className="content-grid">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h1 className="panel-title">Billing</h1>
            <p className="section-copy">
              Issue invoices, connect them to customers or bookings, and keep tenant finances tidy.
            </p>
          </div>
          {latestProject ? <span className="badge">{latestProject.name}</span> : null}
        </div>
        {latestProject ? (
          <InvoiceForm appId={latestProject.id} bookings={bookings} customers={customers} />
        ) : (
          <div className="empty-state">Create the salon app first so invoices can be attached to it.</div>
        )}
      </section>

      <section className="table-panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Invoices</h2>
            <p className="section-copy">Billing rows stay tenant-safe through database policies.</p>
          </div>
        </div>
        {invoices.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Status</th>
                  <th>Due date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoice_number}</td>
                    <td>
                      <span className="badge">{invoice.status}</span>
                    </td>
                    <td>{invoice.due_date ? formatDate(invoice.due_date) : "Not set"}</td>
                    <td>{formatCurrency(invoice.amount_cents, invoice.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">No invoices yet.</div>
        )}
      </section>
    </div>
  );
}
