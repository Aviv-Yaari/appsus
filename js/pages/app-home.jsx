export class AppHome extends React.Component {

  state = {
    heroTxt: { txt: 'Appsus provides an email that\'s intuitive, efficient, and useful.', type: 1 }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { heroTxt } = this.state;
      if (heroTxt.type === 1) {
        this.setState({ heroTxt: { txt: 'Notes', type: 2 } })
      } else if (heroTxt.type === 2) {
        this.setState({ heroTxt: { txt: 'Books', type: 3 } })
      } else {
        this.setState({ heroTxt: { txt: 'Appsus provides an email that\'s intuitive, efficient, and useful.', type: 1 } })
      }
    }, 6000)
  }

  copmomentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { txt } = this.state.heroTxt;
    return <section className="app-home">
      <div className="hero">
        <div className="hero-txt">
          <h1>{txt}</h1>
          <a href="#cards">Get Started</a>
        </div>
      </div>
      <div className="container">
        <div id="cards" className="cards-container">
          <div className="card">

          </div>
          <div className="card">

          </div>
          <div className="card">

          </div>
        </div>

      </div>
    </section>;
  }
};
