import { Lock, Sms } from 'iconsax-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import Container from '../../components/Container';
import InputComponent from '../../components/InputComponent';
import SectionComponent from '../../components/SectionComponent';
import TitleComponent from '../../components/TitleComponent';
import { colors } from '../../constants/colors';
import SpaceComponent from '../../components/SpaceComponent';
import { globalStyles } from '../../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import TextComponent from '../../components/TextComponent';
import { fontFamilies } from '../../constants/fontFamilies';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorText('please enter your email and password');
    } else {
      setErrorText('');
      setIsLoading(true);

      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
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
          text="Login"
          size={32}
          font={fontFamilies.bold}
          styles={{ textTransform: 'uppercase', flex: 0, textAlign: 'center' }}
        />
        <View style={{ marginVertical: 16 }}>
          <InputComponent
            title="Email"
            value={email}
            onChange={(val) => setEmail(val)}
            placeholder="Email"
            prefix={<Sms size={22} color={colors.gray2} />}
            allowClear
            type="email-address"
          />
          <InputComponent
            title="Password"
            isPassword
            value={password}
            onChange={(val) => setPassword(val)}
            placeholder="Password"
            prefix={<Lock size={22} color={colors.gray2} />}
          />
          {errorText && <TextComponent text={errorText} color="coral" />}
        </View>
        <ButtonComponent
          isLoading={isLoading}
          text="Login"
          onPress={handleLogin}
        />

        <SpaceComponent height={20} />

        <Text style={[globalStyles.text, { textAlign: 'center' }]}>
          You don't have an account{' '}
          <Text
            style={{ color: 'coral' }}
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            Create an account
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;
