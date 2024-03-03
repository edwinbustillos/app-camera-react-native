import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Camera, CameraRecordingOptions } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import CameraView from './src/components/CameraView';
import VideoPLayer from './src/components/VideoPlayer';

const App = () =>  {
  const cameraRef = useRef<any>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [video, setVideo] = useState<any>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const [hasMicrofonePermission, setHasMicrofonePermission] = useState<boolean>(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>(false);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microfonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMicrofonePermission(microfonePermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');

    })();
  }, []);

  if (hasCameraPermission == false || hasMicrofonePermission == false || hasMediaLibraryPermission == false) {
    return (
      <View>
        <Text>Permissão necessária para acessar a câmera e a galeria</Text>
        <TouchableOpacity onPress={() => requestPermission()}>
          <Text>Permitir Acesso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);

      // Salvar a foto na galeria
      const asset = await MediaLibrary.createAssetAsync(data.uri);
      await MediaLibrary.createAlbumAsync('Camera Expo', asset, false);
    }
  }


  const recordVideo = () => {
    setIsRecording(true);
    const options: CameraRecordingOptions = {
      maxDuration: 60,
      quality: "1080p",
      mute: false,
    };
    if (cameraRef && cameraRef.current) {
      cameraRef.current.recordAsync(options).then((videoPlay: any) => {
        setVideo(videoPlay);
        setIsRecording(false);
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (cameraRef && cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  if (video) {
    const shareVideo = async () => {
      if (video) {
        await shareAsync(video.uri).then(() => {
          setVideo(undefined);
        });
      }
    };

    const saveVideo = async () => {
      if (video) {
        await MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
          setVideo(undefined);
        });
      }
    };

    const discardVideo = () => {
      setVideo(undefined);
    }

    return (
      <VideoPLayer
        video={video}
        onShare={shareVideo}
        onSave={saveVideo}
        onDiscard={discardVideo}
      />
    );
  }

  return (
    <CameraView
      cameraRef={cameraRef}
      isRecording={isRecording}
      onRecord={recordVideo}
      onStopRecording={stopRecording}
      onTakePicture={takePicture}
      //requestPermission={requestPermission}
    />

    // <View style={styles.container}>
    //   <Camera ref={cameraRef} style={styles.camera} type={type} ratio="1:1">
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
    //         <Text style={styles.text}>Flip Camera</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.button} onPress={takePicture}>
    //         <Text style={styles.text}>Take Picture</Text>
    //       </TouchableOpacity>
    //     </View>

    //   </Camera>
    //   <StatusBar style="auto" />
    // </View>
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   camera: {
//     width: '100%',
//     height: '70%',
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//   },
//   button: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   text: {
//     color: 'black',
//     fontSize: 20,
//   },

// });
