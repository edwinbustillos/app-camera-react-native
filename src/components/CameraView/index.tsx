import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CameraViewProps } from './props';
import { styles } from './styles';
import { Camera, CameraType } from 'expo-camera';

const CameraView: React.FC<CameraViewProps> = ({ cameraRef, isRecording, onRecord, onStopRecording, onTakePicture }) => {
    const [type, setType] = useState<CameraType>(CameraType.back);
    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <Camera style={styles.container} ref={cameraRef} type={type}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={isRecording ? onStopRecording : onRecord}>
                    <Text style={styles.text}>{isRecording ? "Stop Recording" : "Start Record"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onTakePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
            </View>
        </Camera >
    );

}

export default CameraView;
