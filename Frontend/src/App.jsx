
function App() {
  return (
    <div className="app-layout">
      {/* Left sidebar */}
      <aside className="sidebar">
        <h2 className="brand">PlacePrep</h2>

        <p className="menu-label">MENU</p>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-link active">
            Dashboard
          </a>

          <a href="#companies" className="nav-link">
            Companies
          </a>

          <a href="#preparation" className="nav-link">
            Preparation
          </a>

          <a href="#applications" className="nav-link">
            My Applications
          </a>
        </nav>
      </aside>

      {/* Main application area */}
      <div className="main-area">
        {/* Top navbar */}
        <header className="top-navbar">
          <p>Student Portal</p>
          <span className="profile">Student</span>
        </header>

        {/* Dashboard content */}
        <main className="dashboard">
          <div className="page-heading">
            <h1>Dashboard</h1>
            <p>
              Track placement opportunities and prepare for your career.
            </p>
          </div>

          <section className="stats-grid">
            <article className="stat-card">
              <h3>Companies</h3>
              <p>Explore placement opportunities</p>
            </article>

            <article className="stat-card">
              <h3>Upcoming Drives</h3>
              <p>Check upcoming placement events</p>
            </article>

            <article className="stat-card">
              <h3>My Applications</h3>
              <p>Track your registration status</p>
            </article>
          </section>

          <section className="content-section">
            <h2>Upcoming Opportunities</h2>
            <p>
              Placement opportunities will appear here.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
