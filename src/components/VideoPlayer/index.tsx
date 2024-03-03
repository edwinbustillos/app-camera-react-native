import React from 'react';
import { Button, SafeAreaView, TouchableOpacity, Text, View } from 'react-native';

import { VideoPlayerProps } from './props';
import { styles } from './styles';
import { Audio, Video } from 'expo-av';

const VideoPlayer = ({ video, onShare, onSave, onDiscard }:VideoPlayerProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <Video style={styles.video} source={{ uri: video.uri }} useNativeControls isLooping/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onShare}>
                    <Text style={styles.text}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onDiscard}>
                    <Text style={styles.text}>To Discard</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default VideoPlayer;
