const { Link } = ReactRouterDOM;
export const AppHome = () => {
  return <section className="app-home">
    <div className="hero">
      <div className="hero-txt">
        <h1></h1>
        <a href="#cards">Get Started</a>
      </div>
    </div>
    <div id="cards" className="main-container flex column">
      <h2>Our Features</h2>
      <div className="cards-container">
        <div className="card flex align-center justify-center column">
          <img src="assets/img/gmail.png" />
          <h3>Appsus mail</h3>
          <p>Appsus mail is email that's intuitive, efficient, and useful.</p>
          <Link to="/emails/inbox">Learn More</Link>
        </div>
        <div className="card flex align-center justify-center column">
          <img src="assets/img/keep.png" />
          <h3>Appsus keep</h3>
          <p>Capture what's on your mind. Add notes, lists and photos to Appsus Keep.</p>
          <Link to="/keep">Learn More</Link>
        </div>
        <div className="card flex align-center justify-center column">
          <img src="assets/img/books.png" />
          <h3>Appsus books</h3>
          <p>Appsus Books lets you lose yourself in the best books right on your device.</p>
          <Link to="/book">Learn More</Link>
        </div>
      </div>
      <h2>Our Team</h2>
      <div className="team-container flex column align-center justify-center">
        <div className="team-member flex justify-center align-center">
          <img src="assets/img/ziv.jpg" />
          <div className="details">
            <h3>Ziv Shuvy</h3>
            <p>21 years old from Hadera ,Israel. Passionate about coding and love to learn new things.
              Studying web development in Coding-Academy.</p>
          </div>
          <div className="social">
            <a href="https://instagram.com/zivshuvy?utm_medium=copy_link" className="fab fa-instagram"></a>
            <a href="https://www.facebook.com/Zivshuvy/" className="fab fa-facebook-f"></a>
            <a href="#" className="fab fa-linkedin"></a>
          </div>
        </div>
        <div className="team-member flex justify-center align-center">
          <img src="assets/img/aviv.jpg" />
          <div className="details">
            <h3>Aviv Yaari</h3>
            <p>25 years old from Raanana, Israel. Always looking for a new challenge!
              Studying web development in Coding-Academy.</p>
          </div>
          <div className="social">
            <a href="https://www.instagram.com/avivyaari/" className="fab fa-instagram"></a>
            <a href="https://www.facebook.com/aviv.yaari/" className="fab fa-facebook-f"></a>
            <a href="https://www.linkedin.com/in/aviv-yaari-8a797a197/" className="fab fa-linkedin"></a>
          </div>
        </div>

      </div>

    </div>
  </section>;
};
