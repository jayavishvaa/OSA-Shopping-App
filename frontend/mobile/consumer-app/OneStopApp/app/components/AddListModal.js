import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';

import useAuth from '../auth/useAuth';
import userApi from '../api/users';
import DoneModal from './DoneModal';

const AddListModal = ({
    modalVisible, onHideModal,
    itemName, description, mrp,
    price, quantity, perQty,
    shopId
}) => {
    const auth = useAuth();
    const [pressAddNew, setPressAddNew] = useState(false);
    const [value, onChangeText] = useState();
    const [done, setDone] = useState(false);
    const [creating, setCreating] = useState(false);
    const [listValidation, setListValidation] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(false);
    const [getting, setGetting] = useState(false);
    const [lists, setLists] = useState();
    const [listError, setListError] = useState(false);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const getLists = async () => {
        setGetting(true);
        const result = await userApi.getLists({ userId: auth.user._id });
        if (!result) {
            setGetting(false);
            setListError(true);
            return;
        }
        setListError(false);
        setGetting(false);
        setLists(result.data);
    };

    useEffect(() => {
        getLists();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        getLists();
        setRefreshing(false);
    }

    const handlePressAddNew = () => {
        setPressAddNew(true);
    }
    const handleSaveNewList = async () => {
        if (!value || value === '') return setListValidation(false);
        setListValidation(true);
        setCreating(true);
        const result = await userApi.createNewList({ userId: auth.user._id, listName: value });
        if (!result.ok) {
            setCreating(false);
            setPressAddNew(false);
            setError(true);
            return;
        }
        setCreating(false);
        setPressAddNew(false);
        setDone(true);
        setTimeout(() => {
            setDone(false)
            onChangeText('');
        }, 2000);
    }
    const handleAddToCart = async () => {
        setAdding(true);
        const result = await userApi.addItemToCart({
            userId: auth.user._id,
            name: itemName,
            description,
            mrp,
            price,
            quantity,
            perQty,
            shopId
        });
        if (!result.ok) return setAdding(false);
        setAdding(false);
        console.log(result.data);
        setAdded(true);
        setTimeout(() => {
            setAdded(false)
            onHideModal();
        }, 500);
    }

    const handleAddToSavedList = async listName => {
        setAdding(true);
        const result = await userApi.addItemToSavedList({
            userId: auth.user._id,
            listName,
            name: itemName,
            description,
            mrp,
            price,
            quantity,
            perQty,
            shopId
        });
        if (!result.ok) return setAdding(false);
        setAdding(false);
        setAdded(true);
        setTimeout(() => {
            setAdded(false)
            onHideModal();
        }, 500);
    }
  return (
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
            {error && <Text style={styles.errorText}>Something went wrong</Text>}
            {creating && <Text style={{
                color: "darkgreen",
                fontSize: 17,
                textAlign: "center"
            }}>Creating new list...</Text>}
            {adding && <Text style={{
                color: "darkgreen",
                fontSize: 17,
                textAlign: "center"
            }}>Adding...</Text>}
            {done && <Text style={{
                color: "darkgreen",
                fontSize: 17,
                textAlign: "center"
            }}>{`List ${value} added successfully...`}</Text>}
            {added && <Text style={{
                color: "darkgreen",
                fontSize: 17,
                textAlign: "center"
            }}>Added successfully</Text>}
                <Text style={{
                    fontSize: 19,
                    color: 'gray',
                    marginTop: 15,
                    width: "90%",
                    textAlign: "center"
                }}>{`Add  ${quantity} ${perQty} ${itemName}  to: `}</Text>
    
                <TouchableOpacity
                    style={[styles.button, {
                        backgroundColor: "rgba(50,0,150,1)",
                        marginTop: 20
                    }]}
                    onPress={handleAddToCart}
                >
                <Entypo
                    name="shopping-cart"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                />
                <Text style={styles.textStyle}>My Cart</Text>
                </TouchableOpacity>
                <Text style={{
                    margin: 5,
                    color: "gray",
                    fontSize: 17
                }}>or</Text>
                <FlatList
                    data={lists}
                    keyExtractor={(item) => item._id}
                    style={{ width: "100%" }}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleAddToSavedList(item.name)}
                            style={[styles.button, {
                                backgroundColor: "gray",
                                marginBottom: 5
                        }]}>
                            <Text style={[styles.textStyle, { width: "100%" }]}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ListFooterComponent={<>
                        {pressAddNew && <><View
                            style={[styles.button, { backgroundColor: "gray", marginBottom: 7 }]}
                        >
                        <View style={{
                            width: "100%",
                            backgroundColor: "white",
                            borderRadius: 5,
                            paddingHorizontal: 8,
                            flexDirection: "row"
                        }}>
                            <TextInput
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                placeholder="List Name"
                                placeholderTextColor="rgba(0,0,0,0.3)"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 17,
                                    color: "gray",
                                    width: "90%"
                                }}
                            />
                            <AntDesign
                                name="arrowright"
                                size={24}
                                color="darkgreen"
                                onPress={handleSaveNewList}
                            />
                        </View>
                        </View>
                        {!listValidation && <Text style={[styles.errorText, { marginBottom: 7, marginTop: -7 }]}>
                            Please enter a valid text
                        </Text>}
                        </>}
                        {!pressAddNew && <TouchableOpacity
                            style={[styles.button, { backgroundColor: "rgba(50,150,50,1)", marginBottom: 25 }]}
                            onPress={handlePressAddNew}
                        >
                        <Entypo
                            name="circle-with-plus"
                            size={26}
                            color="white"
                            style={{ marginRight: 5 }}
                        />
                        <Text style={[styles.textStyle, { width: "85%"}]}>Add New List</Text>
                        </TouchableOpacity>}
                        </>
                    }
                />
                <TouchableOpacity onPress={onHideModal} style={{
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                    backgroundColor: "white",
                    alignItems: "center",
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: "gray"
                    }}>Cancel</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        width: "90%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center"
    },
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
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 3
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default AddListModal;