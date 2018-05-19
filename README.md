# WarsawJS Workshop 20 Flight Scanner

### 0. Setup
1. Tworzymy aplikację poprzez `npx create-react-app warsawjs-workshop-20-flights-search`
2. Odpalamy ją za pomocą `npm start`

### 1. 	Mainframe
1. Stworzyć główny komponent `<App />`, który wyświetla „Hello World” w `App.js`
```javascript
import React from "react";

export default class App extends React.Component {
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}
```

3. Wyrenderować `<App />` za pomocą react-dom (`ReactDOM.render(<App />, document.getElementById("root")`)
4. Dodać bazowe cssy (`import "./index.css"`)

### 2. Widok wyszukiwania
1. Stworzyć komponent `<SearchView />`
2. Dodać w nim znacznik `form`
3. Dodać dwa znaczniki `select`:  [Do, Z] z opcjami `WAW, ATL`
4. Dodać dwa znaczniki `input[type="date"]` Data wylotu, Data powrotu
5. Podpiąć pod nie metody zmieniające `state` na ich wartości
```javascript
class SearchView extends React.Component {
  onToChange = (e) => this.setState({ to: e.target.value });
  render() {
    return (
      <div>
        <input onChange={this.onToChange} />
      </div>
    )
  }
}
```
6. Ustalić wartość `inputów` na wartości ze `state`
```javascript
<input onChange={this.onToChange} value={this.state.to} />
```
7. Dodać `onSubmit` do `form` (zwykły `console.log` state'a)<br />
 	7.1 Dodać walidację pól (czy są wypełnione, czy data początkowa jest wcześniej niż data końcowa)<br />
	7.2 Ważne, aby pamiętać o zablokowaniu domyślnego zachowania formularza – `evt.preventDefault()`

### 3. Widok wyników
1. Stworzyć kolejny component `<FlightsView />`
2. W `<App />` renderować komponent w zależności od wartości state'u (`view === "search"` czy `view === "flights"`)
3. Dodać zmianę state'a w `<App />` (przekazanie metody jako prop do `<SearchView />`; zmiana `state.view` oraz `state.searchData`)
4. Zrobić zapytanie do api (`https://warsawjs-flights-api.herokuapp.com/flights/:outboundDate/:inboundDate/:outboundAirport/:inboundAirport`) za pomocą `fetch` w `componentDidMount` i zapisać je do state'a
5. Wyświetlić dane w prosty sposób np.
```javascript
render() {
  return this.state.flights.map( flight => (<p>Price: ${flight.price}</p>);
}
```
6. Stworzyć komponent `<Flight />`, który będzie wyświetlał: godzinę odlotu, godzinę przylotu, cenę lotu, lotnisko startowe, lotnisko końcowe, ilość przesiadek

### 4. Stylowanie (JSS + Material-UI)
1. Dodajemy Material-UI – `npm install @material-ui/core @material-ui/icons --save`
2. W pliku `public/index.html` dodajemy `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">`,
3. Dodajemy `AppBar` oraz `Drawer` – https://material-ui-next.com/demos/drawers/#clipped-under-the-app-bar
4. Zamieniamy `inputy` na te z Material-UI – https://material-ui-next.com/demos/text-fields/
5. Zamieniamy `button` na ten z Material-UI – https://material-ui-next.com/demos/buttons/

### 5. Dodanie loadera – Higher-Order Components (HOC)
1. Tworzymy plik `withLoading.js`
2. Tworzymy funkcję `withLoading`, która wyświetla nam `LinearProgress` jeśli prop `isLoading === true`, w innym przypadku wyświetlamy `Component`

### 6. Dodanie filtrowania
1. Stworzyć komponent `<FlightsFilter />`
2. Dodać 2 `Input[type="number]` – jeden dla minimalnej ceny, drugi dla maksymalnej
3. Tworzymy metodę `updateStateField`, która będzie zmieniać nasz stan
4. Filtrowanie lotów – podanie jako prop metody `filterFlights` do `<FlightsFilter />`, która przy wykonaniu filtruje loty i przypisuje je do state'u `<FlightsView />`
5. Stworzyć filtrowanie po cenie
6. Dodać wywołanie tej metody na `onChange` inputa
7. Dodać `Switch`
8. Dodać filtrowanie tylko jeśli checkbox jest zaznaczony

## Dla chętnych
- [x] Pobieranie lotnisk z api
- [ ] Wyświetlanie linii lotniczych (pobranie ich z api)
- [ ] Filtrowanie po innych wartościach
- [x] Wyświetlanie (ilości) przesiadek
- [ ] Sortowanie (po cenie, długości podróży)
- [x] Ustawianie wartości pól w `<SeachView />` po powrocie do tego widoku
- [ ] Dodanie chowanego menu bocznego

## Źródła
- API: https://warsawjs-flights-api.herokuapp.com/
- Chowane menu boczne: https://codesandbox.io/s/947n8o192p
