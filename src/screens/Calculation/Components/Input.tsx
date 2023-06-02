import colors from '$themes/colors';
import React from 'react';
import { Text, StyleSheet, TextInputProps, TextInput } from 'react-native';
import HorizontalView from '$components/HorizontalView';

const Input: React.FC<
  TextInputProps & {
    title: string;
  }
> = ({ title, style, ...props }) => {
  return (
    <HorizontalView>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={[styles.input, style]} {...props} />
    </HorizontalView>
  );
};

export default Input;

const styles = StyleSheet.create({
  dispValue: { fontSize: 16, color: colors.seconary },
  title: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  input: {
    height: 32,
    width: 151,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
