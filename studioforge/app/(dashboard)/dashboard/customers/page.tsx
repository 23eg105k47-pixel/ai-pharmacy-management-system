import { redirect } from "next/navigation";
import { CustomerForm } from "@/components/dashboard/customer-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCustomers, getLatestProject } from "@/lib/db/queries";

export default async function CustomersPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [customers, latestProject] = await Promise.all([
    getCustomers(user.id),
    getLatestProject(user.id)
  ]);

  return (
    <div className="content-grid">
      <section className="panel">
        <div className="panel-header">
          <div>
            <h1 className="panel-title">Customers</h1>
            <p className="section-copy">
              Capture client records inside the current tenant with email, phone, and notes.
            </p>
          </div>
          {latestProject ? <span className="badge">{latestProject.name}</span> : null}
        </div>
        {latestProject ? (
          <CustomerForm appId={latestProject.id} />
        ) : (
          <div className="empty-state">
            Generate a salon app blueprint first so new customer records can be attached to an app.
          </div>
        )}
      </section>

      <section className="table-panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Customer directory</h2>
            <p className="section-copy">Every row is scoped by `user_id` and protected by RLS.</p>
          </div>
        </div>
        {customers.length ? (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.full_name}</td>
                    <td>{customer.email ?? "Not set"}</td>
                    <td>{customer.phone ?? "Not set"}</td>
                    <td>{customer.notes ?? "None"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">No customers yet.</div>
        )}
      </section>
    </div>
  );
}
