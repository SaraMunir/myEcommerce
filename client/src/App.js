import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import WomenPage from './components/WomenPage';
import ManPage from './components/ManPage';
import KidsPage from './components/KidsPage';
import BagsPage from './components/BagsPage'
import AccessoriesPage from './components/AccessoriesPage'
import ShoesPage from './components/ShoesPage'
import WomensWear from './components/WomensWear/WomensWear';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path={["/","/HomePage"]} component={HomePage}/>
        <Route exact path="/Women" component={WomenPage}/>
        <Route path="/Womens" component={WomensWear}/>
        <Route exact path="/Men" component={ManPage}/>
        <Route exact path="/Kids" component={KidsPage}/>
        <Route exact path="/Bags" component={BagsPage}/>
        <Route exact path="/Shoes" component={ShoesPage}/>
        <Route exact path="/Accessories" component={AccessoriesPage}/>
      </Router>
    </div>
  );
}

export default App;
