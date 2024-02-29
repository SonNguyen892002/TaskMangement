import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import SectionComponent from '../../components/SectionComponent';
import TitleComponent from '../../components/TitleComponent';
import InputComponent from '../../components/InputComponent';
import { Lock, Sms } from 'iconsax-react-native';
import { colors } from '../../constants/colors';
import ButtonComponent from '../../components/ButtonComponent';
import SpaceComponent from '../../components/SpaceComponent';
import { globalStyles } from '../../styles/globalStyles';
import TextComponent from '../../components/TextComponent';
import auth from '@react-native-firebase/auth';
import { HandleUser } from '../../util/HandleUser';
import { fontFamilies } from '../../constants/fontFamilies';

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Get permission
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then((res) => console.log(res));
    }
  }, []);

  useEffect(() => {
    if (email) {
      setErrorText('');
    }
  }, [email]);

  const handleSignUpWithEmail = async () => {
    if (!email || !password) {
      setErrorText('Please enter your email and password!!!');
    } else {
      setErrorText('');
      setIsLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          HandleUser.SaveToDatabase(user);
          setIsLoading(false);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setErrorText(error.message);
        });
    }
  };

  return (
    <Container>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <TitleComponent
          text="Sign In"
          size={32}
          font={fontFamilies.bold}
          styles={{ textTransform: 'uppercase', flex: 0, textAlign: 'center' }}
        />
        <View style={{ marginVertical: 16 }}>
          <InputComponent
            value={email}
            onChange={(val) => setEmail(val)}
            prefix={<Sms size={24} color={colors.desc} />}
            title="Email"
            placeholder="Email"
            allowClear
          />
          <InputComponent
            value={password}
            onChange={(val) => setPassword(val)}
            prefix={<Lock size={24} color={colors.desc} />}
            title="Password"
            placeholder="Password"
            isPassword
          />
          {errorText && (
            <TextComponent text={errorText} color="coral" flex={0} />
          )}
        </View>

        <ButtonComponent
          isLoading={isLoading}
          text="Sign Up"
          onPress={handleSignUpWithEmail}
        />

        <SpaceComponent height={20} />

        <Text style={[globalStyles.text, { textAlign: 'center' }]}>
          You already have an account{' '}
          <Text
            style={{ color: 'coral' }}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            Log in
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};
export default SignUpScreen;
