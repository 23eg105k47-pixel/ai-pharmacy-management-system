import { redirect } from "next/navigation";
import { GeneratorForm } from "@/components/generator/generator-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getDashboardSnapshot } from "@/lib/db/queries";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { SalonBlueprint } from "@/types/salon";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const snapshot = await getDashboardSnapshot(user.id);
  const blueprint = snapshot.latestProject?.ai_spec as SalonBlueprint | undefined;

  return (
    <div className="content-grid">
      <section className="hero-panel panel">
        <div className="eyebrow">AI Builder</div>
        <h1 className="hero-title">Design and operate a salon SaaS from one secure tenant shell.</h1>
        <p className="section-copy">
          Prompt the AI to shape your salon app, then manage customers, bookings, and billing
          inside a Supabase-backed multi-tenant workspace with row-level security.
        </p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Customers</div>
          <div className="stat-value">{snapshot.stats.customerCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Upcoming bookings</div>
          <div className="stat-value">{snapshot.stats.bookingCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Invoices</div>
          <div className="stat-value">{snapshot.stats.invoiceCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tracked revenue</div>
          <div className="stat-value">{formatCurrency(snapshot.stats.revenueCents)}</div>
        </div>
      </section>

      <section className="two-column-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Generate your salon app blueprint</h2>
              <p className="section-copy">
                Ask for tone, clientele, premium tiers, automation rules, or booking workflows.
              </p>
            </div>
            <span className="badge">OpenAI + Supabase</span>
          </div>
          <GeneratorForm />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Latest app blueprint</h2>
              <p className="section-copy">
                The most recent AI architecture response stored for this user tenant.
              </p>
            </div>
          </div>

          {snapshot.latestProject && blueprint ? (
            <div className="subtle-grid">
              <div className="feature-card">
                <div className="muted">Project name</div>
                <h3 className="section-title" style={{ marginTop: 8 }}>
                  {snapshot.latestProject.name}
                </h3>
                <p className="section-copy">{blueprint.brandPositioning}</p>
              </div>
              <div className="feature-card">
                <div className="muted">Target audience</div>
                <p style={{ marginTop: 10 }}>{blueprint.targetAudience}</p>
              </div>
              <div className="feature-card">
                <div className="muted">Last generated</div>
                <p style={{ marginTop: 10 }}>{formatDateTime(snapshot.latestProject.created_at)}</p>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              No blueprint yet. Generate a salon app to populate tenant data and feature strategy.
            </div>
          )}
        </div>
      </section>

      {blueprint ? (
        <section className="feature-grid">
          <div className="feature-card">
            <h2 className="section-title">Customers</h2>
            <ul className="feature-list">
              {blueprint.featureSummary.customers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="feature-card">
            <h2 className="section-title">Bookings</h2>
            <ul className="feature-list">
              {blueprint.featureSummary.bookings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="feature-card">
            <h2 className="section-title">Billing</h2>
            <ul className="feature-list">
              {blueprint.featureSummary.billing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="two-column-grid">
        <div className="table-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Recent customers</h2>
              <p className="section-copy">Read model served from tenant-scoped Postgres tables.</p>
            </div>
          </div>
          {snapshot.customers.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.full_name}</td>
                      <td>{customer.email ?? "Not set"}</td>
                      <td>{customer.phone ?? "Not set"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">Customer records will appear here after you add them.</div>
          )}
        </div>

        <div className="table-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Upcoming bookings</h2>
              <p className="section-copy">Booking operations are isolated with user-based RLS.</p>
            </div>
          </div>
          {snapshot.bookings.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Start</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.service_name}</td>
                      <td>
                        <span className="badge">{booking.status}</span>
                      </td>
                      <td>{formatDateTime(booking.starts_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">Bookings will appear here once your salon starts scheduling.</div>
          )}
        </div>
      </section>
    </div>
  );
}
