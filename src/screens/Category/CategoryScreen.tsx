import MenuList from '$components/MenuList';
import Page from '$components/Page';
import Space from '$components/Space';
import { RootStackParam } from '$services/Types';
import { RouteProp } from '@react-navigation/core';
import React from 'react';
import { StyleSheet } from 'react-native';

const CategoryScreen = ({
  route,
}: {
  route: RouteProp<RootStackParam, 'CategoryScreen'>;
}) => {
  const data = route.params.menuItem;
  return (
    <Page title={data.title}>
      <Space size={22} />
      {data.menuItems && <MenuList items={data.menuItems} />}
    </Page>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
