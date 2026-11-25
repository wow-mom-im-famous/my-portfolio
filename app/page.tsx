import Effects from "../components/Effects";

export default function Home() {
  return (
    <>
      <div id="ld"><div className="m g pill">JS</div><div className="mono mut" id="cn">000</div><div className="bar"><div id="br"></div></div><div className="mono mut">Setting the table…</div></div>
      <div id="blobs"></div><canvas id="cv" aria-hidden="true"></canvas><div id="pf"></div>

      <nav className="g pill"><a href="#top" style={{ fontWeight: '600' }}>Johaan Sebastian</a>
      <span className="l"><a href="#about">About me</a><a href="#was-at">I was at...</a><a href="#achievements">Personal Achievements</a><a href="#projects">My Projects</a><a href="#news">News Flash</a><a href="#want">I want to...</a><a href="#meet">Meet me at...</a></span>
      </nav>

      <main id="top">
      <header className="hero" style={{ position: 'relative' }}>
      <div>
      <span className="mono mut">Bangalore · <span id="clk">--:--</span> local</span>
      <h1>Johaan Sebastian</h1>
      <p className="sub mut">Software engineer building thoughtful products, writing about them, and shipping live demos.</p>
      <span style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}><a href="#projects" className="btn pill" style={{ background: 'var(--acc)', color: 'var(--accfg)' }}>View projects</a><a href="#meet" className="btn g pill">Get in touch</a></span>
      <div className="stats"><div><b>[00]</b><span>projects built</span></div><div><b>[00]</b><span>flagship</span></div><div><b>[00]</b><span>talks &amp; stages</span></div></div>
      </div>
      <div className="tickr"><div className="tl"><b>Breaking News!</b><span>From the man himself</span></div><div className="tv"><div id="tk"></div></div></div>
      </header>

      <section className="sec" id="about"><div><div className="num">01</div><h2>About me</h2></div>
      <div className="g" style={{ padding: '32px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '28px', alignItems: 'center' }}><div style={{ height: '220px', borderRadius: '20px', background: 'linear-gradient(150deg,var(--b1),var(--b2))' }}></div><div><p style={{ margin: '0 0 20px', fontSize: '18px', lineHeight: '1.7' }}>A short statement about who you are, what you build, and what you care about. Two or three sentences work best.</p><span className="chip g pill">[Studying]</span> <span className="chip g pill">[Founder]</span> <span className="chip g pill">[Plays]</span></div></div></section>

      <section className="sec" id="was-at"><div><div className="num">02</div><h2>I was at...</h2></div>
      <div className="cards"><div className="g card"><p className="yr">2026</p><p className="mut">[Event or hackathon name]</p></div><div className="g card"><p className="yr">2025</p><p className="mut">[Event or hackathon name]</p></div><div className="g card"><p className="yr">2024</p><p className="mut">[Event or hackathon name]</p></div></div></section>

      <section className="sec" id="achievements"><div><div className="num">03</div><h2>Personal Achievements</h2></div>
      <div className="cards"><div className="g card"><p className="yr">2026</p><p className="mut">[Award, certification, or milestone]</p></div><div className="g card"><p className="yr">2025</p><p className="mut">[Award, certification, or milestone]</p></div><div className="g card"><p className="yr">2024</p><p className="mut">[Award, certification, or milestone]</p></div></div></section>

      <section className="sec" id="projects"><div><div className="num">04</div><h2>My Projects</h2></div>
      <div><div className="tabs"><button className="on" data-f="all">All</button><button data-f="up">Up and running</button><button data-f="arch">Archived</button><button data-f="dev">In development</button></div>
      <div className="cards">
      <div className="g card" data-s="up"><div className="th"></div><span className="chip g pill"><span className="dot" style={{ background: '#6F8F72' }}></span>Up and running</span><p className="n">[Project one]</p><p className="mut" style={{ marginTop: '6px', fontSize: '14px' }}>Stack · 2026</p></div>
      <div className="g card" data-s="arch"><div className="th"></div><span className="chip g pill"><span className="dot" style={{ background: '#9A978F' }}></span>Archived</span><p className="n">[Project two]</p><p className="mut" style={{ marginTop: '6px', fontSize: '14px' }}>Stack · 2023</p></div>
      <div className="g card" data-s="dev"><div className="th"></div><span className="chip g pill"><span className="dot" style={{ background: '#B79A5B' }}></span>In development</span><p className="n">[Project three]</p><p className="mut" style={{ marginTop: '6px', fontSize: '14px' }}>Stack · 2026</p></div>
      </div></div></section>

      <section className="sec" id="news"><div><div className="num">05</div><h2>News Flash</h2></div>
      <div><div className="cards">
      <div className="g card"><div className="th"></div><p className="n">[Headline one]</p><p className="mut" style={{ marginTop: '6px', fontSize: '14px' }}>[Date]</p><p className="mut" style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: '1.6' }}>A short snippet in your own words. One or two sentences.</p></div>
      <div className="g card"><div className="th"></div><p className="n">[Headline two]</p><p className="mut" style={{ marginTop: '6px', fontSize: '14px' }}>[Date]</p><p className="mut" style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: '1.6' }}>A short snippet in your own words. One or two sentences.</p></div>
      <div className="g card"><div className="th"></div><p className="n">[Headline three]</p><p className="mut" style={{ marginTop: '6px', fontSize: '14px' }}>[Date]</p><p className="mut" style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: '1.6' }}>A short snippet in your own words. One or two sentences.</p></div>
      </div></div></section>

      <section className="sec" id="want"><div><div className="num">06</div><h2>I want to...</h2></div>
      <div className="hs"><div className="g card"><p className="yr">2027</p><p className="mut">[A goal, skill, or milestone you are aiming for]</p></div><div className="g card"><p className="yr">2028</p><p className="mut">[A goal, skill, or milestone you are aiming for]</p></div><div className="g card"><p className="yr">2029</p><p className="mut">[A goal, skill, or milestone you are aiming for]</p></div><div className="g card"><p className="yr">2030</p><p className="mut">[A goal, skill, or milestone you are aiming for]</p></div><div className="g card"><p className="yr">Someday</p><p className="mut">[A goal, skill, or milestone you are aiming for]</p></div><div className="g card"><p className="yr">Someday</p><p className="mut">[A goal, skill, or milestone you are aiming for]</p></div></div></section>

      <section className="sec" id="meet"><div><div className="num">07</div><h2>Meet me at...</h2></div>
      <div><div className="g row"><b style={{ fontSize: '19px', fontWeight: '600' }}>hello@[yourdomain]</b><span className="mut">Email</span></div><div className="g row"><b style={{ fontSize: '19px', fontWeight: '600' }}>[linkedin.com/in/yourname]</b><span className="mut">LinkedIn</span></div><div className="g row"><b style={{ fontSize: '19px', fontWeight: '600' }}>[github.com/yourname]</b><span className="mut">GitHub</span></div></div></section>

      <footer><span>© 2026 Johaan Sebastian · Bangalore</span></footer>
      </main>
      <Effects />
    </>
  );
}
