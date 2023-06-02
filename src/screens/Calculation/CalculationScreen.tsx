import Button from '$components/Button';
import Icon from '$components/Icon';
import Input from '$screens/Calculation/Components/Input';
import Page from '$components/Page';
import Selection from './Components/Selection';
import Space from '$components/Space';
import { RootStackParam } from '$services/Types';
import colors from '$themes/colors';
import { RouteProp } from '@react-navigation/core';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { CalculationActions } from './CalculationSlice';
import { useAppSelector } from '$redux';
import Logics from '$Logics';
const CalculationScreen = ({
  route,
}: {
  route: RouteProp<RootStackParam, 'CaculationScreen'>;
}) => {
  const data = route.params.menuItem;
  const dispatch = useDispatch();
  const _form = useAppSelector(
    state => state.Calculation[data.problem?.name || ''],
  );
  const form = useMemo(() => _form || {}, [_form]);
  console.log('form', form);
  const Fields = useMemo(() => {
    return (
      <View>
        {data.problem?.fields.map(field => {
          return (
            <View key={field.key}>
              <Space size={21} />
              {field.type === 'select' && (
                <Selection
                  options={field.options || []}
                  title={field.title}
                  value={form[field.key] || field.defaultValue}
                  onChangeSelected={option => {
                    dispatch(
                      CalculationActions.saveFormValue({
                        name: data.problem?.name || '',
                        key: field.key,
                        value: option?.value,
                      }),
                    );
                  }}
                />
              )}
              {field.type === 'number' && (
                <Input
                  title={field.title}
                  keyboardType="numeric"
                  value={
                    form[field.key] ||
                    (field.defaultValue && String(field.defaultValue)) ||
                    ''
                  }
                  onChangeText={text => {
                    dispatch(
                      CalculationActions.saveFormValue({
                        name: data.problem?.name || '',
                        key: field.key,
                        value: text,
                      }),
                    );
                    1;
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }, [data.problem?.fields, data.problem?.name, dispatch, form]);

  const showValue = () => {
    if (data.problem?.name) {
      let params: any = {};
      data.problem?.fields.forEach(t => {
        if (t.type === 'number') params[t.key] = Number(form[t.key]);
        else params[t.key] = form[t.key];
      });
      //@ts-ignore
      console.log(form, params, Logics[data.problem.name](params));
    }
  };
  return (
    <Page title={data.title} theme="light">
      <ScrollView style={styles.scrollview}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              dispatch(CalculationActions.resetForm(data.problem?.name || ''));
            }}>
            <Icon name="trash-outline" iconFont="Ionicons" color="#fff" />
            <Text style={styles.clear}>Clear values</Text>
          </TouchableOpacity>
          {Fields}
          <Space size={26} />
          <Button title="Show results" onPress={showValue} />
          <Space size={4} />
        </View>
      </ScrollView>
    </Page>
  );
};

export default CalculationScreen;

const styles = StyleSheet.create({
  content: { backgroundColor: colors.main, padding: 8 },
  scrollview: {
    // padding: 8
  },
  clearButton: { flexDirection: 'row', alignItems: 'flex-end' },
  clear: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
