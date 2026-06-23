import { View, Text } from 'react-native'
import React from 'react'
import { useGroceryStore

 } from '../store/grocery-store'
const insights = () => {
  const {isLoading,items}=useGroceryStore()
  return (
    <View>
      <Text>insights</Text>
    </View>
  )
}

export default insights