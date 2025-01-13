import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Button, Text, View } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>LoginScreen</Text>
      <Button
        title="Login"
        onPress={async () => {
          await AsyncStorage.setItem('assetToken', 'trung');
        }}
      />
    </View>
  );
};

export default LoginScreen;