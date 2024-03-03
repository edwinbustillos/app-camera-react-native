import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    button: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 10,
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
});