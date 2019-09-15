import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import logo from "./logo.svg";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyCt4w4Bn8k6W6csQ6dl6yUIvmCv7Fd-YdQ",
  authDomain: "roomme-f01bf.firebaseapp.com",
  databaseURL: "https://roomme-f01bf.firebaseio.com",
  projectId: "roomme-f01bf",
  storageBucket: "roomme-f01bf.appspot.com",
  messagingSenderId: "1081713952055",
  appId: "1:1081713952055:web:07fe7a311052f0918dc6b2"
};

firebase.initializeApp(firebaseConfig);

interface Question {
  Choices: string[]; // initializes the array of strings in Question on the interface
  Question: string; //initializes the type of Question on the interface
}

class App extends Component {
  state: {
    questions: Question[];
  } = {
    questions: []
  };

  async componentDidMount() {
    const questions = await firebase
      .firestore()
      .collection("Questions")
      .get();

    this.setState({
      questions: questions.docs.map(question => question.data())
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {this.state.questions.map((question, i) => (
            <div key={`question${i}`}>
              <h2>{question.Question}</h2>
              {question.Choices.map((choice, j) => (
                <h5 key={`choice${j}`}>{choice}</h5>
              ))}
            </div>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
