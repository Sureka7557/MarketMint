import { View, Text, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import BackgroundDecor from '@/components/BackgroundDecor'
import { COLORS } from '@/constants/COLORS'
import { FONTS } from '@/constants/FONTS'
const planner = () => {
  return (
       <LinearGradient
              colors={COLORS.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.safeArea}
            >
              <BackgroundDecor />
              
            </LinearGradient>
  )
}

export default planner

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

});