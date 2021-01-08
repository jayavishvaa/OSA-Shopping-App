import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // const getLocation = async () => {
  //   try {
  //     const { granted } = await Location.requestPermissionsAsync();
  //     if (!granted) return;
  //     const {
  //       coords: { latitude, longitude },
  //     } = await Location.getLastKnownPositionAsync();
  //     setLocation({ latitude, longitude });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getLocation();
  // }, []);

  return location;
};
