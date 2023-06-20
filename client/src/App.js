import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
// import RecordingPage from './components/Record/Record';
import EditProfile from './components/HomePage/pages/EditProfile/EditProfile';
import Profile from './components/HomePage/pages/Profile/Profile';

const httpLink = createHttpLink({
  uri: 'https://beat-blend-8886e9ea479f.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };

});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
