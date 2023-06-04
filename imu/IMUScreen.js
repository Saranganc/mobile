import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { accelerometer, gyroscope } from 'react-native-sensors';
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
setUpdateIntervalForType(SensorTypes.gyroscope, 1000);

export default function DataCollectionScreen({ route, navigation }) {
  const [accelerometerData, setAccelerometerData] = React.useState({});
  const [gyroscopeData, setGyroscopeData] = React.useState({});
  const [isStarted, setIsStarted] = React.useState(true);

  useEffect(() => {
    let accelerometerSubscription;
    let gyroscopeSubscription;

    if (isStarted) {
      accelerometerSubscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
        setAccelerometerData({ x, y, z, timestamp });
      });

      gyroscopeSubscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
        setGyroscopeData({ x, y, z, timestamp });
      });
    }

    return () => {
      if (accelerometerSubscription) accelerometerSubscription.unsubscribe();
      if (gyroscopeSubscription) gyroscopeSubscription.unsubscribe();
    };
  }, [isStarted]);

  const startRecordings = () => {
    setIsStarted(true);
  };

  const stopRecording = () => {
    console.log('Stopping recording');
    setIsStarted(false);
  };

  return (
    <View>
      {/* ...your other UI elements... */}

      {isStarted ? (
        <Text style={{ color: 'white' }}>Recording...</Text>
      ) : (
        <Text style={{ color: 'white' }}>Waiting to start...</Text>
      )}

      {/* Display collected data */}
      <ScrollView>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ color: 'white' }}>Accelerometer</Text>
          <Text style={{ color: 'white' }}>X: {accelerometerData.x}</Text>
          <Text style={{ color: 'white' }}>Y: {accelerometerData.y}</Text>
          <Text style={{ color: 'white' }}>Z: {accelerometerData.z}</Text>
          <Text style={{ color: 'white' }}>Timestamp: {accelerometerData.timestamp}</Text>
        </View>

        <View style={{ marginVertical: 5 }}>
          <Text style={{ color: 'white' }}>Gyroscope</Text>
          <Text style={{ color: 'white' }}>X: {gyroscopeData.x}</Text>
          <Text style={{ color: 'white' }}>Y: {gyroscopeData.y}</Text>
          <Text style={{ color: 'white' }}>Z: {gyroscopeData.z}</Text>
        </View>
      </ScrollView>

      {/* ...your other UI elements... */}
    </View>
  );
}
