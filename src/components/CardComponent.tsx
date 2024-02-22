import React, { ReactNode } from 'react';
import { StyleProp, View, ViewProps } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewProps>;
}

const CardComponent = (props: Props) => {
  const { children, bgColor, styles } = props;
  return (
    <View style={[globalStyles.inputContainer, { padding: 12 }]}>
      {children}
    </View>
  );
};

export default CardComponent;
