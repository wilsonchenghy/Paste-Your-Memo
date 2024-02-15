import MainPage from './MainPage'
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

/////////// Rmb to run the server first ///////////

Amplify.configure(awsExports);

function App() {
  
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <MainPage/>
          <button onClick={signOut} className='signOutButton'>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
