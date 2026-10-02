export function Tailoring() {
  return (
    <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:py-28">
      <div>
        <h2 className="max-w-[20ch] text-2xl font-semibold sm:text-3xl">
          Same experience. Told the way each job needs to hear it.
        </h2>
        <p className="mt-4 max-w-[52ch] text-fg-2">
          For every application, Rolevia reorders and rephrases what you have
          already done so the most relevant work comes first. It picks a
          template that suits the company, and it never adds skills, titles or
          dates that are not in your source documents.
        </p>
      </div>

      <div className="grid gap-4">
        <figure className="card p-5">
          <figcaption className="text-xs font-medium text-fg-3">
            From your resume
          </figcaption>
          <p className="mt-2 text-fg-2">
            Built backend services in Node.js and maintained the team&apos;s
            PostgreSQL databases and job queues.
          </p>
        </figure>
        <figure className="card border-accent/40 p-5 shadow-md">
          <figcaption className="text-xs font-medium text-accent">
            Tailored for a payments platform role
          </figcaption>
          <p className="mt-2">
            Owned the Node.js services and PostgreSQL schema behind payment
            processing, including the job queues that run settlement batches.
          </p>
          <p className="mt-3 text-sm text-fg-3">
            Every claim traces back to a line in your resume.
          </p>
        </figure>
      </div>
    </section>
  );
}
