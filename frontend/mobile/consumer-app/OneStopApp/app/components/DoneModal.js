import React from "react";
import {
  Modal,
  StyleSheet,
  View
} from "react-native";
// import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

const DoneModal = ({ onDone, progress = 0, modalVisible=false }) => {
  return (
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
            {/* {progress < 1 ? (
            <Progress.Bar
                color={colors.primary}
                progress={progress}
                width={200}
            />
            ) : ( */}
            <LottieView
                autoPlay
                loop={false}
                onAnimationFinish={onDone}
                source={require("../assets/animations/done2.json")}
                style={styles.animation}
            />
            {/* )} */}
            </View>
            </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: "70%",
        height: "50%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
});

export default DoneModal;