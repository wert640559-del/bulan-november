import React, { useState } from 'react';
import { Text } from 'react-native';
import SimpleList from './src/components/SimpleLlist';
import FlatListExample from './src/components/FlatListExample';
import MySectionList from './src/components/SectionList';

const App = () => {
  return (
    <>
      {/* <SimpleList/> */}
      {/* <FlatListExample/> */}
      <MySectionList/>
    </>
  );
};

export default App;