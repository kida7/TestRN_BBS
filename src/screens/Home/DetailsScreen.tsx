import colors from '$themes/colors';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Page from '$components/Page';
import { WINDOW_WIDTH } from '$themes/constants';
import {} from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { RootStackParam } from '$services/Types';

const AVATAR_WIDTH = WINDOW_WIDTH - 16 * 2;

const Field = ({ title, content }: { title: string; content: string }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <Text style={styles.fieldContent}>{content}</Text>
    </View>
  );
};

const DetailsScreen = ({
  route,
}: {
  route: RouteProp<RootStackParam, 'DetailsScreen'>;
}) => {
  const user = route.params.item;
  return (
    <Page>
      <View style={styles.container}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Field title="Name" content={`${user.first_name} ${user.last_name}`} />
        <Field title="Email" content={user.email} />
        <Field title="Gender" content={user.gender} />
        <Field title="Phone number" content={user.phone_number} />
        <Field title="Date of birth" content={user.date_of_birth} />
        <Field title="Employment Title" content={user.employment.title} />
        <Field title="Employment Skill" content={user.employment.key_skill} />
        <Field title="Social number" content={user.social_insurance_number} />
      </View>
    </Page>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  avatar: { width: AVATAR_WIDTH, height: 200, alignSelf: 'center' },
  fieldContent: {
    flex: 2,
    textAlign: 'right',
  },
  fieldTitle: { flex: 1, fontSize: 14, fontWeight: '600' },
  fieldContainer: { flexDirection: 'row', paddingVertical: 12 },
  cardDesc: { color: '#aaa', marginTop: 8 },
  cardName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 12,
  },
  cardContainer: {
    marginLeft: 16,
    marginTop: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 5,
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
  about: { height: 25, backgroundColor: '#f0003c' },
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
  container: {
    backgroundColor: colors.main,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
