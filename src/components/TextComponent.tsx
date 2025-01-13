import { Platform, StyleProp, Text, TextStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    text: string;
    color?: string;
    size?: number;
    flex?: number;
    font?: string;
    styles?: StyleProp<TextStyle>;
    title?: boolean;
    numberOfLines?: number;
}

const TextComponent = (props: Props) => {
    const { text, size, flex, font, color, styles, title, numberOfLines } = props;
    const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;

    return (
        <Text
            numberOfLines={numberOfLines}
            style={[
                globalStyles.text,
                {
                    color: color ?? appColors.text,
                    flex: flex ?? 0,
                    fontSize: size ? size : title ? 24 : fontSizeDefault,
                    fontFamily: font
                        ? font
                        : title
                            ? fontFamilies.medium
                            : fontFamilies.regular,
                },
                styles,
            ]}
        >
            {text}
        </Text>
    );
};

export default TextComponent;