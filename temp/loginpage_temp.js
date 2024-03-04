import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import config from '../components/auth0-configuration';

const Home = () => {
  const { authorize, clearSession, user, getCredentials, error, isLoading } = useAuth0();

  const onLogin = async () => {
    console.log('Attempting to log in...');

    await authorize({}, {});
    
    console.log('Logged in successfully!');
    const credentials = await getCredentials();
    console.log('AccessToken:', credentials?.accessToken);
    Alert.alert('AccessToken: ' + credentials?.accessToken);
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    console.log('Logging out...');
    await clearSession({}, {});
    console.log('Logged out successfully!');
  };

  if (isLoading) {
    return <View style={styles.container}><Text>Loading</Text></View>;
  }

  if (loggedIn) {
    console.log('User Information:', user);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>

      {user && <Text>You are logged in as {user.name}</Text>}
      {!user && <Text>You are not logged in</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />

      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};


const Login = () => {
  console.log('Rendering Login component...');

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C'
  }
});

// Export the Login component
export default Login;
