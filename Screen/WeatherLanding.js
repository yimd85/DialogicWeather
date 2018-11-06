import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Header, Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { height } = Dimensions.get('window');
import { selectCity } from '../actions/index';

class WeatherLanding extends Component {
    
    handlePress = async event => {
        await this.props.selectCity(event);
        await this.props.navigation.navigate('CityWeather');
    };

    render() {
        return (
            <View>
            <Header 
                centerComponent={{ text: 'My Weather App', style: { color: '#fff' } }}
            />
                <Card title="Your cities" >
                    {
                        this.props.cities.map((u, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    roundAvatar
                                    title={u.name}
                                    avatar={{uri:u.avatar}}
                                    onPress={() => this.handlePress(u)}
                                />
                            );
                        })
                    }
                </Card>
            </View>
        );
    }
}

function mapStateToProps(state){
    return{
        cities: state.CityList
    }
};

function mapDispatchToProps(dispatch){
    return bindActionCreators ({ selectCity: selectCity }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherLanding);