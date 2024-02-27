import { ReactNode, useState } from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TitleComponent from './TitleComponent';
import { Eye, EyeSlash } from 'iconsax-react-native';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multiple?: boolean;
  numberOfLine?: number;
  type?: KeyboardTypeOptions;
  isPassword?: boolean;
  color?: string;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    placeholder,
    title,
    prefix,
    affix,
    allowClear,
    multiple,
    numberOfLine,
    type,
    isPassword,
    color,
  } = props;

  const [showPass, setShowPass] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      {title && <TitleComponent text={title} />}
      <RowComponent
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            minHeight: multiple && numberOfLine ? 32 * numberOfLine : 32,
            paddingVertical: Platform.OS === 'ios' ? 16 : 12,
            paddingHorizontal: 10,
            alignItems: multiple ? 'flex-start' : 'center',
            backgroundColor: color ?? colors.gray,
          },
        ]}
      >
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
          }}
        >
          <TextInput
            style={[
              globalStyles.text,
              {
                margin: 0,
                padding: 0,
                top: 2,
                textAlignVertical: multiple ? 'top' : 'center',
              },
            ]}
            placeholder={placeholder ?? title ?? ''}
            placeholderTextColor={'#676767'}
            value={value}
            onChangeText={(val) => onChange(val)}
            multiline={multiple}
            numberOfLines={numberOfLine}
            keyboardType={type}
            secureTextEntry={isPassword ? !showPass : false}
            autoCapitalize="none"
          />
        </View>
        {affix && affix}

        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            {showPass ? (
              <Eye size={20} color={colors.desc} />
            ) : (
              <EyeSlash size={20} color={colors.desc} />
            )}
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
};

export default InputComponent;
