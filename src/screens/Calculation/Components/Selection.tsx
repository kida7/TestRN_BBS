import { Option } from '$services/Types';
import colors from '$themes/colors';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import HorizontalView from '$components/HorizontalView';
import Icon from '$components/Icon';
import Modal from 'react-native-modal';
import Line from '$components/Line';
import Space from '$components/Space';

const Selection: React.FC<{
  title: string;
  options?: Option[];
  value?: Option;
  placeholder?: string;
  onChangeSelected?: (value?: Option) => void;
}> = ({ title, options, value, placeholder, onChangeSelected }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const onItemPress = useCallback(
    item => {
      onChangeSelected && onChangeSelected(item);
      setPopupVisible(false);
    },
    [onChangeSelected],
  );

  const selectedOption = useMemo(() => {
    return options?.find(t => t.value === value);
  }, [options, value]);
  useEffect(() => {
    onChangeSelected && onChangeSelected(selectedOption);
  }, [onChangeSelected, selectedOption]);
  return (
    <HorizontalView>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={setPopupVisible.bind(null, true)}>
        <Text style={styles.dispValue}>
          {selectedOption?.text || selectedOption?.value || placeholder}
        </Text>
        <Icon name="caretdown" iconFont="AntDesign" size={10} />
      </TouchableOpacity>
      <Modal
        isVisible={isPopupVisible}
        onBackdropPress={setPopupVisible.bind(null, false)}
        onBackButtonPress={setPopupVisible.bind(null, false)}>
        <View style={styles.popupContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Space size={20} />
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            renderItem={({ item, index }) => (
              <>
                {index === 0 && <Line />}
                <TouchableOpacity onPress={onItemPress.bind(null, item)}>
                  <Text style={styles.itemOption}>
                    {item.text || item.value}
                  </Text>
                </TouchableOpacity>
                <Line />
              </>
            )}
          />
        </View>
      </Modal>
    </HorizontalView>
  );
};

export default Selection;

const styles = StyleSheet.create({
  popupContainer: { backgroundColor: '#fff', padding: 14, height: 338 },
  modalTitle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.seconary,
  },
  itemOption: {
    fontSize: 20,
    color: colors.seconary,
    marginVertical: 20,
  },
  dispValue: { fontSize: 16, color: colors.seconary },
  title: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  button: {
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
