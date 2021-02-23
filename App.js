import * as React from 'react';
import { TextComponent,TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { Text, View, StyleSheet,TextInput,Image } from 'react-native';
import {Header} from 'react-native-elements'
import db from './localDb';
import PhonicSoundButton from './phonicSoundButton';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      text:'',
     chunks:[],
     phonicSounds:[]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
        backgroundColor={'#9c8218'}
        centerComponent={{text:'Monkey Chunky',style:{color:'#fff',fontSize:20}}}/>
        <Image
        style={styles.imageIcon}
        source={{uri:'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png'}}/>
        <TextInput
        style={styles.inputbox}
        onChangeText={(text)=>{
          this.setState({text:text})
        }}
        value={this.state.text}/>
      <TouchableOpacity
      style={styles.goButton}
      onPress={()=>{
        var word=this.state.text.toLowerCase().trim();
        db[word]?(
          this.setState({chunks:db[word].chunks}),
          this.setState({phonicSounds:db[word].phones})
        ):
        Alert.alert("The word does not exist in our Database")
        
      }}>
        <Text style={styles.buttonText}>GO</Text>
      </TouchableOpacity>
      <View>
        {this.state.chunks.map((item,index)=>{
          return(
            <PhonicSoundButton
            wordChunk={this.state.chunks[index]}
            soundChunk={this.state.phonicSounds[index]}
            buttonIndex={index}/>
           
          )
          
        })}
       
      </View>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputbox:{
    marginTop:80,
    width:'80%',
    alignSelf:'center',
    height:40,
    textAlign:'center',
    borderWidth:4
  },
  buttonText:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold'
  },
  goButton:{
    width:'50%',
    height:55,
    alignSelf:'center',
    padding:10,
    margin:10
  },
  
  imageIcon:{
    width:150,
    height:150,
    marginLeft:130,
    marginTop:80
  },
  
});
