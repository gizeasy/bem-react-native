# react-native-bem

### Tiny helper for building styles with BEM methodology. 

##### inspired by className package
##### https://github.com/bem/bem-react/tree/master/packages/classname

### Usage:
 
 ```import { s } from '@bem-react/classname';
 import style from 'path/to/style'
 const sCat = s('Cat')(style);
 
 sCat(); // Cat
 <View style={sCat()}>
 eq: <View style={style['Cat']}/>
 
 sCat({ size: 'm' }); // Cat Cat_size_m
 <View style={sCat({ size: 'm' })}/> // 
 eq: <View style={[style['Cat'], style['Cat_size_m']]}/>
 
 sCat('Tail'); // Cat-Tail
 <View style={sCat()}/> // 
 eq: <View style={style['Cat']}/>
 
 sCat('Tail', { length: 'small' }); // Cat-Tail Cat-Tail_length_small
 <View style={sCat('Tail', { length: 'small' })}/> // 
 eq:<View style={[style['Cat-Tail'], style['Cat-Tail_length_small']]}/>
 
 const sDogPaw = s('Dog', 'Paw')(style);
 
 sDogPaw(); // Dog-Paw
 <View style={sDogPaw()}/> // 
 eq: <View style={style['Dog-Paw']}/>
 
 sDogPaw({ color: 'black', exists: true }); // Dog-Paw Dog-Paw_color_black Dog-Paw_exists
 <View style={sDogPaw({ color: 'black', exists: true })}/> // eq:
 <View style={[style['Dog-Paw'], style['Dog-Paw_color_black'], style['Dog-Paw_exists]]}/>
 ```

 #####see https://en.bem.info/methodology/naming-convention/#react-style
