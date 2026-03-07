function Bar({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted/70 ${className}`} />
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export const DashboardTodayCardSkeleton = () => {
  return (
    <Card className="border-primary/20 bg-linear-to-br from-primary/20 to-primary/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-3">
          <Bar className="h-4 w-28 bg-primary/30" />
          <Bar className="h-10 w-72 max-w-full bg-primary/40" />
          <Bar className="h-4 w-40 bg-primary/30" />
          <Bar className="h-8 w-36 rounded-full bg-primary/30" />
        </div>
        <div className="mx-auto md:mx-0">
          <Bar className="h-40 w-40 rounded-full bg-primary/30" />
        </div>
      </div>
    </Card>
  );
};

export const DashboardQuickStarterSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <Bar className="mb-3 h-12 w-12 rounded-lg" />
          <Bar className="mb-2 h-4 w-24" />
          <Bar className="mb-2 h-8 w-28" />
          <Bar className="h-3 w-36" />
        </Card>
      ))}
    </div>
  );
};

export const DashboardMiniCalendarSkeleton = () => {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <Bar className="h-6 w-40" />
        <Bar className="h-5 w-20" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <Bar key={i} className="h-20 w-16 rounded-lg" />
        ))}
      </div>
    </Card>
  );
};

export const DashboardMotivationSkeleton = () => {
  return (
    <>
      <Card className="border-accent/30 bg-accent/10">
        <Bar className="mb-2 h-5 w-40" />
        <Bar className="mb-4 h-4 w-64 max-w-full" />
        <Bar className="h-16 w-full rounded-lg" />
      </Card>
      <Bar className="h-12 w-full rounded-xl bg-primary/30" />
    </>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Bar className="h-9 w-64" />
        <Bar className="h-4 w-80 max-w-full" />
      </div>

      <DashboardTodayCardSkeleton />

      <DashboardQuickStarterSkeleton />

      <DashboardMiniCalendarSkeleton />

      <DashboardMotivationSkeleton />
    </div>
  );
};

export const DailyTrackerSkeleton = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Gradient header card */}
      <div className="rounded-2xl border border-primary/20 bg-linear-to-r from-primary/30 to-primary/10 p-6 shadow-sm">
        <Bar className="mb-3 h-4 w-40 bg-primary/30" />
        <Bar className="mb-3 h-9 w-64 max-w-full bg-primary/40" />
        <Bar className="h-7 w-36 rounded-full bg-primary/30" />
      </div>

      {/* Main tracker card */}
      <Card className="space-y-8">
        {/* Fasting row */}
        <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
          <div className="flex items-center gap-3">
            <Bar className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Bar className="h-5 w-32" />
              <Bar className="h-4 w-44 max-w-full" />
            </div>
          </div>
          <Bar className="h-9 w-15 rounded-full" />
        </div>

        {/* Prayer checklist */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Bar className="h-6 w-40" />
            <Bar className="h-4 w-24" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-border p-4"
              >
                <Bar className="h-6 w-6 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Bar className="h-4 w-24" />
                  <Bar className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quran input */}
        <div>
          <Bar className="mb-4 h-6 w-36" />
          <div className="flex items-center gap-4">
            <Bar className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2 text-center">
              <Bar className="mx-auto h-8 w-16" />
              <Bar className="mx-auto h-4 w-24" />
            </div>
            <Bar className="h-10 w-10 rounded-lg" />
          </div>
        </div>

        {/* Dhikr row */}
        <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
          <div className="flex items-center gap-3">
            <Bar className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Bar className="h-5 w-24" />
              <Bar className="h-4 w-36 max-w-full" />
            </div>
          </div>
          <Bar className="h-9 w-15 rounded-full" />
        </div>

        {/* Notes */}
        <div>
          <Bar className="mb-4 h-6 w-32" />
          <Bar className="h-32 w-full rounded-xl" />
        </div>
      </Card>

      {/* Save button */}
      <Bar className="h-12 w-full rounded-xl bg-primary/30" />
    </div>
  );
};

export const CalendarSkeleton = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="space-y-3">
        <Bar className="h-9 w-64" />
        <Bar className="h-4 w-96 max-w-full" />
      </div>

      <Card>
        <div className="mb-6 flex items-center justify-between">
          <Bar className="h-6 w-36" />
          <div className="flex gap-2">
            <Bar className="h-9 w-9 rounded-lg" />
            <Bar className="h-9 w-9 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:grid-cols-7">
          {Array.from({ length: 30 }).map((_, i) => (
            <Bar key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      </Card>
    </div>
  );
};

export const InsightsSkeleton = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="space-y-3">
        <Bar className="h-9 w-56" />
        <Bar className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-primary/10 border-primary/20">
          <Bar className="mb-3 h-5 w-36" />
          <Bar className="mb-2 h-10 w-24" />
          <Bar className="h-4 w-56 max-w-full" />
        </Card>
        <Card className="bg-accent/10 border-accent/20">
          <Bar className="mb-3 h-5 w-36" />
          <Bar className="mb-2 h-10 w-24" />
          <Bar className="h-4 w-56 max-w-full" />
        </Card>
      </div>

      <Card>
        <Bar className="mb-6 h-6 w-48" />
        <Bar className="h-72 w-full rounded-xl" />
      </Card>

      <Card>
        <Bar className="mb-6 h-6 w-48" />
        <Bar className="h-72 w-full rounded-xl" />
      </Card>
    </div>
  );
};

export const SettingsSkeleton = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-3">
        <Bar className="h-9 w-44" />
        <Bar className="h-4 w-80 max-w-full" />
      </div>

      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <Bar className="mb-5 h-6 w-40" />
          <div className="space-y-3">
            <Bar className="h-12 w-full" />
            <Bar className="h-12 w-full" />
            <Bar className="h-12 w-44" />
          </div>
        </Card>
      ))}
    </div>
  );
};
