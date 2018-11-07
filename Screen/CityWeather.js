import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import { Text, Card, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

const { height } = Dimensions.get('window');

class CityWeather extends Component {
    state = {};

    componentWillMount() {
        this.getWeather()
    }

    componentDidMount() {
        this.refreshWeather = setInterval( function () {
            console.log(this.state);
                this.getWeather()
        }.bind(this), 600000);
    };

    componentWillUnmount() {
        clearInterval(this.refreshWeather);
        this.refreshWeather = false;
    };

    getWeather() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=60afea3590031181d52028e97285a22f&q=${this.props.selection.name},us&cnt=9&units=imperial`)
                .then(response => this.setState({ 
                    todayTemp: response.data.list[0].main.temp.toFixed(0),  
                    todayTempMin: response.data.list[0].main.temp_min.toFixed(0),  
                    todayTempMax: response.data.list[0].main.temp_max.toFixed(0),  
                    todayDesc: response.data.list[0].weather[0].description.toUpperCase(), 
                    todayWind: response.data.list[0].wind.speed, 
                    tommorrowTemp: response.data.list[8].main.temp.toFixed(0),  
                    tommorrowDesc: response.data.list[8].weather[0].description.toUpperCase(), 
                    tommorrowWind: response.data.list[8].wind.speed, 
                    tommorrowTempMin: response.data.list[8].main.temp_min.toFixed(0),  
                    tommorrowTempMax: response.data.list[8].main.temp_max.toFixed(0),  
                }))
                .catch(() => { console.log('could not get')});
    };

    render() {        
        return (
            <View>
                <Header 
                    leftComponent={{ 
                        icon: 'arrow-back', 
                        color: '#fff',
                        onPress: () => this.props.navigation.navigate('WeatherLanding'),
                        underlayColor: 'transparent'  
                    }}
                    centerComponent={{ text: 'My Weather App', style: { color: '#fff' } }}
                />
                <ScrollView>

                    <Card
                        title={this.props.selection.name}
                        titleStyle={styles.title}
                        image={{ uri: this.props.selection.avatar }}
                        imageStyle={styles.image}
                    >
                        <Text style={styles.todaysTemp}>{this.state.todayTemp}° F </Text>
                        <Text style={styles.detailsText}>{this.state.todayDesc}</Text>
                        <Text style={styles.detailsText}>
                            High: {this.state.todayTempMax}° | Low: {this.state.todayTempMin}° 
                        </Text>
                        <Text style={styles.detailsText}>
                            Winds at {this.state.todayWind} MPH 
                        </Text>
                        <Text style={styles.tomorrowStyle}>Tomorrow</Text>
                        <Text style={styles.detailsText}>{this.state.tommorrowTemp}° F </Text>
                        <Text style={styles.detailsText}>{this.state.tommorrowDesc}</Text>
                        <Text style={styles.detailsText}>
                            High: {this.state.tommorrowTempMax}° | Low: {this.state.tommorrowTempMin}° 
                        </Text>
                        <Text style={styles.detailsText}>
                            Winds at {this.state.tommorrowWind} MPH
                        </Text>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    image: {
        height: height/3,   
    },
    title: {
        fontSize: height/35
    },
    todaysTemp: {
        marginBottom: height/100,
        fontSize: height/30
    },
    tomorrowStyle: {
        marginBottom: height/100,
        marginTop: height/70,
        fontSize: height/40
    },
    detailsText: {
        marginBottom: height/140, 
        fontSize: height/60
    }
});

function mapStateToProps(state){
    return {
        selection: state.CityReducers
    }
};

export default connect(mapStateToProps)(CityWeather);
