export function LandingPageFooter() {
  return (
    <footer className="px-4 py-8 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto text-center text-muted-foreground">
        <p>
          © 2026 Ramadan Tracker. Build by{" "}
          <a
            href="https://www.linkedin.com/in/muhammad-turkmen-792498272"
            className="underline"
            target="_blank"
          >
            Muhammad Turkmen
          </a>
          {/* {t('landing.footer')} */}
        </p>
      </div>
    </footer>
  );
}
