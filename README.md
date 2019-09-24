# bem-react-native

### Tiny helper for building styles with BEM methodology. 

##### inspired by className package
##### https://github.com/bem/bem-react/tree/master/packages/classname

### Install:

```yarn add bem-react-native``` or ```npm i bem-react-native```

### Usage:
 
```
import { s } from 'bem-react-native';
import style from 'path/to/style'

const sCat = s('Cat')(style);
 
sCat(); 
// style['Cat']

sCat({ size: 'm' }); 
// [style['Cat'], style['Cat_size_m']]

sCat('Tail'); 
// style['Cat-Tail']

sCat('Tail', { length: 'small' }); 
// [style['Cat-Tail'], style['Cat-Tail_length_small']]
 
const sDogPaw = s('Dog', 'Paw')(style);
 
sDogPaw(); 
// style['Dog-Paw']

sDogPaw({ color: 'black', exists: true }); 
// [style['Dog-Paw'], style['Dog-Paw_color_black'], style['Dog-Paw_exists]]

const sBlockElement = s('Block','Element')(style);
const sMix = s('Mix')(style);

sBlockElement({mod: 'value'}, sMix({mod: 'value'})); 
// [style['Block-Element'], style['Block-Element_mod_value'], style['Mix'], style['Mix_mod_value']]

sBlockElement({mod: 'value'}, [sMix({mod: 'value'}), {color: '#fff'}]); 
// [style['Block-Element'], style['Block-Element_mod_value'], style['Mix'], style['Mix_mod_value'], {color: '#fff'}]

sBlockElement({mod: 'value'}, [{color: '#fff'}]); 
// [style['Block-Element'], style['Block-Element_mod_value'], {color: '#fff'}]

```

#### see https://en.bem.info/methodology/naming-convention/#react-style

### Example:

```
import React from 'react';
import { StyleSheet, Text as RnText, View } from 'react-native';
import { s } from 'bem-react-native';

const textStyle = StyleSheet.create({
    Text: {
        textTransform: 'none',
    },
    Text_size_s: {
        fontSize: 13,
    },
    Text_size_m: {
        fontSize: 15,
    },
    Text_size_l: {
        fontSize: 18,
    },
    Text_weight_regular: {
        fontWeight: '400',
    },
    Text_weight_medium: {
        fontWeight: '500',
    },
    Text_weight_bold: {
        fontWeight: '600',
    },
    Text_uppercase: {
        textTransform: 'uppercase',
    },
    Text_lowercase: {
        textTransform: 'lowercase',
    },
});

const exampleStyle = StyleSheet.create({
    Example: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    'Example-Text': {
        textAlign: 'center',
        marginBottom: 20,
        color: '#cb0606',
    },
});

const sText = s('Text')(textStyle);

const Text = ({ children, style, size, weight, uppercase, lowercase, ...props }) => {
    return (
        <RnText style={sText({ size, weight, uppercase, lowercase }, style)} {...props}>
            {children}
        </RnText>
    );
};

const sExample = s('Example')(exampleStyle);

export const Example = ({ style }) => {
    return (
        <View style={sExample(null, style)}>
            <Text style={sExample('Text')} size="l" weight="medium" uppercase>
                I love bem!
            </Text>
            {
                // finalStyle = [
                //     textStyle['Text'],
                //     textStyle['Text_size_l'],
                //     textStyle['Text_weight_medium'],
                //     textStyle['Text_uppercase'],
                //     textStyle['Example-Text'],
                // ];
            }
        </View>
    );
};
```
