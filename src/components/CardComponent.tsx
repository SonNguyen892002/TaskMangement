import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

const CardComponent = (props: Props) => {
  const { children, bgColor, styles } = props;
  return (
    <View
      style={[
        globalStyles.inputContainer,
        { padding: 12, backgroundColor: bgColor ?? colors.gray },
        styles,
      ]}
    >
      {children}
    </View>
  );
};

export default CardComponent;
