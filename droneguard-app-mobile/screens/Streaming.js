import { useState, useRef } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, Button, PermissionsAndroid } from 'react-native';
// import { NodeCameraView } from 'react-native-nodemediaclient';


const Streaming = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const video = useRef(null);

    const getPressedPosition = (e) => {
        setX(e.clientX);
        setY(e.clientY);

        console.log(x, y);
    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
                {
                    title: "Cool Photo App Camera And Microphone Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const imageUrl = 'https://www.israel21c.org/wp-content/uploads/2020/07/shutterstock_321673820-2.jpg'
    const videoUrl = 'https://www.youtube.com/watch?v=PtW5VSE0PGI'
    return (
        <TouchableWithoutFeedback onPress={getPressedPosition}>
            {/* <NodeCameraView
                style={{ height: 400 }}
                ref={(vb) => { this.vb = vb }}
                outputUrl={"rtmp://192.168.0.10/live/stream"}
                camera={{ cameraId: 1, cameraFrontMirror: true }}
                audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
                autopreview={true}
            /> */}
            <Button title="request permissions" onPress={requestCameraPermission} />
        </TouchableWithoutFeedback>

    )
};

export default Streaming;
