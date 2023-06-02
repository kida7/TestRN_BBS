import Button from '$components/Button';
import Space from '$components/Space';
import colors from '$themes/colors';
import React, { useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Page from '$components/Page';
import { useDispatch } from 'react-redux';
import { HomeActions } from '$redux/HomeSlice';
import { useAppSelector } from '$redux';
import { WINDOW_WIDTH } from '$themes/constants';
import {} from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '$services/Types';
import LoadingView from '$components/LoadingView';

const AVATAR_WIDTH = (WINDOW_WIDTH - 16 * 3) / 2;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    dispatch(HomeActions.fetchData());
  }, [dispatch]);
  const users = useAppSelector(state => state.Home.users);
  useEffect(() => {
    if (!users.length) fetchData();
  }, [users, fetchData]);
  const navigation = useNavigation<NavigationProp<RootStackParam>>();

  return (
    <Page hideBackaButton>
      <View style={styles.header}>
        <Button
          title="Fetch Random"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={fetchData}
        />
      </View>
      <Space size={34} />
      <LoadingView errorKey="fetchData">
        <FlatList
          data={users}
          numColumns={2}
          keyExtractor={item => `${item.id}`}
          ListFooterComponent={<Space size={30} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => {
                navigation.navigate('DetailsScreen', { item });
              }}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.cardName}>
                {item.first_name} {item.last_name}
              </Text>
              <Text style={styles.cardDesc}>{item.employment.title}</Text>
            </TouchableOpacity>
          )}
        />
      </LoadingView>
    </Page>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardDesc: { color: '#aaa', marginTop: 8 },
  cardName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 12,
  },
  avatar: { width: AVATAR_WIDTH, height: 100 },
  cardContainer: {
    marginLeft: 16,
    marginTop: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 10,
    width: AVATAR_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  header: { alignSelf: 'center' },
  logoContainer: {
    paddingHorizontal: 26,
  },
  footer: { flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end' },
  empty: { width: 72, height: 72, backgroundColor: '#fff' },
  button: { height: 25, backgroundColor: '#f0003c' },
  settingContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  modal: { marginHorizontal: 12, marginVertical: 0 },
  settingSubContainer: { alignSelf: 'stretch' },
  settingTitle: { fontSize: 16, fontWeight: 'bold' },

  desc: { fontSize: 14, fontStyle: 'italic', color: '#fff' },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  setting: { alignSelf: 'flex-end' },
  container: { backgroundColor: colors.main, flex: 1, alignItems: 'center' },
});
