import {StyleSheet} from 'react-native' //this is how stylesheet is defined
const viewPadding = 10;

//This styles are create externally in sepearate file.
export default  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
      padding: viewPadding,
      paddingTop: 20
    },
    list: {
      width: "100%"
    },
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 18,
      flex:1,
      flexWrap:'wrap'
    },
    listItemCont: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:'space-between',
      marginHorizontal:10,
      marginVertical:5
    },
    textInput: {
      height: 40,
      paddingRight: 10,
      paddingLeft: 10,
      borderColor: "gray",  
      width: "65%",
      borderWidth: 1
    },
    button: {
      backgroundColor: 'lightgrey',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: '30%'
    },
    headerText: {
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    },
    headerStyle: {
      height: 50,
      marginVertical: 10,
      backgroundColor: '#ffc305',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  
  });