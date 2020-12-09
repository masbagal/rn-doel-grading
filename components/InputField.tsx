import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

type Props = {
  label: string;
  containerStyle?: View['props']['style'];
} & TextInput['props']


export default function InputField(props: Props) {
  const { containerStyle, label, style, ...rest } = props;
  const [isFocused, toggleFocused] = React.useState(false);

  function handleFocus() {
    toggleFocused(true);
  }

  function handleBlur() {
    toggleFocused(false)
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[style, styles.input, isFocused && styles.active]} {...rest} onFocus={handleFocus} onBlur={handleBlur} />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  input: {
    borderBottomColor: '#a4a4a4',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  active: {
    borderBottomColor: '#3298dc',
    borderBottomWidth: 4,
  }
})


