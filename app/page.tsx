import Effects from "../components/Effects";
import { site, sections, about, statusInfo, contacts } from "../data/content";
import { getContent } from "../lib/items";

function Head({ i }: { i: number }) {
  return (
    <div>
      <div className="num">{String(i + 1).padStart(2, "0")}</div>
      <h2>{sections[i].title}</h2>
    </div>
  );
}

export default async function Home() {
  const { wasAt, achievements, projects, news, goals } = await getContent();

  const counts = {
    projects: projects.length,
    flagship: wasAt.filter((e) => e.tag === "Flagship").length,
    talks: wasAt.filter((e) => e.tag === "Talks and Stages").length,
  };

  return (
    <>
      <div id="ld">
        <div className="m g pill">{site.initials}</div>
        <div className="mono mut" id="cn">000</div>
        <div className="bar"><div id="br"></div></div>
        <div className="mono mut">Setting the table…</div>
      </div>
      <div id="blobs"></div>
      <canvas id="cv" aria-hidden="true"></canvas>
      <div id="pf"></div>

      <nav className="g pill">
        <a href="#top" style={{ fontWeight: "600" }}>{site.name}</a>
        <span className="l">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.title}</a>
          ))}
        </span>
      </nav>

      <main id="top">
        <header className="hero" style={{ position: "relative" }}>
          <div>
            <span className="mono mut">
              {site.city} · <span id="clk">--:--</span> local
            </span>
            <h1>{site.name}</h1>
            <p className="sub mut">{site.tagline}</p>
            <span style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#projects" className="btn pill" style={{ background: "var(--acc)", color: "var(--accfg)" }}>
                View projects
              </a>
              <a href="#meet" className="btn g pill">Get in touch</a>
            </span>
            <div className="stats">
              {site.stats.map((s) => (
                <div key={s.label}><b>{s.count ? counts[s.count] : s.value}</b><span>{s.label}</span></div>
              ))}
            </div>
          </div>
          <div className="tickr">
            <div className="tl"><b>Breaking News!</b><span>From the man himself</span></div>
            <div className="tv"><div id="tk"></div></div>
          </div>
        </header>

        <section className="sec" id="about">
          <Head i={0} />
          <div className="g" style={{ padding: "32px", display: "grid", gridTemplateColumns: "200px 1fr", gap: "28px", alignItems: "center" }}>
            <div style={{ height: "220px", borderRadius: "20px", background: "linear-gradient(150deg,var(--b1),var(--b2))" }}></div>
            <div>
              <p style={{ margin: "0 0 20px", fontSize: "18px", lineHeight: "1.7" }}>{about.text}</p>
              {about.chips.map((c) => (
                <span key={c}><span className="chip g pill">{c}</span>{" "}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="was-at">
          <Head i={1} />
          <div className="cards">
            {wasAt.map((e, k) => (
              <div className="g card" key={k}>
                {e.tag && <span className="chip g pill">{e.tag}</span>}
                <p className="yr">{e.year}</p>
                <p className="mut">{e.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="achievements">
          <Head i={2} />
          <div className="cards">
            {achievements.map((a, k) => (
              <div className="g card" key={k}>
                {a.tag && <span className="chip g pill">{a.tag}</span>}
                <p className="yr">{a.year}</p>
                <p className="mut">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="projects">
          <Head i={3} />
          <div>
            <div className="tabs">
              <button className="on" data-f="all">All</button>
              {(Object.keys(statusInfo) as (keyof typeof statusInfo)[]).map((k) => (
                <button key={k} data-f={k}>{statusInfo[k].label}</button>
              ))}
            </div>
            <div className="cards">
              {projects.map((p, k) => (
                <div className="g card" data-s={p.status} key={k}>
                  <div className="th"></div>
                  <span className="chip g pill">
                    <span className="dot" style={{ background: statusInfo[p.status].color }}></span>
                    {statusInfo[p.status].label}
                  </span>
                  <p className="n">{p.title}</p>
                  <p className="mut" style={{ marginTop: "6px", fontSize: "14px" }}>
                    {p.stack} · {p.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="news">
          <Head i={4} />
          <div>
            <div className="cards">
              {news.map((n, k) => (
                <div className="g card" key={k}>
                  <div className="th"></div>
                  <p className="n">{n.title}</p>
                  <p className="mut" style={{ marginTop: "6px", fontSize: "14px" }}>{n.date}</p>
                  <p className="mut" style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "1.6" }}>{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="want">
          <Head i={5} />
          <div className="hs">
            {goals.map((g, k) => (
              <div className="g card" key={k}>
                <p className="yr">{g.label}</p>
                <p className="mut">{g.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec" id="meet">
          <Head i={6} />
          <div>
            {contacts.map((c) => (
              <a
                className="g row"
                key={c.label}
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <b style={{ fontSize: "19px", fontWeight: "600" }}>{c.value}</b>
                <span className="mut">{c.label}</span>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <span>© {site.year} {site.name} · {site.city}</span>
        </footer>
      </main>
      <Effects />
    </>
  );
}
