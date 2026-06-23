export type SalonBlueprint = {
  appName: string;
  brandPositioning: string;
  targetAudience: string;
  featureSummary: {
    customers: string[];
    bookings: string[];
    billing: string[];
  };
  automations: string[];
  starterMetrics: {
    dailyBookingGoal: number;
    averageTicketUsd: number;
    monthlyRevenueTargetUsd: number;
  };
  launchChecklist: string[];
};
