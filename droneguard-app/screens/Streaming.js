import { useState } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';


const Streaming = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const getPressedPosition = (e) => {
        setX(e.clientX);
        setY(e.clientY);

        console.log(x, y);
        // console.log(e.clientX, e.clientY)
    };

    const imageUrl = 'https://www.israel21c.org/wp-content/uploads/2020/07/shutterstock_321673820-2.jpg'
    return (
        <TouchableWithoutFeedback onPress={getPressedPosition}>
            <Image
                resizeMode="center"
                source={{ uri: imageUrl }}
                style={{ flex: 1, width: 1000, marginVertical: 50 }}
            />
        </TouchableWithoutFeedback>

    )
};

export default Streaming;