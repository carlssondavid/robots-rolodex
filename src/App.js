import React from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  // Fetching response from url and converting it into json. The users are then set as "monsters" in the array.
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  // Since we use an arrow function, this will be bound to where we defined it in the first place.
  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    // Destructuring the states in order to use filter on them
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1> Robots Rolodex </h1>
        <SearchBox
          placeholder="search robots"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
