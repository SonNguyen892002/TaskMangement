import { ReactNode } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  icon?: ReactNode;
  onPress: () => void;
  color?: string;
  isLoading?: boolean;
}

const ButtonComponent = (props: Props) => {
  const { text, icon, onPress, color, isLoading } = props;

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: color ? color : isLoading ? colors.gray : colors.blue,
        padding: 14,
        borderRadius: 14,
      }}
    >
      {isLoading ? (
        <ActivityIndicator style={{ paddingVertical: 3 }} />
      ) : (
        <TextComponent
          text={text}
          flex={0}
          styles={{ textTransform: 'uppercase' }}
          size={16}
          font={fontFamilies.semiBold}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
