import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type Props = {
  variant?: 'neutral' | 'positive' | 'negative';
  onPress: (e: GestureResponderEvent) => void;
  disable?: boolean;
  text: string;
  style?: View['props']['style'];
}

const COLOR = {
  neutral: '#3298dc',
  positive: '#48c774',
  negative: '#f14668'
}

export default function Button(props: Props) {
  const { style, variant = "neutral", onPress, disable, text } = props;
  const backgroundColor = disable ? '#9f9f9f' : COLOR[variant];

  function handleOnPress(e: any) {
    !disable && onPress(e);
  }

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={[style, styles.button, { backgroundColor }]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 50,
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
})


