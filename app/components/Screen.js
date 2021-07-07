import React from 'react';
import Constants from 'expo-constants';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors';


function Screen({children, style}) {
    return (
        <>
        <StatusBar style="light" backgroundColor={colors.primary} />
        <SafeAreaView style={styles.screen}>
            <View style={[styles.view, style]}>
                {children}
            </View>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
    },
    view: {
        flex: 1,
    }
})

export default Screen;