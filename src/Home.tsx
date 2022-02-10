import "./Home.scss";

function Home() {
    return (
        <div className="home-main">
            <h1>Welcome back (Insert Name).</h1>
            <h3>Today you spent: $69</h3>
            <h3>So far this week you spent: $420</h3>
            <div className="remaining-week-section">
                <h2>Remaining balance this week: <span className="remaining-balance">$99</span></h2>
            </div>
        </div>
    );
}

export default Home;
