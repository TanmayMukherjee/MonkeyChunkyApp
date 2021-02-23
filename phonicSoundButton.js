import * as React from 'react';
import { TextComponent,TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet,TextInput,Image } from 'react-native';
import {Header} from 'react-native-elements'
import db from './localDb';
import {Audio} from 'expo-av'

export default class PhonicSoundButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pressedButtonIndex:'',
        }
    }
    playSound=async soundChunk=>{
        var soundLink='https://whitehatjrcontent.s3.ap-south-1.amazonaws.com/phones/' + soundChunk + '.mp3';
        await Audio.Sound.createAsync(
            {uri:soundLink},
            {shouldPlay:true}
        )
    }
    render(){
        return(
            <TouchableOpacity 
            style={this.props.buttonIndex==this.state.pressedButtonIndex
            ?[styles.chunkButton,{backgroundColor:"white"}]
            :[styles.chunkButton,{backgroundColor:"red"}]}

            onPress={()=>{
                this.setState({pressedButtonIndex:this.props.buttonIndex})
                this.playSound(this.props.soundChunk);
            }}>
            <Text 
            style={this.props.buttonIndex==this.state.pressedButtonIndex
            ?[styles.displayText,{color:"red"}]
            :[styles.displayText,{color:"white"}]}>{this.props.wordChunk}
            </Text>
          </TouchableOpacity>
        )
    }
}
const styles=StyleSheet.create({
    chunkButton:{
        width:'60%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,
        margin:5,
        
      },
      displayText:{
        textAlign:'center',
        fontSize:38
      },
})